from fastapi import APIRouter

from app.api.routes import utils, shopify, private
from app.api.routes.x_auth import router as x_auth_router
from app.core.config import settings
api_router = APIRouter()

api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(x_auth_router)
api_router.include_router(shopify.shopify_router)


# Private routes for local environment
if settings.ENVIRONMENT == "local":
    api_router.include_router(private.router)