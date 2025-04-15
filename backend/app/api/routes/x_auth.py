from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
import httpx
import base64
import logging
from tenacity import retry, stop_after_attempt, wait_fixed

router = APIRouter(prefix="/x-auth", tags=["x-auth"])

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class XAuthCodeRequest(BaseModel):
    code: str
    redirect_uri: str

class XAuthRefreshRequest(BaseModel):
    refresh_token: str

# In-memory storage for tokens (replace with database in production)
token_storage = {}

@router.post("/code")
async def exchange_x_auth_code(request: XAuthCodeRequest):
    logger.info(f"Received code request: {request.dict()}")
    client_id = "N0p3ZG8yN3lWUFpWcUFXQjE4X206MTpjaQ"
    client_secret = "yyu688sapOxgzLyCRONhNx5GDbRPosnrWviWVuoA-_kpKKRcIm"  # Hardcoded as fallback; move to env for production

    if not request.code or not request.redirect_uri:
        logger.error("Missing code or redirect_uri in request")
        raise HTTPException(status_code=400, detail="Missing code or redirect_uri")

    try:
        auth_string = f"{client_id}:{client_secret}"
        auth_encoded = base64.b64encode(auth_string.encode()).decode()

        @retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
        async def fetch_token():
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.post(
                    "https://api.x.com/2/oauth2/token",
                    headers={
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": f"Basic {auth_encoded}",
                    },
                    data={
                        "code": request.code,
                        "grant_type": "authorization_code",
                        "client_id": client_id,
                        "redirect_uri": request.redirect_uri,
                    },
                )
                return response

        token_response = await fetch_token()
        if token_response.status_code != 200:
            logger.error(f"Token exchange failed: {token_response.status_code} - {token_response.text}")
            raise HTTPException(
                status_code=400,
                detail=f"Token exchange failed: {token_response.text}",
            )
        token_data = token_response.json()
        access_token = token_data["access_token"]
        logger.info("Token exchange successful")

        @retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
        async def fetch_profile():
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(
                    "https://api.x.com/2/users/me?user.fields=username,name,profile_image_url",
                    headers={"Authorization": f"Bearer {access_token}"},
                )
                return response

        profile_response = await fetch_profile()
        if profile_response.status_code != 200:
            logger.error(f"Profile fetch failed: {profile_response.status_code} - {profile_response.text}")
            raise HTTPException(
                status_code=400,
                detail=f"Profile fetch failed: {profile_response.text}",
            )
        logger.info("Profile fetch successful")

        # Store tokens temporarily (use user_id as key)
        user_id = profile_response.json()["data"]["id"]
        token_storage[user_id] = token_data

        # Redirect to frontend
        return RedirectResponse(f"https://iconluxury.today/join?twitter=1&user_id={user_id}")
    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP error during X auth: {str(e)}")
        return RedirectResponse(f"https://iconluxury.today/join?twitter=0&error={str(e)}")
    except httpx.RequestError as e:
        logger.error(f"Network error during X auth: {str(e)}")
        return RedirectResponse(f"https://iconluxury.today/join?twitter=0&error=Network%20issue")
    except Exception as e:
        logger.error(f"Unexpected error during X auth: {str(e)}")
        return RedirectResponse(f"https://iconluxury.today/join?twitter=0&error=Authentication%20failed")

@router.post("/refresh")
async def refresh_x_auth_token(request: XAuthRefreshRequest):
    logger.info(f"Received refresh request: {request.dict()}")
    client_id = "N0p3ZG8yN3lWUFpWcUFXQjE4X206MTpjaQ"
    client_secret = "yyu688sapOxgzLyCRONhNx5GDbRPosnrWviWVuoA-_kpKKRcIm"  # Hardcoded as fallback; move to env for production

    try:
        auth_string = f"{client_id}:{client_secret}"
        auth_encoded = base64.b64encode(auth_string.encode()).decode()

        @retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
        async def fetch_refresh_token():
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.post(
                    "https://api.x.com/2/oauth2/token",
                    headers={
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": f"Basic {auth_encoded}",
                    },
                    data={
                        "refresh_token": request.refresh_token,
                        "grant_type": "refresh_token",
                    },
                )
                return response

        token_response = await fetch_refresh_token()
        if token_response.status_code != 200:
            logger.error(f"Refresh token failed: {token_response.status_code} - {token_response.text}")
            raise HTTPException(
                status_code=400,
                detail=f"Refresh token failed: {token_response.text}",
            )
        logger.info("Refresh token successful")
        return token_response.json()
    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP error during refresh: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Refresh token HTTP error: {str(e)}")
    except httpx.RequestError as e:
        logger.error(f"Network error during refresh: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Network error during refresh: {str(e)}")
    except Exception as e:
        logger.error(f"Unexpected error during refresh: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Unexpected error during refresh: {str(e)}")

@router.get("/user/{user_id}")
async def get_user_details(user_id: str):
    """Fetch user details for the given user_id using stored tokens."""
    token_data = token_storage.get(user_id)
    if not token_data:
        logger.error(f"No tokens found for user_id: {user_id}")
        raise HTTPException(status_code=404, detail="User tokens not found")

    access_token = token_data["access_token"]
    try:
        @retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
        async def fetch_profile():
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(
                    "https://api.x.com/2/users/me?user.fields=username,name,profile_image_url",
                    headers={"Authorization": f"Bearer {access_token}"},
                )
                return response

        profile_response = await fetch_profile()
        if profile_response.status_code != 200:
            logger.error(f"Profile fetch failed: {profile_response.status_code} - {profile_response.text}")
            raise HTTPException(
                status_code=400,
                detail=f"Profile fetch failed: {profile_response.text}",
            )
        logger.info("Profile fetch successful")
        return profile_response.json()["data"]
    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP error fetching user details: {str(e)}")
        raise HTTPException(status_code=500, detail=f"HTTP error fetching user details: {str(e)}")
    except httpx.RequestError as e:
        logger.error(f"Network error fetching user details: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Network error fetching user details: {str(e)}")
    except Exception as e:
        logger.error(f"Unexpected error fetching user details: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Unexpected error fetching user details: {str(e)}")