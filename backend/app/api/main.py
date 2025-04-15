from fastapi import APIRouter

from app.api.routes import collections, products

api_router = APIRouter()

api_router.include_router(collections.router, prefix="/collections", tags=["collections"])
api_router.include_router(products.router, prefix="/products", tags=["products"])