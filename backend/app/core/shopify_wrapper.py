import requests
import logging
import hmac
import hashlib
import base64
from typing import Dict, List, Optional

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

class ShopifyWrapper:
    """
    A Python wrapper for Shopify's Admin API (version 2025-04), supporting products, draft orders, collections,
    and webhooks for draft order events.
    """
    def __init__(self, shop_url: str, access_token: str, webhook_secret: Optional[str] = None):
        """
        Initialize the Shopify wrapper.

        Args:
            shop_url (str): The Shopify store URL (e.g., 'accessxprive.myshopify.com').
            access_token (str): Access token for Admin API authentication.
            webhook_secret (str, optional): Secret for verifying webhook signatures.

        Raises:
            ValueError: If access_token is missing or empty.
        """
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

    def _make_request(self, method: str, endpoint: str, params: Dict = None, json: Dict = None) -> Dict:
        """
        Make an HTTP request to the Shopify Admin API.

        Args:
            method (str): HTTP method ('GET', 'POST', etc.).
            endpoint (str): API endpoint (e.g., '/admin/api/2025-04/products.json').
            params (Dict, optional): Query parameters.
            json (Dict, optional): JSON payload for POST/PUT requests.

        Returns:
            Dict: JSON response from the API.

        Raises:
            requests.RequestException: If the request fails.
        """
        url = f"{self.base_url}{endpoint}"
        try:
            response = requests.request(
                method=method,
                url=url,
                headers=self.headers,
                params=params,
                json=json,
                timeout=10
            )
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            logger.error(f"Request to {url} failed: {e}")
            raise

    def list_products(self, limit: int = 50, since_id: int = 0) -> List[Dict]:
        """
        List products using the Admin API.

        Args:
            limit (int): Number of products to fetch (max 250).
            since_id (int): Fetch products after this ID.

        Returns:
            List[Dict]: List of product dictionaries.

        Example:
            wrapper.list_products(limit=10)
        """
        endpoint = f"/admin/api/{self.api_version}/products.json"
        params = {"limit": min(limit, 250), "since_id": since_id}
        logger.info(f"Listing products with limit={limit}, since_id={since_id}")
        response = self._make_request("GET", endpoint, params=params)
        return response.get("products", [])

    def get_product_details(self, product_id: int) -> Dict:
        """
        Fetch detailed product information for a product details page using the Admin API.

        Args:
            product_id (int): The ID of the product to fetch.

        Returns:
            Dict: Detailed product data including title, description, images, variants, etc.

        Example:
            wrapper.get_product_details(123456789)
        """
        endpoint = f"/admin/api/{self.api_version}/products/{product_id}.json"
        logger.info(f"Fetching detailed product with ID: {product_id}")
        response = self._make_request("GET", endpoint)
        return response.get("product", {})

    def list_variants(self, product_id: int) -> List[Dict]:
        """
        Fetch all variants for a specific product.

        Args:
            product_id (int): The ID of the product.

        Returns:
            List[Dict]: List of variant dictionaries.

        Example:
            wrapper.list_variants(123456789)
        """
        product = self.get_product_details(product_id)
        variants = product.get("variants", [])
        logger.info(f"Fetched {len(variants)} variants for product ID: {product_id}")
        return variants

    def create_draft_order(self, variant_id: int, email: str = "nik@luxuryverse.com", quantity: int = 1) -> Dict:
        """
        Create a draft order with a specific variant and email.

        Args:
            variant_id (int): The ID of the variant to include.
            email (str): Email for the draft order (default: 'nik@luxuryverse.com').
            quantity (int): Quantity of the variant (default: 1).

        Returns:
            Dict: Created draft order details.

        Example:
            wrapper.create_draft_order(variant_id=47003275755815)
        """
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
        response = self._make_request("POST", endpoint, json=draft_order)
        return response.get("draft_order", {})

    def list_collections(self, limit: int = 50, since_id: int = 0, collection_type: str = "all") -> List[Dict]:
        """
        Fetch a list of collections (custom or smart) for featured sections.

        Args:
            limit (int): Number of collections to fetch (max 250).
            since_id (int): Fetch collections after this ID.
            collection_type (str): 'custom', 'smart', or 'all' (default: 'all').

        Returns:
            List[Dict]: List of collection dictionaries.

        Example:
            wrapper.list_collections(limit=10, collection_type='custom')
        """
        collections = []
        if collection_type in ["all", "custom"]:
            endpoint = f"/admin/api/{self.api_version}/custom_collections.json"
            params = {"limit": min(limit, 250), "since_id": since_id}
            logger.info(f"Fetching custom collections with limit={limit}, since_id={since_id}")
            response = self._make_request("GET", endpoint, params=params)
            collections.extend(response.get("custom_collections", []))
        
        if collection_type in ["all", "smart"]:
            endpoint = f"/admin/api/{self.api_version}/smart_collections.json"
            params = {"limit": min(limit, 250), "since_id": since_id}
            logger.info(f"Fetching smart collections with limit={limit}, since_id={since_id}")
            response = self._make_request("GET", endpoint, params=params)
            collections.extend(response.get("smart_collections", []))
        
        logger.info(f"Fetched {len(collections)} total collections")
        return collections

    def get_collection_details(self, collection_id: int, collection_type: str = "custom") -> Dict:
        """
        Fetch detailed information for a specific collection.

        Args:
            collection_id (int): The ID of the collection.
            collection_type (str): 'custom' or 'smart' (default: 'custom').

        Returns:
            Dict: Collection details including title, description, etc.

        Example:
            wrapper.get_collection_details(123456789, collection_type='custom')
        """
        endpoint = f"/admin/api/{self.api_version}/{'custom_collections' if collection_type == 'custom' else 'smart_collections'}/{collection_id}.json"
        logger.info(f"Fetching {collection_type} collection with ID: {collection_id}")
        response = self._make_request("GET", endpoint)
        return response.get("custom_collection" if collection_type == "custom" else "smart_collection", {})

    def list_collection_products(self, collection_id: int, limit: int = 50) -> List[Dict]:
        """
        Fetch products associated with a specific collection.

        Args:
            collection_id (int): The ID of the collection.
            limit (int): Number of products to fetch (max 250).

        Returns:
            List[Dict]: List of product dictionaries in the collection.

        Example:
            wrapper.list_collection_products(452814242087, limit=10)
        """
        endpoint = f"/admin/api/{self.api_version}/collections/{collection_id}/products.json"
        params = {"limit": min(limit, 250)}
        logger.info(f"Fetching products for collection ID: {collection_id} with limit={limit}")
        response = self._make_request("GET", endpoint, params=params)
        return response.get("products", [])

    def create_webhook(self, topic: str, callback_url: str) -> Dict:
        """
        Create a webhook for a specific topic.

        Args:
            topic (str): The webhook topic (e.g., 'draft_orders/create').
            callback_url (str): The URL to receive webhook payloads.

        Returns:
            Dict: Created webhook details.

        Example:
            wrapper.create_webhook('draft_orders/create', 'https://yourapp.com/webhooks')
        """
        endpoint = f"/admin/api/{self.api_version}/webhooks.json"
        webhook = {
            "webhook": {
                "topic": topic,
                "address": callback_url,
                "format": "json"
            }
        }
        logger.info(f"Creating webhook for topic: {topic}, callback: {callback_url}")
        response = self._make_request("POST", endpoint, json=webhook)
        return response.get("webhook", {})

    def verify_webhook(self, data: bytes, hmac_header: str) -> bool:
        """
        Verify a Shopify webhook's authenticity.

        Args:
            data (bytes): The raw webhook payload.
            hmac_header (str): The X-Shopify-Hmac-Sha256 header value.

        Returns:
            bool: True if the webhook is authentic, False otherwise.

        Example:
            wrapper.verify_webhook(request.body, request.headers['X-Shopify-Hmac-Sha256'])
        """
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