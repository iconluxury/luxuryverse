from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, List, Optional
import logging
import requests
import time
from datetime import datetime, timedelta
from queue import Queue
from threading import Lock

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# ShopifyWrapper (assumed implementation from previous context)
class ShopifyCache:
    def __init__(self, ttl_seconds=300):
        self.cache = {}
        self.ttl = ttl_seconds

    def get(self, key):
        if key in self.cache:
            data, timestamp = self.cache[key]
            if datetime.now() - timestamp < timedelta(seconds=self.ttl):
                logger.debug(f"Cache hit for {key}")
                return data
            del self.cache[key]
        return None

    def set(self, key, data):
        self.cache[key] = (data, datetime.now())
        logger.debug(f"Cached data for {key}")

class ShopifyWrapper:
    def __init__(self, shop_url: str, access_token: str):
        self.shop_url = shop_url.rstrip('/')
        self.access_token = access_token
        self.base_url = f"https://{self.shop_url}"
        self.api_version = "2025-04"
        self.headers = {
            "X-Shopify-Access-Token": self.access_token,
            "Content-Type": "application/json"
        }
        self.cache = ShopifyCache(ttl_seconds=300)
        self.bucket_size = 40
        self.bucket_remaining = 40
        self.lock = Lock()
        self.request_queue = Queue()
        self.last_request_time = 0

    def _update_rate_limit(self, response):
        limit_header = response.headers.get('X-Shopify-Shop-Api-Call-Limit')
        if limit_header:
            used, total = map(int, limit_header.split('/'))
            with self.lock:
                self.bucket_remaining = total - used
                logger.debug(f"Rate limit: {used}/{total} credits used")

    def _throttle(self):
        with self.lock:
            elapsed = time.time() - self.last_request_time
            if elapsed < 0.5:
                time.sleep(0.5 - elapsed)
            self.last_request_time = time.time()

    def _make_request(self, method: str, endpoint: str, params: Dict = None, json: Dict = None, retries: int = 3, backoff: float = 1.0) -> Dict:
        cache_key = f"{method}:{endpoint}:{str(params)}"
        cached_data = self.cache.get(cache_key)
        if cached_data is not None:
            return cached_data

        url = f"{self.base_url}{endpoint}"
        for attempt in range(retries):
            if self.bucket_remaining < 5:
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
                if response.status_code == 404:
                    logger.warning(f"Resource not found at {url}")
                    self.cache.set(cache_key, {})
                    return {}
                response.raise_for_status()
                data = response.json()
                self.cache.set(cache_key, data)
                return data
            except requests.RequestException as e:
                if attempt == retries - 1 or (hasattr(e, 'response') and e.response.status_code == 404):
                    logger.error(f"Request to {url} failed: {e}")
                    self.cache.set(cache_key, {})
                    return {}
                logger.warning(f"Request to {url} failed, retrying... ({attempt + 1}/{retries}): {e}")
                time.sleep(backoff * (2 ** attempt))
        return {}

    def get_product_details(self, product_id: int) -> Dict:
        endpoint = f"/admin/api/{self.api_version}/products/{product_id}.json"
        logger.info(f"Fetching detailed product with ID: {product_id}")
        response = self._make_request("GET", endpoint)
        product = response.get("product", {})
        if not product:
            logger.warning(f"Product {product_id} not found or inaccessible")
        return product

    def list_collection_products(self, collection_id: int, limit: int = 50) -> List[Dict]:
        endpoint = f"/admin/api/{self.api_version}/collections/{collection_id}/products.json"
        params = {"limit": min(limit, 250)}
        logger.info(f"Fetching products for collection ID: {collection_id} with limit={limit}")
        response = self._make_request("GET", endpoint, params=params)
        products = response.get("products", [])
        if not products:
            logger.warning(f"No products found for collection {collection_id}")
        return products

    def get_collection_details(self, collection_id: int, collection_type: str = "custom") -> Dict:
        endpoint = f"/admin/api/{self.api_version}/{'custom_collections' if collection_type == 'custom' else 'smart_collections'}/{collection_id}.json"
        logger.info(f"Fetching {collection_type} collection with ID: {collection_id}")
        response = self._make_request("GET", endpoint)
        collection = response.get("custom_collection" if collection_type == "custom" else "smart_collection", {})
        if not collection:
            logger.warning(f"Collection {collection_id} ({collection_type}) not found or inaccessible")
        return collection

    def list_collections(self, limit: int = 50, since_id: int = 0, collection_type: str = "all") -> List[Dict]:
        collections = []
        if collection_type in ["all", "custom"]:
            endpoint = f"/admin/api/{self.api_version}/custom_collections.json"
            params = {"limit": min(limit, 250), "since_id": since_id}
            logger.info(f"Fetching custom collections with limit={limit}, since_id={since_id}")
            response = self._make_request("GET", endpoint, params=params)
            collections.extend([(c, "custom") for c in response.get("custom_collections", [])])

        if collection_type in ["all", "smart"]:
            endpoint = f"/admin/api/{self.api_version}/smart_collections.json"
            params = {"limit": min(limit, 250), "since_id": since_id}
            logger.info(f"Fetching smart collections with limit={limit}, since_id={since_id}")
            response = self._make_request("GET", endpoint, params=params)
            collections.extend([(c, "smart") for c in response.get("smart_collections", [])])

        logger.info(f"Fetched {len(collections)} total collections")
        return collections
