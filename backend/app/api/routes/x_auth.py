from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx
import base64
import os

router = APIRouter(prefix="/x-auth", tags=["x-auth"])

class XAuthCodeRequest(BaseModel):
    code: str
    redirect_uri: str

class XAuthRefreshRequest(BaseModel):
    refresh_token: str

@router.post("/code")
async def exchange_x_auth_code(request: XAuthCodeRequest):
    print(f"Received code request: {request}")
    client_id = "N0p3ZG8yN3lWUFpWcUFXQjE4X206MTpjaQ"
    client_secret = "yyu688sapOxgzLyCRONhNx5GDbRPosnrWviWVuoA-_kpKKRcIm"

    if not client_secret:
        raise HTTPException(status_code=500, detail="Client secret not configured")

    if not request.code or not request.redirect_uri:
        raise HTTPException(status_code=400, detail="Missing code or redirect_uri")

    try:
        auth_string = f"{client_id}:{client_secret}"
        auth_encoded = base64.b64encode(auth_string.encode()).decode()

        async with httpx.AsyncClient() as client:
            token_response = await client.post(
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
            if token_response.status_code != 200:
                raise HTTPException(
                    status_code=400,
                    detail=f"Token exchange failed: {token_response.text}",
                )
            token_data = token_response.json()
            access_token = token_data["access_token"]

            profile_response = await client.get(
                "https://api.x.com/2/users/me?user.fields=username,name,profile_image_url",
                headers={"Authorization": f"Bearer {access_token}"},
            )
            if profile_response.status_code != 200:
                raise HTTPException(
                    status_code=400,
                    detail=f"Profile fetch failed: {profile_response.text}",
                )
            return {
                "profile": profile_response.json()["data"],
                "tokens": token_data
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"X auth error: {str(e)}")

@router.post("/refresh")
async def refresh_x_auth_token(request: XAuthRefreshRequest):
    print(f"Received refresh request: {request}")
    client_id = "N0p3ZG8yN3lWUFpWcUFXQjE4X206MTpjaQ"
    client_secret = "yyu688sapOxgzLyCRONhNx5GDbRPosnrWviWVuoA-_kpKKRcIm"

    if not client_secret:
        raise HTTPException(status_code=500, detail="Client secret not configured")

    try:
        auth_string = f"{client_id}:{client_secret}"
        auth_encoded = base64.b64encode(auth_string.encode()).decode()

        async with httpx.AsyncClient() as client:
            token_response = await client.post(
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
            if token_response.status_code != 200:
                raise HTTPException(
                    status_code=400,
                    detail=f"Refresh token failed: {token_response.text}",
                )
            return token_response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Refresh token error: {str(e)}")