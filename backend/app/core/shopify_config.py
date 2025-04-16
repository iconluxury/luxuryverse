from shopify_wrapper import ShopifyWrapper

# Shopify configuration
SHOPIFY_SHOP_URL = "accessxprive.myshopify.com"
SHOPIFY_ACCESS_TOKEN = "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"  # Replace with your Shopify access token
# SHOPIFY_WEBHOOK_SECRET = "your_webhook_secret"  # Replace with your webhook secret (optional)

# Initialize ShopifyWrapper
wrapper = ShopifyWrapper(
    shop_url=SHOPIFY_SHOP_URL,
    access_token=SHOPIFY_ACCESS_TOKEN,
)