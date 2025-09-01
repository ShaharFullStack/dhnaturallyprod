import { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../Contexts/language-context";
import { t } from "../../../lib/i18b";
import "./Articles.css";
import { Image, Tag, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../../UI/Button/Buttons';

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
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [email, setEmail] = useState<string>("");

    const [articles] = useState<Article[]>([
        {
            id: "similia-similibus-curenter",
            title: language === 'he' ? 'העיקרון ההומיאופתי של סימיליה סימיליבוס קורנטור - "דומה מרפא דומה"' : 'The Homeopathic Principle of Similia Similibus Curentur - "Like Cures Like"',
            excerpt: language === 'he' ? 'חקירה לעיקרון המרכזי של ההומיאופתיה, מערכת רפואית שהוקמה בסוף המאה ה-18 על ידי ד"ר סמואל האנמן' : 'An exploration into the central principle of homeopathy, a medical system founded in the late 18th century by Dr. Samuel Hahnemann',
            content: "",
            category: "homeopathy",
            readTime: 12,
            publishedDate: "2024-01-20",
            featured: true,
            imageUrl: "images/makingMeds.png"
        },
        {
            id: "1",
            title: t("articles.mock.1.title", language),
            excerpt: t("articles.mock.1.excerpt", language),
            content: t("articles.mock.1.content", language),
            category: "homeopathy",
            readTime: 8,
            publishedDate: "2024-01-15",
            featured: false,
            imageUrl: "/images/articles/homeopathy-potencies.jpg"
        },
        {
            id: "2",
            title: t("articles.mock.2.title", language),
            excerpt: t("articles.mock.2.excerpt", language),
            content: t("articles.mock.2.content", language),
            category: "wellness",
            readTime: 6,
            publishedDate: "2024-01-12",
            imageUrl: "/images/articles/stress-management.jpg"
        },
        {
            id: "3",
            title: t("articles.mock.3.title", language),
            excerpt: t("articles.mock.3.excerpt", language),
            content: t("articles.mock.3.content", language),
            category: "herbs",
            readTime: 10,
            publishedDate: "2024-01-10",
            imageUrl: "/images/articles/digestive-herbs.jpg"
        },
        {
            id: "4",
            title: t("articles.mock.4.title", language),
            excerpt: t("articles.mock.4.excerpt", language),
            content: t("articles.mock.4.content", language),
            category: "research",
            readTime: 12,
            publishedDate: "2024-01-08",
            imageUrl: "/images/articles/research-update.jpg"
        }
    ]);

    const categories = [
    { value: "all", label: t("articles.category.all", language) },
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
    };

    return (
        <div className="articles">
            <header className="articles-hero">
                <div className="container">
                    <h1 className="hero-title">{t("articles.title", language)}</h1>
                    <p className="hero-subtitle">{t("articles.description", language)}</p>
                </div>
            </header>

            <main className="container articles-main">
                {featuredArticle && (
                    <section className="featured">
                        <div className="featured-card">
                            <div className="featured-media">
                                {featuredArticle.imageUrl ? (
                                    <img src={featuredArticle.imageUrl} alt={featuredArticle.title} className="featured-image" loading="lazy" />
                                ) : (
                                    <div className="image-fallback"><Image size={48} /></div>
                                )}
                                <div className="featured-badge">{t("articles.featured", language)}</div>
                            </div>

                            <div className="featured-body">
                                <div className="meta">
                                    <span className="pill"><Tag size={14} className="meta-icon" /> {t(`articles.category.${featuredArticle.category}`, language)}</span>
                                    <span className="meta-item"><Clock size={14} className="meta-icon" /> {featuredArticle.readTime} {t("articles.readTime", language)}</span>
                                </div>
                                <h2 className="featured-title">{featuredArticle.title}</h2>
                                <p className="featured-excerpt">{featuredArticle.excerpt}</p>
                                <Button className="primary" onClick={() => navigate(`/articles/${featuredArticle.id}`)}>{t("articles.readMore", language)}</Button>
                            </div>
                        </div>
                    </section>
                )}

                <div className="category-filter">
                    {categories.map(category => (
                        <Button
                            key={category.value}
                            onClick={() => setSelectedCategory(category.value)}
                            className={`filter-pill ${selectedCategory === category.value ? 'active' : ''}`}
                        >
                            {category.label}
                        </Button>
                    ))}
                </div>

                <section className="articles-grid">
                    {filteredArticles.map(article => (
                        <article key={article.id} className="article-card">
                            <div className="article-media">
                                {article.imageUrl ? (
                                    <img src={article.imageUrl} alt={article.title} className="article-image" loading="lazy" />
                                ) : (
                                    <div className="image-fallback"><Image size={36} /></div>
                                )}
                            </div>

                            <div className="article-body">
                                <div className="meta">
                                    <span className="pill small"><Tag size={12} className="meta-icon" /> {t(`articles.category.${article.category}`, language)}</span>
                                    <span className="meta-item"><Clock size={12} className="meta-icon" /> {article.readTime} {t("articles.readTime", language)}</span>
                                </div>

                                <h3 className="article-title">{article.title}</h3>
                                <p className="article-excerpt">{article.excerpt}</p>
                                <div className="article-actions">
                                    <Button className="link" onClick={() => navigate(`/articles/${article.id}`)}>{t("articles.readMore", language)} <ArrowRight size={14} /></Button>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>

                <section className="newsletter">
                    <div className="newsletter-box">
                        <h3 className="newsletter-title">{t("articles.newsletter.title", language)}</h3>
                        <p className="newsletter-subtitle">{t("articles.newsletter.description", language)}</p>

                        <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t("articles.newsletter.placeholder", language)}
                                required
                                className="input"
                            />
                            <Button type="submit" className="primary">{t("articles.newsletter.subscribe", language)}</Button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
}
