from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.core.shopify_config import wrapper
import logging
import requests

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Main router for Shopify endpoints
shopify_router = APIRouter()

# Sub-routers for products and collections
products_router = APIRouter(prefix="/products", tags=["products"])
collections_router = APIRouter(prefix="/collections", tags=["collections"])

# Pydantic models
class Product(BaseModel):
    id: str
    title: str
    thumbnail: str
    price: str
    variants: List[str] = []

class Collection(BaseModel):
    id: str
    title: str
    description: Optional[str] = ""  # Allow None, default to empty string
    image: str
    products: List[Product]

@products_router.get("/", response_model=List[Product])
async def get_products():
    """
    Fetch a list of products from Shopify.
    """
    try:
        products = wrapper.list_products(limit=5)
        result = []
        for product in products:
            variants = product.get("variants", [])
            price = f"${variants[0]['price']}" if variants and len(variants) > 0 else "Contact for price"
            if not variants:
                logger.warning(f"Product {product['id']} has no variants")
            result.append(
                Product(
                    id=str(product["id"]),
                    title=product["title"],
                    thumbnail=product["images"][0]["src"] if product.get("images") else "",
                    price=price,
                    variants=[v["title"] for v in variants]
                )
            )
        logger.info(f"Fetched {len(result)} products")
        return result
    except Exception as e:
        logger.error(f"Failed to fetch products: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch products")

@products_router.get("/{product_id}", response_model=Product)
async def get_product(product_id: str):
    """
    Fetch details for a specific product by ID.
    """
    try:
        product = wrapper.get_product_details(int(product_id))
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        variants = product.get("variants", [])
        price = f"${variants[0]['price']}" if variants and len(variants) > 0 else "Contact for price"
        if not variants:
            logger.warning(f"Product {product['id']} has no variants")
        result = Product(
            id=str(product["id"]),
            title=product["title"],
            thumbnail=product["images"][0]["src"] if product.get("images") else "",
            price=price,
            variants=[v["title"] for v in variants]
        )
        logger.info(f"Fetched product {product_id}")
        return result
    except Exception as e:
        logger.error(f"Failed to fetch product {product_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch product {product_id}")

@collections_router.get("/", response_model=List[Collection])
async def get_collections():
    """
    Fetch collections and their associated products from Shopify.
    """
    try:
        collections = wrapper.list_collections(limit=3, collection_type="all")
        result = []
        if not collections:
            logger.info("No collections found, returning empty list")
            return result
        for collection, collection_type in collections:
            try:
                collection_details = wrapper.get_collection_details(collection["id"], collection_type=collection_type)
                collection_products = wrapper.list_collection_products(collection["id"], limit=3)
                products = []
                for prod in collection_products:
                    try:
                        full_product = wrapper.get_product_details(prod["id"])
                        variants = full_product.get("variants", [])
                        price = f"${variants[0]['price']}" if variants and len(variants) > 0 else "Contact for price"
                        if not variants:
                            logger.warning(f"Product {full_product['id']} in collection {collection['id']} has no variants")
                        products.append(
                            Product(
                                id=str(full_product["id"]),
                                title=full_product["title"],
                                thumbnail=full_product["images"][0]["src"] if full_product.get("images") else "",
                                price=price,
                                variants=[v["title"] for v in variants]
                            )
                        )
                    except requests.RequestException as e:
                        logger.warning(f"Failed to fetch details for product {prod['id']} in collection {collection['id']}: {e}")
                result.append(
                    Collection(
                        id=str(collection_details["id"]),
                        title=collection_details["title"],
                        description=collection_details.get("body_html", "") or "",  # Ensure string
                        image=collection_details.get("image", {}).get("src", ""),
                        products=products
                    )
                )
            except requests.RequestException as e:
                logger.warning(f"Failed to fetch details for collection {collection['id']}: {e}")
        logger.info(f"Fetched {len(result)} collections")
        return result
    except Exception as e:
        logger.error(f"Failed to fetch collections: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch collections")

@collections_router.get("/{collection_id}", response_model=Collection)
async def get_collection(collection_id: str):
    """
    Fetch a single collection by ID from Shopify.
    """
    try:
        try:
            collection_details = wrapper.get_collection_details(int(collection_id), collection_type="custom")
        except requests.RequestException as e:
            collection_details = wrapper.get_collection_details(int(collection_id), collection_type="smart")
        
        collection_products = wrapper.list_collection_products(int(collection_id), limit=10)
        products = []
        for prod in collection_products:
            try:
                full_product = wrapper.get_product_details(prod["id"])
                variants = full_product.get("variants", [])
                price = f"${variants[0]['price']}" if variants and len(variants) > 0 else "Contact for price"
                if not variants:
                    logger.warning(f"Product {full_product['id']} in collection {collection_id} has no variants")
                products.append(
                    Product(
                        id=str(full_product["id"]),
                        title=full_product["title"],
                        thumbnail=full_product["images"][0]["src"] if full_product.get("images") else "",
                        price=price,
                        variants=[v["title"] for v in variants]
                    )
                )
            except requests.RequestException as e:
                logger.warning(f"Failed to fetch details for product {prod['id']} in collection {collection_id}: {e}")
        result = Collection(
            id=str(collection_details["id"]),
            title=collection_details["title"],
            description=collection_details.get("body_html", "") or "",  # Ensure string
            image=collection_details.get("image", {}).get("src", ""),
            products=products
        )
        logger.info(f"Fetched collection {collection_id}")
        return result
    except Exception as e:
        logger.error(f"Failed to fetch collection {collection_id}: {e}")
        if isinstance(e, requests.RequestException) and e.response and e.response.status_code == 404:
            raise HTTPException(status_code=404, detail="Collection not found")
        raise HTTPException(status_code=500, detail=f"Failed to fetch collection {collection_id}")

# Include sub-routers in the main Shopify router
shopify_router.include_router(products_router)
shopify_router.include_router(collections_router)