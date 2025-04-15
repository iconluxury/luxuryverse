from fastapi import APIRouter, HTTPException
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

        return {
            "profile": profile_response.json()["data"],
            "tokens": token_data
        }
    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP error during X auth: {str(e)}")
        raise HTTPException(status_code=500, detail=f"X auth HTTP error: {str(e)}")
    except httpx.RequestError as e:
        logger.error(f"Network error during X auth: {str(e)}")
        return {
            "status": "error",
            "message": "Authentication failed due to network issue; please try again",
            "details": str(e)
        }
    except Exception as e:
        logger.error(f"Unexpected error during X auth: {str(e)}")
        return {
            "status": "error",
            "message": "Authentication failed; please try again later",
            "details": str(e)
        }

@router.post("/refresh")
async def refresh_x_auth_token(request: XAuthRefreshRequest):
    logger.info(f"Received refresh request: {request.dict()}")
    client_id = "N0p3ZG8yN3lWUFpWcUFXQjE4X206MTpjaQ"
    client_secret = "yyu688sapOxgzLyCRONhNx5GDbRPosnrWviWVuoA-_kpKKRcIm"  # Hardcoded as fallback