from fastapi import APIRouter, FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional
import logging
import requests
import os
# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# API Router
router = APIRouter(prefix="/crypto", tags=["crypto"])

# CoinMarketCap API configuration
COINMARKETCAP_API_KEY: Optional[str] = 'de11073e-8892-445c-8cf6-0e2cd69705fd'
COINMARKETCAP_API_URL: str = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"

# Pydantic models for response
class CryptoPriceResponse(BaseModel):
    symbol: str
    price_usd: float
    last_updated: str

class CryptoPriceConversion(BaseModel):
    symbol: str
    price_usd: float
    product_price_usd: float
    product_price_crypto: float
    last_updated: str

# Root endpoint
@router.get("/", tags=["root"])
async def root():
    return {
        "path": "/crypto",
        "message": "Welcome to the Crypto Price API"
    }

# Health check endpoint
@router.get("/health", tags=["health"])
async def health_check():
    return {"status": "healthy"}

# Endpoint to fetch crypto prices and optionally convert product prices
@router.get("/prices", response_model=List[CryptoPriceResponse | CryptoPriceConversion])
async def get_crypto_prices(
    symbols: Optional[str] = Query(
        None, description="Comma-separated list of crypto symbols (e.g., BTC,ETH,USDT)"
    ),
    product_price_usd: Optional[float] = Query(
        None, description="USD price of product to convert to crypto (e.g., 100.0)"
    )
):
    """
    Fetch latest cryptocurrency prices in USD for product pricing conversions.
    Optionally converts a product price (in USD) to equivalent crypto amounts.
    If no symbols are provided, fetches prices for a default set of popular coins.
    """
    logger.info(f"Fetching crypto prices for symbols: {symbols if symbols else 'default'}, product_price_usd: {product_price_usd}")

    if not COINMARKETCAP_API_KEY:
        logger.error("Missing CoinMarketCap API key")
        raise HTTPException(status_code=500, detail="Server configuration error: Missing CoinMarketCap API key")

    default_symbols = "BTC,ETH,USDT,XRP,BNB,SOL,USDC,DOGE,TRX,ADA"
    symbols_to_fetch = symbols if symbols else default_symbols

    if product_price_usd is not None and product_price_usd <= 0:
        logger.error("Invalid product price: must be positive")
        raise HTTPException(status_code=400, detail="Product price must be positive")

    headers = {
        "Accepts": "application/json",
        "X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY,
    }
    parameters = {
        "symbol": symbols_to_fetch,
        "convert": "USD",
    }

    try:
        response = requests.get(COINMARKETCAP_API_URL, headers=headers, params=parameters)
        response.raise_for_status()
        data = response.json()

        if "data" not in data or not data["data"]:
            error_message = data.get("status", {}).get("error_message", "Unknown error")
            logger.error(f"Invalid API response: {error_message}")
            raise HTTPException(status_code=400, detail=f"Invalid API response: {error_message}")

        prices = []
        for symbol, info in data["data"].items():
            price = info["quote"]["USD"]["price"]
            last_updated = info["quote"]["USD"]["last_updated"]

            if product_price_usd is not None:
                if price <= 0:
                    logger.warning(f"Skipping conversion for {symbol}: price is zero or negative")
                    continue
                product_price_crypto = product_price_usd / price
                prices.append(
                    CryptoPriceConversion(
                        symbol=symbol,
                        price_usd=price,
                        product_price_usd=product_price_usd,
                        product_price_crypto=product_price_crypto,
                        last_updated=last_updated
                    )
                )
            else:
                prices.append(
                    CryptoPriceResponse(
                        symbol=symbol,
                        price_usd=price,
                        last_updated=last_updated
                    )
                )

        if not prices:
            logger.warning("No valid prices returned after processing")
            raise HTTPException(status_code=404, detail="No valid prices available for the requested symbols")

        logger.info(f"Successfully fetched prices for {len(prices)} symbols")
        return prices

    except requests.exceptions.HTTPError as e:
        logger.error(f"HTTP error fetching crypto prices: {str(e)}")
        status_code = e.response.status_code
        if status_code == 401:
            raise HTTPException(status_code=401, detail="Invalid CoinMarketCap API key")
        elif status_code == 429:
            raise HTTPException(status_code=429, detail="CoinMarketCap API rate limit exceeded")
        raise HTTPException(status_code=500, detail=f"Failed to fetch crypto prices: {str(e)}")
    except requests.exceptions.ConnectionError:
        logger.error("Connection error fetching crypto prices")
        raise HTTPException(status_code=503, detail="Failed to connect to CoinMarketCap API")
    except requests.exceptions.Timeout:
        logger.error("Timeout fetching crypto prices")
        raise HTTPException(status_code=504, detail="CoinMarketCap API request timed out")
    except Exception as e:
        logger.error(f"Unexpected error fetching crypto prices: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
