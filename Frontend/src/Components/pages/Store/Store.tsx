import { JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../Contexts/language-context";
import { t } from "../../../lib/i18b";
import "./Store.css";
import { appConfig } from "../../../Utils/AppConfig";

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

export function Store(): JSX.Element {
    const { language } = useLanguage();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("popular");

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await fetch(appConfig.productsUrl, { method: 'GET' });
                if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
                const data = await res.json();
                if (isMounted) setProducts(data || []);
            } catch (err: any) {
                if (isMounted) setError(err.message || 'Failed to fetch products');
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchProducts();
        return () => { isMounted = false; };
    }, []);

    const categories = [
        { value: "all", label: t("store.filter.all", language) },
        { value: "homeopathic", label: t("terms.homeopathy", language) },
        { value: "herbal", label: t("terms.botanical", language) },
        { value: "immunity", label: t("store.filter.immunity", language) },
        { value: "digestion", label: t("store.filter.digestion", language) },
        { value: "stress", label: t("store.filter.stress", language) }
    ];

    const sortOptions = [
        { value: "popular", label: t("store.sort.popular", language) },
        { value: "price-asc", label: t("store.sort.price.asc", language) },
        { value: "price-desc", label: t("store.sort.price.desc", language) },
        { value: "newest", label: t("store.sort.newest", language) }
    ];

    const filteredProducts = products.filter(product => {
        const currentName = language === 'he' ? (product.name_he || product.name_en || '') : (product.name_en || '');
        const currentDescription = language === 'he' ? (product.description_he || product.description_en || '') : (product.description_en || '');

        // Split search term by commas and trim whitespace
        const searchTerms = searchTerm.split(',').map(term => term.trim()).filter(term => term.length > 0);

        // If no search terms, show all products (matchesSearch = true)
        const matchesSearch = searchTerms.length === 0 ||
            searchTerms.some(term => {
                const searchTermLower = term.toLowerCase();
                const nameMatch = currentName.toLowerCase().includes(searchTermLower);
                const descMatch = currentDescription.toLowerCase().includes(searchTermLower);
                return nameMatch || descMatch;
            });

        // For now, since there's no category field in the database,
        // we'll skip category filtering or implement basic categorization
        const matchesCategory = selectedCategory === "all" ||
            getProductCategory(product).includes(selectedCategory);

        return matchesSearch && matchesCategory;
    });

    // Helper function to categorize products based on their content
    const getProductCategory = (product: Product): string => {
        const content = `${product.name_en || ''} ${product.description_en || ''}`.toLowerCase();

        if (content.includes('homeopathy') || content.includes('homeopathic')) {
            return 'homeopathic';
        }
        if (content.includes('herbal') || content.includes('plant') || content.includes('extract')) {
            return 'herbal';
        }
        if (content.includes('diabetes') || content.includes('blood sugar') || content.includes('insulin')) {
            return 'immunity'; // Using immunity as a catch-all for now
        }
        if (content.includes('digest') || content.includes('stomach') || content.includes('gut')) {
            return 'digestion';
        }
        if (content.includes('stress') || content.includes('anxiety') || content.includes('relax')) {
            return 'stress';
        }

        return 'homeopathic'; // Default category
    };

    return (
        <div className="store-container">
            {/* Header Section */}
            <div className="store-header">
                <div className="store-header-content">
                    <div className="store-header-text">
                        <h1 className="store-title">
                            {t("store.title", language)}
                        </h1>
                        <p className="store-description">
                            {t("store.description", language)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="store-content">
                {/* Mobile-First Filters */}
                <div className="store-filters">
                    {/* Search Bar */}
                    <div>
                        <input
                            type="text"
                            placeholder={t("common.search", language) || "Search products... (use commas to separate terms)"}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    {/* Mobile Filter Row */}
                    <div className="filter-row">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="filter-select"
                        >
                            {categories.map(category => (
                                <option key={category.value} value={category.value}>
                                    {category.label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="filter-select"
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="products-grid">
                    {loading && <div className="loading">Loading products...</div>}
                    {error && <div className="error">{error}</div>}
                    {filteredProducts.map(product => (
                            <div
                                key={product.id}
                                className="product-card"
                                onClick={() => navigate(`/product/${product.id}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="product-image-container">
                                    {product.imageUrl ? (
                                        <img
                                            src={product.imageUrl}
                                            alt={language === 'he' ? (product.name_he || product.name_en) : (product.name_en || '')}
                                            className="product-image"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="product-placeholder">
                                            <span className="product-placeholder-icon">📦</span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="product-info">
                                    <h3 className="product-name line-clamp-2">
                                        {language === 'he' ? (product.name_he || product.name_en) : (product.name_en || '')}
                                    </h3>
                                    <p className="product-description line-clamp-3">
                                        {language === 'he' ? (product.description_he || product.description_en) : (product.description_en || '')}
                                    </p>
                                    
                                    <div className="product-footer">
                                        <span className="product-price">
                                            {t("common.currency", language)}{product.price}
                                        </span>
                                        <button
                                            className="add-to-cart-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Add to cart functionality here
                                                console.log('Add to cart:', product.id);
                                            }}
                                        >
                                            {t("store.addToCart", language)}
                                        </button>
                                    </div>
                                </div>
                            </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-state-icon">🔍</div>
                        <h3 className="empty-state-title">
                            No products found
                        </h3>
                        <p className="empty-state-text">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                )}

                {/* Load More Button */}
                {filteredProducts.length > 0 && (
                    <div className="text-center mt-8">
                        <button className="load-more-btn">
                            {t("store.loadMore", language)}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}