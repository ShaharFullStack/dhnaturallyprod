import { JSX, useState } from "react";
import { useLanguage } from "../../../Contexts/language-context";
import { t } from "../../../lib/i18b";
import "./Store.css";

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

    // Mock products data - will be replaced with API call
    const [products] = useState<Product[]>([
        {
            id: "1",
            name: "Arnica Montana",
            description: "Premier homeopathic remedy for trauma, bruising, and muscle soreness.",
            price: 95.90,
            category: "homeopathic",
            imageUrl: "/images/products/arnica-montana.jpg"
        },
        {
            id: "2", 
            name: "Calendula Officinalis",
            description: "Healing remedy for wounds, cuts, and skin conditions.",
            price: 76.90,
            category: "homeopathic",
            imageUrl: "/images/products/calendula.jpg"
        },
        {
            id: "3",
            name: "Ginkgo Biloba Premium",
            description: "Standardized extract for cognitive enhancement and circulation.",
            price: 119.90,
            category: "herbal",
            imageUrl: "/images/products/ginkgo-biloba.jpg"
        }
    ]);

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
        <div className="Store min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-dh-navy to-dh-ocean text-white">
                <div className="container mx-auto px-4 py-8 lg:py-12">
                    <div className="text-center">
                        <h1 className="text-2xl lg:text-4xl font-bold mb-4">
                            {t("store.title", language)}
                        </h1>
                        <p className="text-dh-pale text-sm lg:text-lg max-w-3xl mx-auto">
                            {t("store.description", language)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                {/* Mobile-First Filters */}
                <div className="mb-6 space-y-4">
                    {/* Search Bar */}
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder={t("common.search", language) || "Search products..."}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dh-ocean focus:border-transparent text-sm lg:text-base"
                        />
                    </div>

                    {/* Mobile Filter Row */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dh-ocean text-sm"
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
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dh-ocean text-sm"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="aspect-square bg-gray-200 relative">
                                {product.imageUrl ? (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <span className="text-4xl">📦</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base line-clamp-2">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 text-xs lg:text-sm mb-3 line-clamp-3">
                                    {product.description}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-lg lg:text-xl font-bold text-dh-navy">
                                        {t("common.currency", language)}{product.price}
                                    </span>
                                    <button className="bg-dh-ocean hover:bg-dh-navy text-white px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors">
                                        {t("store.addToCart", language)}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No products found
                        </h3>
                        <p className="text-gray-600">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                )}

                {/* Load More Button */}
                {filteredProducts.length > 0 && (
                    <div className="text-center mt-8">
                        <button className="bg-white border-2 border-dh-ocean text-dh-ocean hover:bg-dh-ocean hover:text-white px-6 py-3 rounded-lg font-medium transition-colors">
                            {t("store.loadMore", language)}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}