class AppConfig {
    private readonly baseUrl = process.env.REACT_APP_BASE_URL;

    constructor() {
        if (!this.baseUrl) {
            console.error("Base URL is not defined. Please check your .env file.");
            throw new Error("Base URL is missing");
        }
    }

    // General endpoints
    public readonly productsUrl = `${this.baseUrl}api/products`; // All products
    public readonly productById = `${this.baseUrl}api/products/`; // Single product
    public readonly searchproductsUrl = `${this.baseUrl}api/products/search`; // Search products
    public readonly productsImagesUrl = `${this.baseUrl}api/products/images`; // product images
    public readonly contactUsUrl = `${this.baseUrl}api/contact-us`; // Contact us endpoint

    // Authentication endpoints
    public readonly registerUrl = `${this.baseUrl}api/register`; // Register endpoint
    public readonly loginUrl = `${this.baseUrl}api/login`; // Login endpoint
}

export const appConfig = new AppConfig();
