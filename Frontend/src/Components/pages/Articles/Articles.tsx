import { JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../Contexts/language-context";
import { t } from "../../../lib/i18b";
import "./Articles.css";
import { Image, Tag, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../../UI/Button/Buttons';
import { ArticleModel } from "../../../Models/ArticleModel";

export function Articles(): JSX.Element {
    const { language } = useLanguage();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [email, setEmail] = useState<string>("");

    const [articles, setArticles] = useState<ArticleModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const sections = document.querySelectorAll('[data-scroll-animate]');
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                // In development, frontend runs on :3000 and backend on :4000
                const devHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                const base = devHost ? 'http://localhost:4000' : '';
                const res = await fetch(`${base}/api/dhnaturally/articles`);
                if (!res.ok) throw new Error(`Failed to load articles: ${res.status}`);
                const contentType = (res.headers.get('content-type') || '').toLowerCase();
                if (!contentType.includes('application/json')) {
                    const text = await res.text();
                    throw new Error(`Expected JSON but got ${contentType || 'unknown'}: ${text.substring(0,200)}`);
                }
                const data = await res.json();
                if (!cancelled) setArticles(data as ArticleModel[]);
            } catch (err: any) {
                if (!cancelled) setError(err.message ?? 'Unknown error');
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
        return () => { cancelled = true; };
    }, []);

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

    const getSlugOrId = (article: any) => article.slug ?? article.id;
    const getTitle = (article: any) => {
        if (language === 'he') {
            return article.title_he || article.title_en || article.title || '';
        }
        return article.title_en || article.title || article.title_he || '';
    };
    const getExcerpt = (article: any) => {
        if (language === 'he') {
            return article.excerpt_he || article.subtitle_he || article.excerpt || article.subtitle_en || '';
        }
        return article.excerpt || article.subtitle_en || article.excerpt_he || article.subtitle_he || '';
    };

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Newsletter signup:", email);
        setEmail("");
    };

    return (
        <div className="articles">
            {/* Hero Section */}
            <div className="articles-hero">
                <div className="hero-background"></div>
                <div className="articles-hero-inner">
                    <h1 className="h1-title" data-scroll-animate>DHnaturally</h1>
                    <h1 className="articles-hero-title" data-scroll-animate>{t("articles.title", language)}</h1>
                    <p className="articles-hero-subtitle" data-scroll-animate>{t("articles.description", language)}</p>
                    <div className="hero-cta" data-scroll-animate>
                        <Button className="primary lg">
                            {t("cta.getConsultation", language)}
                            <ArrowRight size={18} />
                        </Button>
                    </div>
                </div>
            </div>

            <main className="container articles-main">
                {loading && <div className="loading">{t('articles.loading', language) ?? 'Loading...'}</div>}
                {error && <div className="error">{error}</div>}

                {featuredArticle && (
                    <section className="featured">
                        <div className="featured-card">
                            <div className="featured-media">
                                {featuredArticle.imageUrl ? (
                                    <img src={featuredArticle.imageUrl} alt={getTitle(featuredArticle)} className="featured-image" loading="lazy" />
                                ) : (
                                    <div className="image-fallback"><Image size={48} /></div>
                                )}
                                <div className="featured-badge">{t("articles.featured", language)}</div>
                            </div>

                            <div className="featured-body">
                                <div className="meta">
                                    {featuredArticle.category && <span className="pill"><Tag size={14} className="meta-icon" /> {t(`articles.category.${featuredArticle.category}`, language)}</span>}
                                    {featuredArticle.readTime && <span className="meta-item"><Clock size={14} className="meta-icon" /> {featuredArticle.readTime} {t("articles.readTime", language)}</span>}
                                </div>
                                <h2 className="featured-title">{getTitle(featuredArticle)}</h2>
                                <p className="featured-excerpt">{getExcerpt(featuredArticle)}</p>
                                <Button className="primary" onClick={() => navigate(`/articles/${getSlugOrId(featuredArticle)}`)}>{t("articles.readMore", language)}</Button>
                            </div>
                        </div>
                    </section>
                )}

                {/* Only show category filter if articles have categories */}
                {articles.some(article => article.category) && (
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
                )}

                <section className="articles-grid">
                    {filteredArticles.map(article => (
                        <article key={article.id} className="article-card">
                            <div className="article-media">
                                {article.imageUrl ? (
                                    <img src={article.imageUrl} alt={getTitle(article)} className="article-image" loading="lazy" />
                                ) : (
                                    <div className="image-fallback"><Image size={36} /></div>
                                )}
                            </div>

                            <div className="article-body">
                                <div className="meta">
                                    {article.category && <span className="pill small"><Tag size={12} className="meta-icon" /> {t(`articles.category.${article.category}`, language)}</span>}
                                    {article.readTime && <span className="meta-item"><Clock size={12} className="meta-icon" /> {article.readTime} {t("articles.readTime", language)}</span>}
                                </div>

                                <h3 className="article-title">{getTitle(article)}</h3>
                                <p className="article-excerpt">{getExcerpt(article)}</p>
                                <div className="article-actions">
                                    <Button className="link" onClick={() => navigate(`/articles/${getSlugOrId(article)}`)}>{t("articles.readMore", language)} <ArrowRight size={14} /></Button>
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
