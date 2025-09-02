class AppConfig {
    private readonly baseUrl = process.env.REACT_APP_BASE_URL;

    constructor() {
        if (!this.baseUrl) {
            console.error("Base URL is not defined. Please check your .env file.");
            throw new Error("Base URL is missing");
        }
    }

    // General endpoints (backend registers product controller under /api and routes include /dhnaturally)
    public readonly productsUrl = `${this.baseUrl}api/dhnaturally/products`; // All products
    public readonly articlesUrl = `${this.baseUrl}api/dhnaturally/articles`; // All articles
    public readonly productById = `${this.baseUrl}api/dhnaturally/products/`; // Single product (append id)
    public readonly searchproductsUrl = `${this.baseUrl}api/dhnaturally/products/search`; // Search products
    public readonly productsImagesUrl = `${this.baseUrl}api/products/images`; // product images (static)
    public readonly articlesImagesUrl = `${this.baseUrl}api/articles/images`;
    public readonly contactUsUrl = `${this.baseUrl}api/contact-us`; // Contact us endpoint

    // Authentication endpoints
    public readonly registerUrl = `${this.baseUrl}api/register`; // Register endpoint
    public readonly loginUrl = `${this.baseUrl}api/login`; // Login endpoint

    // New Database Features - Product Reviews & Ratings
    public readonly productReviewsUrl = `${this.baseUrl}api/products/`; // + productId + /reviews
    public readonly addProductReviewUrl = `${this.baseUrl}api/products/`; // + productId + /reviews

    // Product Variants
    public readonly productVariantsUrl = `${this.baseUrl}api/products/`; // + productId + /variants
    public readonly addProductVariantUrl = `${this.baseUrl}api/products/`; // + productId + /variants

    // Wishlist System
    public readonly wishlistUrl = `${this.baseUrl}api/wishlist`;
    public readonly addToWishlistUrl = `${this.baseUrl}api/wishlist`;
    public readonly removeFromWishlistUrl = `${this.baseUrl}api/wishlist/`; // + itemId

    // Discount Codes
    public readonly validateDiscountUrl = `${this.baseUrl}api/discount-codes/validate`;
    public readonly discountCodesUrl = `${this.baseUrl}api/discount-codes`;

    // Product Analytics
    public readonly productAnalyticsUrl = `${this.baseUrl}api/analytics/products`;

    // Enhanced Search (with new database features)
    public readonly enhancedSearchUrl = `${this.baseUrl}api/products/search/enhanced`;

    // Inventory Management
    public readonly inventoryUrl = `${this.baseUrl}api/inventory`;
    public readonly inventoryTransactionsUrl = `${this.baseUrl}api/inventory/transactions`;

    // Product Relations (Cross-selling, Recommendations)
    public readonly productRelationsUrl = `${this.baseUrl}api/products/`; // + productId + /relations
    public readonly productRecommendationsUrl = `${this.baseUrl}api/products/recommendations`;

    // Feature flags from environment
    public readonly enableProductReviews = process.env.REACT_APP_ENABLE_PRODUCT_REVIEWS === 'true';
    public readonly enableProductVariants = process.env.REACT_APP_ENABLE_PRODUCT_VARIANTS === 'true';
    public readonly enableWishlist = process.env.REACT_APP_ENABLE_WISHLIST === 'true';
    public readonly enableDiscountCodes = process.env.REACT_APP_ENABLE_DISCOUNT_CODES === 'true';
    public readonly enableAnalytics = process.env.REACT_APP_ENABLE_ANALYTICS === 'true';

    // API Configuration
    public readonly apiTimeout = parseInt(process.env.REACT_APP_API_TIMEOUT || '10000');
    public readonly maxRetries = parseInt(process.env.REACT_APP_MAX_RETRIES || '3');

    // Media URLs
    public readonly imagesBaseUrl = process.env.REACT_APP_IMAGES_BASE_URL || `${this.baseUrl}uploads/`;

    // i18n Configuration
    public readonly defaultLanguage = process.env.REACT_APP_DEFAULT_LANGUAGE || 'en';
    public readonly supportedLanguages = (process.env.REACT_APP_SUPPORTED_LANGUAGES || 'en,he').split(',');
}

export const appConfig = new AppConfig();
