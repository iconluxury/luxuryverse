from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
import requests_oauthlib
import logging
from typing import Optional
from urllib.parse import quote

router = APIRouter(prefix="/x-auth", tags=["x-auth"])

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Hardcoded fallback credentials (update with valid keys from X Developer Portal)
CONSUMER_KEY: Optional[str] = 'nAqr3o1snDvNZYV9pzCiwXiwu'  # Replace with valid API Key
CONSUMER_SECRET: Optional[str] = 'pPyWA12QAF2mbEHs28GhUIwga7oZFJ2xOakQ9maUMhIOAgDYpO'  # Replace with valid API Secret
# In-memory storage for tokens (replace with database in production)
token_storage = {}

class XAuthRefreshRequest(BaseModel):
    user_id: str

@router.get("/health")
async def health_check():
    """Health check endpoint to verify service is running."""
    return {"status": "ok"}

@router.get("/request-token")
async def request_token():
    """Initiate OAuth 1.0a by fetching a request token."""
    logger.info("Request-token called")
    if not CONSUMER_KEY or not CONSUMER_SECRET:
        logger.error("Missing consumer key or secret")
        raise HTTPException(status_code=500, detail="Server configuration error: Missing OAuth credentials")

    callback_uri = "https://iconluxury.today/api/v1/x-auth/callback"
    oauth = requests_oauthlib.OAuth1Session(
        client_key=CONSUMER_KEY,
        client_secret=CONSUMER_SECRET,
        callback_uri=callback_uri
    )
    try:
        fetch_response = oauth.fetch_request_token('https://api.twitter.com/oauth/request_token')
        resource_owner_key = fetch_response.get('oauth_token')
        resource_owner_secret = fetch_response.get('oauth_token_secret')
        token_storage[resource_owner_key] = {"secret": resource_owner_secret}
        logger.debug(f"Stored token data for key {resource_owner_key}: {token_storage[resource_owner_key]}")
        authorization_url = oauth.authorization_url('https://api.twitter.com/oauth/authenticate')
        logger.info(f"Generated authorization URL: {authorization_url}")
        return {"authorization_url": authorization_url}
    except requests_oauthlib.oauth1_session.TokenRequestDenied as e:
        logger.error(f"Token request denied: {str(e)}")
        raise HTTPException(status_code=401, detail=f"Authentication failed: {str(e)}")
    except Exception as e:
        logger.error(f"Error fetching request token: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch request token: {str(e)}")

@router.get("/callback")
async def x_auth_callback(oauth_token: str, oauth_verifier: str):
    """Handle OAuth 1.0a callback with oauth_token and oauth_verifier."""
    logger.info(f"Callback received with oauth_token: {oauth_token}")
    if not CONSUMER_KEY or not CONSUMER_SECRET:
        logger.error("Missing consumer key or secret")
        raise HTTPException(status_code=500, detail="Server configuration error: Missing OAuth credentials")

    token_data = token_storage.get(oauth_token)
    if not token_data or "secret" not in token_data:
        logger.error(f"No stored resource_owner_secret for oauth_token: {oauth_token}")
        return RedirectResponse(f"https://iconluxury.today/auth-complete?twitter=0&error=Invalid%20oauth_token")

    resource_owner_secret = token_data["secret"]
    oauth = requests_oauthlib.OAuth1Session(
        CONSUMER_KEY,
        client_secret=CONSUMER_SECRET,
        resource_owner_key=oauth_token,
        resource_owner_secret=resource_owner_secret,
        verifier=oauth_verifier
    )
    try:
        tokens = oauth.fetch_access_token('https://api.twitter.com/oauth/access_token')
        access_token = tokens['oauth_token']
        access_token_secret = tokens['oauth_token_secret']
        user_id = tokens.get('user_id')
        screen_name = tokens.get('screen_name')
        logger.info(f"Access token fetched for user: {screen_name}")

        # Store tokens
        token_storage[user_id] = {
            "access_token": access_token,
            "access_token_secret": access_token_secret,
            "screen_name": screen_name
        }
        logger.warning("Using in-memory token storage; replace with database in production")
        logger.debug(f"Stored user tokens for user_id {user_id}: {token_storage[user_id]}")

        # Clean up temporary token
        token_storage.pop(oauth_token, None)
        logger.debug(f"Cleaned up token storage for oauth_token: {oauth_token}")

        # Redirect to frontend
        redirect_url = f"https://iconluxury.today/auth-complete?twitter=1&user_id={user_id}"
        logger.info(f"Redirecting to frontend: {redirect_url}")
        return RedirectResponse(redirect_url)
    except requests_oauthlib.oauth1_session.TokenRequestDenied as e:
        logger.error(f"Callback token request denied: {str(e)}")
        return RedirectResponse(f"https://iconluxury.today/auth-complete?twitter=0&error=Authentication%20failed")
    except Exception as e:
        logger.error(f"Error in callback: {str(e)}")
        return RedirectResponse(f"https://iconluxury.today/auth-complete?twitter=0&error={quote(str(e))}")

@router.get("/user/{user_id}")
async def get_user_details(user_id: str, include_email: bool = Query(default=True)):
    """Fetch user details for the given user_id using stored tokens."""
    logger.info(f"Fetching user details for user_id: {user_id}")
    token_data = token_storage.get(user_id)
    if not token_data:
        logger.error(f"No tokens found for user_id: {user_id}")
        raise HTTPException(status_code=404, detail="User tokens not found")

    oauth = requests_oauthlib.OAuth1Session(
        CONSUMER_KEY,
        client_secret=CONSUMER_SECRET,
        resource_owner_key=token_data["access_token"],
        resource_owner_secret=token_data["access_token_secret"]
    )
    params = {
        "include_email": "true" if include_email else "false",
        "skip_status": "true",
        "include_entities": "true"
    }
    try:
        response = oauth.get("https://api.twitter.com/1.1/account/verify_credentials.json", params=params)
        if response.status_code != 200:
            logger.error(f"User details fetch failed: {response.status_code} - {response.text}")
            raise HTTPException(
                status_code=response.status_code,
                detail=f"User details fetch failed: {response.text}"
            )
        user_data = response.json()
        logger.info(f"User details fetched for user_id: {user_id}")
        return {
            "id": user_data.get("id_str"),
            "name": user_data.get("name"),
            "username": user_data.get("screen_name"),
            "location": user_data.get("location"),
            "description": user_data.get("description"),
            "url": user_data.get("url"),
            "profile_image_url": user_data.get("profile_image_url_https"),
            "email": user_data.get("email")
        }
    except requests_oauthlib.oauth1_session.TokenRequestDenied as e:
        logger.error(f"User details token error: {str(e)}")
        raise HTTPException(status_code=401, detail=f"Authentication failed: {str(e)}")
    except Exception as e:
        logger.error(f"Error fetching user details: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching user details: {str(e)}")

@router.post("/refresh")
async def refresh_x_auth_token(request: XAuthRefreshRequest):
    """Return stored OAuth 1.0a tokens (long-lived, no refresh needed)."""
    logger.info(f"Received refresh request for user_id: {request.user_id}")
    token_data = token_storage.get(request.user_id)
    if not token_data:
        logger.error(f"No tokens found for user_id: {request.user_id}")
        raise HTTPException(status_code=404, detail="User tokens not found")
    return {
        "access_token": token_data["access_token"],
        "access_token_secret": token_data["access_token_secret"],
        "screen_name": token_data["screen_name"]
    }