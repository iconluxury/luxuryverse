from fastapi import APIRouter

from app.api.routes import collections, products
from app.api.routes.x_auth import router as x_auth_router
api_router = APIRouter(title="LuxuryVerse")

api_router.include_router(collections.router, prefix="/collections", tags=["collections"])
api_router.include_router(products.router, prefix="/products", tags=["products"])
api_router.include_router(x_auth_router)