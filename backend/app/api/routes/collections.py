from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

class Product(BaseModel):
    id: str
    title: str
    thumbnail: str
    price: str

class Collection(BaseModel):
    id: str
    title: str
    products: List[Product]

mock_collections = [
    {
        "id": "col1",
        "title": "Luxury Watches",
        "products": [
            {"id": "p1", "title": "Gold Chronograph", "thumbnail": "/images/watch1.jpg", "price": "0.5 ETH"},
            {"id": "p2", "title": "Diamond Quartz", "thumbnail": "/images/watch2.jpg", "price": "0.7 ETH"},
        ],
    },
    {
        "id": "col2",
        "title": "Designer Bags",
        "products": [
            {"id": "p3", "title": "Leather Tote", "thumbnail": "/images/bag1.jpg", "price": "0.3 ETH"},
            {"id": "p4", "title": "Velvet Clutch", "thumbnail": "/images/bag2.jpg", "price": "0.2 ETH"},
        ],
    },
]

@router.get("/", response_model=List[Collection])
async def get_collections():
    return mock_collections