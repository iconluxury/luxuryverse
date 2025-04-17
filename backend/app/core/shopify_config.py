from app.core.shopify_wrapper import ShopifyWrapper
from app.core.config import settings

# SHOPIFY_WEBHOOK_SECRET = "your_webhook_secret"  # Replace with your webhook secret (optional)

# Initialize ShopifyWrapper
wrapper = ShopifyWrapper(
    shop_url=settings.SHOPIFY_SHOP_URL,
    access_token=settings.SHOPIFY_ACCESS_TOKEN,
)