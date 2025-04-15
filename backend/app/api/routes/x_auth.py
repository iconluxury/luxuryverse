from fastapi import APIRouter, HTTPException
import httpx
import base64

router = APIRouter(prefix="/x-auth", tags=["x-auth"])

@router.post("/")
async def exchange_x_auth_code(data: dict):
    code = data.get("code")
    redirect_uri = data.get("redirect_uri")
    client_id = "N0p3ZG8yN3lWUFpWcUFXQjE4X206MTpjaQ"
    client_secret = 'SRDX4gnbXblA1hkWajWQad5GI7tcixCmPrcQYwlGZRTcW-RJVE' 


    if not code or not redirect_uri:
        raise HTTPException(status_code=400, detail="Missing code or redirect_uri")

    try:
        # Encode client_id:client_secret for Basic Auth
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
                    "code": code,
                    "grant_type": "authorization_code",
                    "client_id": client_id,
                    "redirect_uri": redirect_uri,
                    "code_verifier": "challenge",
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
            return profile_response.json()["data"]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"X auth error: {str(e)}")