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

class Variant(BaseModel):
    id: str
    title: str
    size: Optional[str] = None  # Extracted from option1, option2, or option3 if applicable
    inventory_quantity: int
    price: str  # Current price (sale price if applicable)
    compare_at_price: Optional[str] = None  # Full price for discount calculation

class Product(BaseModel):
    id: str
    title: str
    description: str
    brand: Optional[str] = None  # Vendor field in Shopify
    thumbnail: str
    images: List[str] = []  # All image URLs
    variants: List[Variant]
    full_price: str  # Highest compare_at_price or price
    sale_price: str  # Lowest price among variants
    discount: Optional[str] = None  # e.g., "40% off"

class Collection(BaseModel):
    id: str
    title: str
    description: Optional[str] = "" 
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
    Fetch details for a specific product by ID, including description, brand, sizes, available sizes, images, prices, and discount.
    """
    try:
        product = wrapper.get_product_details(int(product_id))
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        variants = product.get("variants", [])
        if not variants:
            logger.warning(f"Product {product['id']} has no variants")
            raise HTTPException(status_code=404, detail="Product has no variants")
        
        # Extract variant details
        variant_list = []
        for v in variants:
            # Assume size is in option1 (customize based on your Shopify setup)
            size = v.get("option1") or v.get("title")
            variant_list.append(
                Variant(
                    id=str(v["id"]),
                    title=v["title"],
                    size=size,
                    inventory_quantity=v["inventory_quantity"],
                    price=f"${float(v['price']):,.2f}",
                    compare_at_price=f"${float(v['compare_at_price']):,.2f}" if v.get("compare_at_price") else None
                )
            )
        
        # Calculate prices and discount
        prices = [float(v["price"]) for v in variants]
        compare_at_prices = [
            float(v["compare_at_price"]) for v in variants if v.get("compare_at_price")
        ] or prices
        sale_price = min(prices)
        full_price = max(compare_at_prices)
        discount = None
        if full_price > sale_price:
            discount_percent = ((full_price - sale_price) / full_price) * 100
            discount = f"{discount_percent:.0f}% off"
        
        # Collect all image URLs
        images = [img["src"] for img in product.get("images", [])]
        thumbnail = images[0] if images else ""

        result = Product(
            id=str(product["id"]),
            title=product["title"],
            description=product.get("body_html", "") or "",
            brand=product.get("vendor", ""),
            thumbnail=thumbnail,
            images=images,
            variants=variant_list,
            full_price=f"${full_price:,.2f}",
            sale_price=f"${sale_price:,.2f}",
            discount=discount
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
    Fetch a single collection by ID from Shopify, including detailed product information.
    """
    try:
        # Try custom collection first, fallback to smart collection
        try:
            collection_details = wrapper.get_collection_details(int(collection_id), collection_type="custom")
        except requests.RequestException:
            collection_details = wrapper.get_collection_details(int(collection_id), collection_type="smart")
        
        collection_products = wrapper.list_collection_products(int(collection_id), limit=10)
        products = []
        for prod in collection_products:
            try:
                full_product = wrapper.get_product_details(prod["id"])
                variants = full_product.get("variants", [])
                if not variants:
                    logger.warning(f"Product {full_product['id']} in collection {collection_id} has no variants")
                    continue
                
                # Extract variant details
                variant_list = []
                for v in variants:
                    # Assume size is in option1 (customize based on your Shopify setup)
                    size = v.get("option1") or v.get("title")
                    variant_list.append(
                        Variant(
                            id=str(v["id"]),
                            title=v["title"],
                            size=size,
                            inventory_quantity=v["inventory_quantity"],
                            price=f"${float(v['price']):,.2f}",
                            compare_at_price=f"${float(v['compare_at_price']):,.2f}" if v.get("compare_at_price") else None
                        )
                    )
                
                # Calculate prices and discount
                prices = [float(v["price"]) for v in variants]
                compare_at_prices = [
                    float(v["compare_at_price"]) for v in variants if v.get("compare_at_price")
                ] or prices
                sale_price = min(prices)
                full_price = max(compare_at_prices)
                discount = None
                if full_price > sale_price:
                    discount_percent = ((full_price - sale_price) / full_price) * 100
                    discount = f"{discount_percent:.0f}% off"
                
                # Collect all image URLs
                images = [img["src"] for img in full_product.get("images", [])]
                thumbnail = images[0] if images else ""

                products.append(
                    Product(
                        id=str(full_product["id"]),
                        title=full_product["title"],
                        description=full_product.get("body_html", "") or "",
                        brand=full_product.get("vendor", ""),
                        thumbnail=thumbnail,
                        images=images,
                        variants=variant_list,
                        full_price=f"${full_price:,.2f}",
                        sale_price=f"${sale_price:,.2f}",
                        discount=discount
                    )
                )
            except requests.RequestException as e:
                logger.warning(f"Failed to fetch details for product {prod['id']} in collection {collection_id}: {e}")
        
        result = Collection(
            id=str(collection_details["id"]),
            title=collection_details["title"],
            description=collection_details.get("body_html", "") or "",
            image=collection_details.get("image", {}).get("src", ""),
            products=products
        )
        logger.info(f"Fetched collection {collection_id} with {len(products)} products")
        return result
    except Exception as e:
        logger.error(f"Failed to fetch collection {collection_id}: {e}")
        if isinstance(e, requests.RequestException) and e.response and e.response.status_code == 404:
            raise HTTPException(status_code=404, detail="Collection not found")
        raise HTTPException(status_code=500, detail=f"Failed to fetch collection {collection_id}")

# Include sub-routers in the main Shopify router
shopify_router.include_router(products_router)
shopify_router.include_router(collections_router)