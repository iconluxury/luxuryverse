from fastapi import FastAPI, Request
from fastapi.routing import APIRoute
from starlette.responses import RedirectResponse
from app.api.main import api_router
from app.core.config import settings

def custom_generate_unique_id(route: APIRoute) -> str:
    return f"{route.tags[0]}-{route.name}"

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V_STR}/openapi.json",
    generate_unique_id_function=custom_generate_unique_id,
    redirect_slashes=False,
)

@app.middleware("http")
async def enforce_https(request: Request, call_next):
    if request.headers.get("x-forwarded-proto", "http") == "http":
        url = request.url._replace(scheme="https")
        return RedirectResponse(url, status_code=301)
    return await call_next(request)

ALLOWED_ORIGINS = ["https://iconluxury.shop"]

@app.middleware("http")
async def custom_cors_middleware(request: Request, call_next):
    response = await call_next(request)
    origin = request.headers.get("origin")
    if origin in ALLOWED_ORIGINS:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Accept, Content-Type, Authorization"
    return response

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/health", tags=["health"])
async def health_check():
    return {"status": "healthy"}