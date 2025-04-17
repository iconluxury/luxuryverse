import requests
import logging
import hmac
import hashlib
import base64
from typing import Dict, List, Optional
import time
from datetime import datetime, timedelta
from queue import Queue
from threading import Lock
from functools import lru_cache
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

class ShopifyCache:
    def __init__(self, ttl_seconds=300):
        self.cache = {}
        self.ttl = ttl_seconds

    def get(self, key):
        """Retrieve cached data if not expired."""
        if key in self.cache:
            data, timestamp = self.cache[key]
            if datetime.now() - timestamp < timedelta(seconds=self.ttl):
                return data
            del self.cache[key]
        return None

    def set(self, key, data):
        """Store data in cache with timestamp."""
        self.cache[key] = (data, datetime.now())

class ShopifyWrapper:
    """
    A Python wrapper for Shopify's Admin API (version 2025-04) with caching and rate limit handling.
    """
    def __init__(self, shop_url: str, access_token: str, webhook_secret: Optional[str] = None):
        if not access_token:
            raise ValueError("Access token is required for Admin API")
        self.shop_url = shop_url.rstrip('/')
        self.access_token = access_token
        self.webhook_secret = webhook_secret
        self.base_url = f"https://{self.shop_url}"
        self.api_version = "2025-04"
        self.headers = {
            "X-Shopify-Access-Token": self.access_token,
            "Content-Type": "application/json"
        }
        self.cache = ShopifyCache(ttl_seconds=300)
        self.bucket_size = 40  # Shopify default bucket size
        self.bucket_remaining = 40
        self.lock = Lock()
        self.request_queue = Queue()
        self.last_request_time = 0

    def _update_rate_limit(self, response):
        """Update rate limit based on response headers."""
        limit_header = response.headers.get('X-Shopify-Shop-Api-Call-Limit')
        if limit_header:
            used, total = map(int, limit_header.split('/'))
            with self.lock:
                self.bucket_remaining = total - used
                logger.debug(f"Rate limit: {used}/{total} credits used")

    def _throttle(self):
        """Ensure requests don't exceed 2 per second."""
        with self.lock:
            elapsed = time.time() - self.last_request_time
            if elapsed < 0.5:  # 500ms for 2 requests/sec
                time.sleep(0.5 - elapsed)
            self.last_request_time = time.time()

    def _make_request(self, method: str, endpoint: str, params: Dict = None, json: Dict = None, retries: int = 3, backoff: float = 1.0) -> Dict:
        """
        Make an HTTP request with caching and rate limit handling.
        """
        cache_key = f"{method}:{endpoint}:{str(params)}"
        cached_data = self.cache.get(cache_key)
        if cached_data:
            logger.debug(f"Cache hit for {cache_key}")
            return cached_data

        url = f"{self.base_url}{endpoint}"
        for attempt in range(retries):
            if self.bucket_remaining < 5:  # Pause if low on credits
                logger.warning(f"Low on credits ({self.bucket_remaining}/{self.bucket_size}), pausing...")
                time.sleep(backoff * (2 ** attempt))
            self._throttle()
            try:
                response = requests.request(
                    method=method,
                    url=url,
                    headers=self.headers,
                    params=params,
                    json=json,
                    timeout=10
                )
                self._update_rate_limit(response)
                if response.status_code == 429:
                    retry_after = float(response.headers.get("Retry-After", backoff * (2 ** attempt)))
                    logger.warning(f"Rate limit hit for {url}, retrying after {retry_after} seconds")
                    time.sleep(retry_after)
                    continue
                response.raise_for_status()
                data = response.json()
                self.cache.set(cache_key, data)
                return data
            except requests.RequestException as e:
                if attempt == retries - 1:
                    logger.error(f"Request to {url} failed after {retries} retries: {e}")
                    raise
                logger.warning(f"Request to {url} failed, retrying... ({attempt + 1}/{retries}): {e}")
                time.sleep(backoff * (2 ** attempt))
        raise requests.RequestException(f"Failed to complete request to {url} after {retries} retries")

    def list_products(self, limit: int = 50, since_id: int = 0) -> List[Dict]:
        endpoint = f"/admin/api/{self.api_version}/products.json"
        params = {"limit": min(limit, 250), "since_id": since_id}
        logger.info(f"Listing products with limit={limit}, since_id={since_id}")
        return self._make_request("GET", endpoint, params=params).get("products", [])

    def get_product_details(self, product_id: int) -> Dict:
        endpoint = f"/admin/api/{self.api_version}/products/{product_id}.json"
        logger.info(f"Fetching detailed product with ID: {product_id}")
        return self._make_request("GET", endpoint).get("product", {})

    def list_variants(self, product_id: int) -> List[Dict]:
        product = self.get_product_details(product_id)
        variants = product.get("variants", [])
        logger.info(f"Fetched {len(variants)} variants for product ID: {product_id}")
        return variants

    def create_draft_order(self, variant_id: int, email: str = "nik@luxuryverse.com", quantity: int = 1) -> Dict:
        endpoint = f"/admin/api/{self.api_version}/draft_orders.json"
        draft_order = {
            "draft_order": {
                "line_items": [
                    {
                        "variant_id": variant_id,
                        "quantity": quantity
                    }
                ],
                "email": email
            }
        }
        logger.info(f"Creating draft order with variant ID: {variant_id}, email: {email}")
        return self._make_request("POST", endpoint, json=draft_order).get("draft_order", {})

    def list_collections(self, limit: int = 50, since_id: int = 0, collection_type: str = "all") -> List[Dict]:
        collections = []
        if collection_type in ["all", "custom"]:
            endpoint = f"/admin/api/{self.api_version}/custom_collections.json"
            params = {"limit": min(limit, 250), "since_id": since_id}
            logger.info(f"Fetching custom collections with limit={limit}, since_id={since_id}")
            try:
                response = self._make_request("GET", endpoint, params=params)
                collections.extend([(c, "custom") for c in response.get("custom_collections", [])])
            except requests.RequestException as e:
                logger.warning(f"Failed to fetch custom collections: {e}")

        if collection_type in ["all", "smart"]:
            endpoint = f"/admin/api/{self.api_version}/smart_collections.json"
            params = {"limit": min(limit, 250), "since_id": since_id}
            logger.info(f"Fetching smart collections with limit={limit}, since_id={since_id}")
            try:
                response = self._make_request("GET", endpoint, params=params)
                collections.extend([(c, "smart") for c in response.get("smart_collections", [])])
            except requests.RequestException as e:
                logger.warning(f"Failed to fetch smart collections: {e}")

        logger.info(f"Fetched {len(collections)} total collections")
        return collections

    def get_collection_details(self, collection_id: int, collection_type: str = "custom") -> Dict:
        endpoint = f"/admin/api/{self.api_version}/{'custom_collections' if collection_type == 'custom' else 'smart_collections'}/{collection_id}.json"
        logger.info(f"Fetching {collection_type} collection with ID: {collection_id}")
        return self._make_request("GET", endpoint).get("custom_collection" if collection_type == "custom" else "smart_collection", {})

    def list_collection_products(self, collection_id: int, limit: int = 50) -> List[Dict]:
        endpoint = f"/admin/api/{self.api_version}/collections/{collection_id}/products.json"
        params = {"limit": min(limit, 250)}
        logger.info(f"Fetching products for collection ID: {collection_id} with limit={limit}")
        return self._make_request("GET", endpoint, params=params).get("products", [])

    def create_webhook(self, topic: str, callback_url: str) -> Dict:
        endpoint = f"/admin/api/{self.api_version}/webhooks.json"
        webhook = {
            "webhook": {
                "topic": topic,
                "address": callback_url,
                "format": "json"
            }
        }
        logger.info(f"Creating webhook for topic: {topic}, callback: {callback_url}")
        return self._make_request("POST", endpoint, json=webhook).get("webhook", {})

    def verify_webhook(self, data: bytes, hmac_header: str) -> bool:
        if not self.webhook_secret:
            logger.error("Webhook secret is required for verification")
            return False
        digest = hmac.new(
            self.webhook_secret.encode('utf-8'),
            data,
            hashlib.sha256
        ).digest()
        computed_hmac = base64.b64encode(digest).decode('utf-8')
        return hmac.compare_digest(computed_hmac, hmac_header)
