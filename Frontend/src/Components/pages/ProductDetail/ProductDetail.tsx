import { JSX, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../Contexts/language-context";
import { t } from "../../../lib/i18b";
import { appConfig } from "../../../Utils/AppConfig";
import "./ProductDetail.css";

interface Product {
    id: string;
    name_en: string;
    name_he: string;
    description_en: string;
    description_he: string;
    price: number;
    imageUrl?: string;
    category?: string;
}

export function ProductDetail(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const res = await fetch(appConfig.productsUrl, { method: 'GET' });
                if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
                const data = await res.json();

                // Find the specific product by ID
                const foundProduct = data.find((p: Product) => p.id === id);
                if (!foundProduct) throw new Error('Product not found');

                setProduct(foundProduct);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="product-detail-container">
                <div className="loading">Loading product...</div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="product-detail-container">
                <div className="error">
                    <h2>Error</h2>
                    <p>{error || 'Product not found'}</p>
                    <button onClick={() => navigate('/store')} className="back-btn">
                        Back to Store
                    </button>
                </div>
            </div>
        );
    }

    const currentName = language === 'he' ? (product.name_he || product.name_en) : (product.name_en || '');
    const currentDescription = language === 'he' ? (product.description_he || product.description_en) : (product.description_en || '');

    return (
        <div className="product-detail-container">
            <div className="product-detail-header">
                <button onClick={() => navigate('/store')} className="back-btn">
                    ← {t("common.back", language) || "Back to Store"}
                </button>
            </div>

            <div className="product-detail-content">
                <div className="product-detail-image-section">
                    {product.imageUrl ? (
                        <img
                            src={product.imageUrl}
                            alt={currentName}
                            className="product-detail-image"
                        />
                    ) : (
                        <div className="product-detail-placeholder">
                            <span className="product-placeholder-icon">📦</span>
                        </div>
                    )}
                </div>

                <div className="product-detail-info-section">
                    <h1 className="product-detail-title">
                        {currentName}
                    </h1>

                    <div className="product-detail-price">
                        <span className="price">
                            {t("common.currency", language)}{product.price}
                        </span>
                    </div>

                    <div className="product-detail-description">
                        <h3>{t("store.description", language) || "Description"}</h3>
                        <p>{currentDescription}</p>
                    </div>

                    <div className="product-detail-actions">
                        <button className="add-to-cart-btn-large">
                            {t("store.addToCart", language) || "Add to Cart"}
                        </button>
                        <button className="buy-now-btn">
                            {t("store.buyNow", language) || "Buy Now"}
                        </button>
                    </div>

                    <div className="product-detail-meta">
                        <div className="meta-item">
                            <strong>{t("store.productId", language) || "Product ID"}:</strong> {product.id}
                        </div>
                        <div className="meta-item">
                            <strong>{t("store.category", language) || "Category"}:</strong>
                            {getProductCategory(product, language)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper function to get localized category name
const getProductCategory = (product: Product, language: string): string => {
    const content = `${product.name_en || ''} ${product.description_en || ''}`.toLowerCase();

    let category = 'homeopathic'; // default

    if (content.includes('homeopathy') || content.includes('homeopathic')) {
        category = 'homeopathic';
    } else if (content.includes('herbal') || content.includes('plant') || content.includes('extract')) {
        category = 'herbal';
    } else if (content.includes('diabetes') || content.includes('blood sugar') || content.includes('insulin')) {
        category = 'immunity';
    } else if (content.includes('digest') || content.includes('stomach') || content.includes('gut')) {
        category = 'digestion';
    } else if (content.includes('stress') || content.includes('anxiety') || content.includes('relax')) {
        category = 'stress';
    }

    // Return localized category name
    const categoryKey = `store.filter.${category}`;
    return t(categoryKey, language as 'en' | 'he') || category;
};
