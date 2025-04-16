from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from app.core.shopify_config import wrapper
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Main router for Shopify endpoints
shopify_router = APIRouter(tags=["shopify"])

# Sub-routers for products and collections
products_router = APIRouter(prefix="/products", tags=["products"])
collections_router = APIRouter(prefix="/collections", tags=["collections"])

# Pydantic models
class Product(BaseModel):
    id: str
    title: str
    thumbnail: str
    price: str

class Collection(BaseModel):
    id: str
    title: str
    products: List[Product]

@products_router.get("/", response_model=List[Product])
async def get_products():
    """
    Fetch a list of products from Shopify.
    """
    try:
        products = wrapper.list_products(limit=10)
        return [
            Product(
                id=str(product["id"]),
                title=product["title"],
                thumbnail=product["images"][0]["src"] if product["images"] else "",
                price=f"${product['variants'][0]['price']}" if product["variants"] else "N/A"
            )
            for product in products
        ]
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
        return Product(
            id=str(product["id"]),
            title=product["title"],
            thumbnail=product["images"][0]["src"] if product["images"] else "",
            price=f"${product['variants'][0]['price']}" if product["variants"] else "N/A"
        )
    except Exception as e:
        logger.error(f"Failed to fetch product {product_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch product {product_id}")

@collections_router.get("/", response_model=List[Collection])
async def get_collections():
    """
    Fetch collections and their associated products from Shopify.
    """
    try:
        collections = wrapper.list_collections(limit=10, collection_type="all")
        result = []
        for collection in collections:
            products = wrapper.list_collection_products(collection["id"], limit=5)
            result.append(
                Collection(
                    id=str(collection["id"]),
                    title=collection["title"],
                    products=[
                        Product(
                            id=str(product["id"]),
                            title=product["title"],
                            thumbnail=product["images"][0]["src"] if product["images"] else "",
                            price=f"${product['variants'][0]['price']}" if product["variants"] else "N/A"
                        )
                        for product in products
                    ]
                )
            )
        return result
    except Exception as e:
        logger.error(f"Failed to fetch collections: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch collections")

# Include sub-routers in the main Shopify router
shopify_router.include_router(products_router)
shopify_router.include_router(collections_router)