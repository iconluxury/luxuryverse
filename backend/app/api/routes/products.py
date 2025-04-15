from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()

class Product(BaseModel):
    id: str
    title: str
    thumbnail: str
    price: str

mock_products = [
    {"id": "p1", "title": "Gold Chronograph", "thumbnail": "/images/watch1.jpg", "price": "0.5 ETH"},
    {"id": "p2", "title": "Diamond Quartz", "thumbnail": "/images/watch2.jpg", "price": "0.7 ETH"},
    {"id": "p3", "title": "Leather Tote", "thumbnail": "/images/bag1.jpg", "price": "0.3 ETH"},
    {"id": "p4", "title": "Velvet Clutch", "thumbnail": "/images/bag2.jpg", "price": "0.2 ETH"},
]

@router.get("/", response_model=List[Product])
async def get_products():
    return mock_products

@router.get("/{product_id}", response_model=Product)
async def get_product(product_id: str):
    for product in mock_products:
        if product["id"] == product_id:
            return product
    raise HTTPException(status_code=404, detail="Product not found")