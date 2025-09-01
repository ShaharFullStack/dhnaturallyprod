import { JSX, useEffect, useState } from "react";
import { useLanguage } from "../../../Contexts/language-context";
import { t } from "../../../lib/i18b";
import "./Store.css";
import { appConfig } from "../../../Utils/AppConfig";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    category?: string;
}

export function Store(): JSX.Element {
    const { language } = useLanguage();
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
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

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
                            placeholder={t("common.search", language) || "Search products..."}
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
                        <div key={product.id} className="product-card">
                            <div className="product-image-container">
                                {product.imageUrl ? (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
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
                                    {product.name}
                                </h3>
                                <p className="product-description line-clamp-3">
                                    {product.description}
                                </p>
                                
                                <div className="product-footer">
                                    <span className="product-price">
                                        {t("common.currency", language)}{product.price}
                                    </span>
                                    <button className="add-to-cart-btn">
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