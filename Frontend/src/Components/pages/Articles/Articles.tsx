import { JSX, useState } from "react";
import { useLanguage } from "../../../Contexts/language-context";
import { t } from "../../../lib/i18b";
import "./Articles.css";

interface Article {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    readTime: number;
    publishedDate: string;
    imageUrl?: string;
    featured?: boolean;
}

export function Articles(): JSX.Element {
    const { language } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [email, setEmail] = useState("");

    // Mock articles data - will be replaced with API call
    const [articles] = useState<Article[]>([
        {
            id: "1",
            title: "Understanding Homeopathic Potencies: A Professional Guide",
            excerpt: "Learn about the different potencies in homeopathy and when to use each one for optimal therapeutic results.",
            content: "Full article content...",
            category: "homeopathy",
            readTime: 8,
            publishedDate: "2024-01-15",
            featured: true,
            imageUrl: "/images/articles/homeopathy-potencies.jpg"
        },
        {
            id: "2",
            title: "Natural Approaches to Stress Management",
            excerpt: "Discover evidence-based natural remedies and lifestyle approaches for managing stress and anxiety effectively.",
            content: "Full article content...",
            category: "wellness",
            readTime: 6,
            publishedDate: "2024-01-12",
            imageUrl: "/images/articles/stress-management.jpg"
        },
        {
            id: "3",
            title: "Herbal Medicine for Digestive Health",
            excerpt: "Explore traditional and modern applications of herbal remedies for common digestive complaints.",
            content: "Full article content...",
            category: "herbs",
            readTime: 10,
            publishedDate: "2024-01-10",
            imageUrl: "/images/articles/digestive-herbs.jpg"
        },
        {
            id: "4",
            title: "Latest Research in Natural Medicine",
            excerpt: "Review of recent clinical studies and research developments in naturopathy and complementary medicine.",
            content: "Full article content...",
            category: "research",
            readTime: 12,
            publishedDate: "2024-01-08",
            imageUrl: "/images/articles/research-update.jpg"
        }
    ]);

    const categories = [
        { value: "all", label: "All Articles" },
        { value: "homeopathy", label: t("articles.category.homeopathy", language) },
        { value: "herbs", label: t("articles.category.herbs", language) },
        { value: "wellness", label: t("articles.category.wellness", language) },
        { value: "research", label: t("articles.category.research", language) },
        { value: "nutrition", label: t("articles.category.nutrition", language) }
    ];

    const featuredArticle = articles.find(article => article.featured);
    const regularArticles = articles.filter(article => !article.featured);

    const filteredArticles = selectedCategory === "all" 
        ? regularArticles 
        : regularArticles.filter(article => article.category === selectedCategory);

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Newsletter signup:", email);
        setEmail("");
        // Add newsletter signup logic here
    };

    return (
        <div className="Articles min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-dh-navy to-dh-ocean text-white">
                <div className="container mx-auto px-4 py-8 lg:py-12">
                    <div className="text-center">
                        <h1 className="text-2xl lg:text-4xl font-bold mb-4">
                            {t("articles.title", language)}
                        </h1>
                        <p className="text-dh-pale text-sm lg:text-lg max-w-3xl mx-auto">
                            {t("articles.description", language)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                {/* Featured Article */}
                {featuredArticle && (
                    <div className="mb-8">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="lg:flex">
                                <div className="lg:w-1/2">
                                    <div className="aspect-video lg:aspect-square bg-gray-200 relative">
                                        {featuredArticle.imageUrl ? (
                                            <img
                                                src={featuredArticle.imageUrl}
                                                alt={featuredArticle.title}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <span className="text-6xl">📄</span>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-dh-ocean text-white px-3 py-1 rounded-full text-xs font-medium">
                                                {t("articles.featured", language)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 lg:w-1/2 lg:flex lg:flex-col lg:justify-center">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                        <span className="bg-gray-100 px-3 py-1 rounded-full">
                                            {t(`articles.category.${featuredArticle.category}`, language)}
                                        </span>
                                        <span>{featuredArticle.readTime} {t("articles.readTime", language)}</span>
                                    </div>
                                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                                        {featuredArticle.title}
                                    </h2>
                                    <p className="text-gray-600 mb-4 text-sm lg:text-base">
                                        {featuredArticle.excerpt}
                                    </p>
                                    <button className="bg-dh-ocean hover:bg-dh-navy text-white px-6 py-3 rounded-lg font-medium transition-colors self-start">
                                        {t("articles.readMore", language)}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Category Filter */}
                <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <button
                                key={category.value}
                                onClick={() => setSelectedCategory(category.value)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    selectedCategory === category.value
                                        ? 'bg-dh-ocean text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {filteredArticles.map(article => (
                        <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="aspect-video bg-gray-200 relative">
                                {article.imageUrl ? (
                                    <img
                                        src={article.imageUrl}
                                        alt={article.title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <span className="text-4xl">📄</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="p-4">
                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                    <span className="bg-gray-100 px-2 py-1 rounded">
                                        {t(`articles.category.${article.category}`, language)}
                                    </span>
                                    <span>{article.readTime} {t("articles.readTime", language)}</span>
                                </div>
                                
                                <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-gray-600 text-xs lg:text-sm mb-4 line-clamp-3">
                                    {article.excerpt}
                                </p>
                                
                                <button className="text-dh-ocean hover:text-dh-navy font-medium text-sm transition-colors">
                                    {t("articles.readMore", language)} →
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-r from-dh-navy to-dh-ocean rounded-lg p-6 lg:p-8 text-white text-center">
                    <h3 className="text-xl lg:text-2xl font-bold mb-3">
                        {t("articles.newsletter.title", language)}
                    </h3>
                    <p className="text-dh-pale mb-6 text-sm lg:text-base">
                        {t("articles.newsletter.description", language)}
                    </p>
                    
                    <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t("articles.newsletter.placeholder", language)}
                                required
                                className="flex-1 px-4 py-3 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-dh-light text-sm lg:text-base"
                            />
                            <button
                                type="submit"
                                className="bg-dh-light hover:bg-white text-dh-navy px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                {t("articles.newsletter.subscribe", language)}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}