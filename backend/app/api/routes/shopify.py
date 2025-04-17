from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import logging
import requests
from app.core.shopify_config import wrapper
# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)
# FastAPI Router
shopify_router = APIRouter()
products_router = APIRouter(prefix="/products", tags=["products"])
collections_router = APIRouter(prefix="/collections", tags=["collections"])

class Variant(BaseModel):
    id: str
    title: str
    size: Optional[str] = None
    inventory_quantity: int
    price: str
    compare_at_price: Optional[str] = None

class Product(BaseModel):
    id: str
    title: str
    description: str
    brand: Optional[str] = None
    thumbnail: str
    images: List[str] = []
    variants: List[Variant]
    full_price: str
    sale_price: str
    discount: Optional[str] = None

class Collection(BaseModel):
    id: str
    title: str
    description: Optional[str] = ""
    image: str
    products: List[Product]

class SimpleCollection(BaseModel):
    id: str
    title: str
    description: Optional[str] = ""
    image: str

@collections_router.get("/", response_model=List[SimpleCollection])
async def list_collections(limit: int = 100, collection_type: str = "all"):
    try:
        if collection_type not in ["all", "custom", "smart"]:
            raise HTTPException(status_code=400, detail="Invalid collection_type. Must be 'all', 'custom', or 'smart'.")
        
        collections = wrapper.list_collections(limit=limit, collection_type=collection_type)
        result = []
        if not collections:
            logger.info("No collections found, returning empty list")
            return result
        
        for collection, coll_type in collections:
            if not collection.get("id"):
                logger.warning(f"Skipping collection with missing ID: {collection}")
                continue
            try:
                cache_key = f"GET:/admin/api/{wrapper.api_version}/{'custom_collections' if coll_type == 'custom' else 'smart_collections'}/{collection['id']}.json:None"
                collection_details = wrapper.cache.get(cache_key)
                if not collection_details:
                    collection_details = wrapper.get_collection_details(collection["id"], collection_type=coll_type)
                
                if not collection_details or not collection_details.get("id"):
                    logger.warning(f"No valid details for collection {collection['id']} ({coll_type})")
                    continue
                
                result.append(
                    SimpleCollection(
                        id=str(collection_details["id"]),
                        title=collection_details.get("title", "Untitled"),
                        description=collection_details.get("body_html", "") or "",
                        image=collection_details.get("image", {}).get("src", "https://placehold.co/400x400")
                    )
                )
            except Exception as e:
                logger.warning(f"Failed to process collection {collection['id']}: {e}")
                continue
        
        logger.info(f"Fetched {len(result)} collections")
        return result
    except Exception as e:
        logger.error(f"Failed to fetch collections: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch collections")

@products_router.get("/{product_id}", response_model=Product)
async def get_product(product_id: str):
    try:
        product = wrapper.get_product_details(int(product_id))
        if not product or not product.get("id"):
            logger.warning(f"Product {product_id} not found or invalid")
            raise HTTPException(status_code=404, detail="Product not found")
        
        variants = product.get("variants", [])
        if not variants:
            logger.warning(f"Product {product_id} has no variants")
            raise HTTPException(status_code=404, detail="Product has no variants")
        
        variant_list = []
        for v in variants:
            if not v.get("id") or not v.get("title"):
                logger.warning(f"Skipping invalid variant in product {product_id}: {v}")
                continue
            size = v.get("option1") or v.get("title")
            try:
                variant_list.append(
                    Variant(
                        id=str(v["id"]),
                        title=v["title"],
                        size=size,
                        inventory_quantity=v.get("inventory_quantity", 0),
                        price=f"${float(v['price']):,.2f}",
                        compare_at_price=f"${float(v['compare_at_price']):,.2f}" if v.get("compare_at_price") else None
                    )
                )
            except (ValueError, TypeError) as e:
                logger.warning(f"Invalid variant data for product {product_id}: {v}, error: {e}")
                continue
        
        if not variant_list:
            logger.warning(f"No valid variants for product {product_id}")
            raise HTTPException(status_code=404, detail="Product has no valid variants")
        
        prices = [float(v["price"]) for v in variants if v.get("price")]
        compare_at_prices = [
            float(v["compare_at_price"]) for v in variants if v.get("compare_at_price")
        ] or prices
        sale_price = min(prices) if prices else 0.0
        full_price = max(compare_at_prices) if compare_at_prices else sale_price
        discount = None
        if full_price > sale_price > 0:
            discount_percent = ((full_price - sale_price) / full_price) * 100
            discount = f"{discount_percent:.0f}% off"
        
        images = [img["src"] for img in product.get("images", []) if img.get("src")]
        thumbnail = images[0] if images else "https://placehold.co/400x400"

        result = Product(
            id=str(product["id"]),
            title=product.get("title", "Untitled"),
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
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Failed to fetch product {product_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch product {product_id}")

@collections_router.get("/{collection_id}", response_model=Collection)
async def get_collection(collection_id: str):
    try:
        # Check cache for custom and smart collections
        cache_key_custom = f"GET:/admin/api/{wrapper.api_version}/custom_collections/{collection_id}.json:None"
        cache_key_smart = f"GET:/admin/api/{wrapper.api_version}/smart_collections/{collection_id}.json:None"
        
        collection_details = wrapper.cache.get(cache_key_custom)
        collection_type = "custom"
        if not collection_details:
            collection_details = wrapper.get_collection_details(int(collection_id), collection_type="custom")
            if not collection_details:
                collection_details = wrapper.get_collection_details(int(collection_id), collection_type="smart")
                collection_type = "smart"
                if collection_details and not wrapper.cache.get(cache_key_smart):
                    wrapper.cache.set(cache_key_smart, collection_details)
        
        if not collection_details or not collection_details.get("id"):
            logger.error(f"Collection {collection_id} not found or invalid")
            raise HTTPException(status_code=404, detail=f"Collection {collection_id} not found")
        
        collection_products = wrapper.list_collection_products(int(collection_id), limit=10)
        products = []
        for prod in collection_products:
            if not prod.get("id"):
                logger.warning(f"Skipping product with missing ID in collection {collection_id}: {prod}")
                continue
            try:
                cache_key_product = f"GET:/admin/api/{wrapper.api_version}/products/{prod['id']}.json:None"
                full_product = wrapper.cache.get(cache_key_product)
                if not full_product:
                    full_product = wrapper.get_product_details(prod["id"])
                
                if not full_product or not full_product.get("id"):
                    logger.warning(f"Product {prod['id']} not found or invalid in collection {collection_id}")
                    continue
                
                variants = full_product.get("variants", [])
                if not variants:
                    logger.warning(f"Product {full_product['id']} in collection {collection_id} has no variants")
                    continue
                
                variant_list = []
                for v in variants:
                    if not v.get("id") or not v.get("title"):
                        logger.warning(f"Skipping invalid variant in product {prod['id']}: {v}")
                        continue
                    size = v.get("option1") or v.get("title")
                    try:
                        variant_list.append(
                            Variant(
                                id=str(v["id"]),
                                title=v["title"],
                                size=size,
                                inventory_quantity=v.get("inventory_quantity", 0),
                                price=f"${float(v['price']):,.2f}",
                                compare_at_price=f"${float(v['compare_at_price']):,.2f}" if v.get("compare_at_price") else None
                            )
                        )
                    except (ValueError, TypeError) as e:
                        logger.warning(f"Invalid variant data for product {prod['id']}: {v}, error: {e}")
                        continue
                
                if not variant_list:
                    logger.warning(f"No valid variants for product {full_product['id']} in collection {collection_id}")
                    continue
                
                prices = [float(v["price"]) for v in variants if v.get("price")]
                compare_at_prices = [
                    float(v["compare_at_price"]) for v in variants if v.get("compare_at_price")
                ] or prices
                sale_price = min(prices) if prices else 0.0
                full_price = max(compare_at_prices) if compare_at_prices else sale_price
                discount = None
                if full_price > sale_price > 0:
                    discount_percent = ((full_price - sale_price) / full_price) * 100
                    discount = f"{discount_percent:.0f}% off"
                
                images = [img["src"] for img in full_product.get("images", []) if img.get("src")]
                thumbnail = images[0] if images else "https://placehold.co/400x400"

                products.append(
                    Product(
                        id=str(full_product["id"]),
                        title=full_product.get("title", "Untitled"),
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
            except Exception as e:
                logger.warning(f"Failed to process product {prod['id']} in collection {collection_id}: {e}")
                continue
        
        result = Collection(
            id=str(collection_details["id"]),
            title=collection_details.get("title", "Untitled"),
            description=collection_details.get("body_html", "") or "",
            image=collection_details.get("image", {}).get("src", "https://placehold.co/400x400"),
            products=products
        )
        logger.info(f"Fetched collection {collection_id} with {len(products)} products")
        return result
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Failed to fetch collection {collection_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch collection {collection_id}")

# Include sub-routers
shopify_router.include_router(products_router)
shopify_router.include_router(collections_router)