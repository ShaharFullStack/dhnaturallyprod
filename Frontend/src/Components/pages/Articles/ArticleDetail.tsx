import { JSX, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../Contexts/language-context";
import { t } from "../../../lib/i18b";
import { ArrowLeft, Clock, Tag, Share2, Bookmark } from 'lucide-react';
import { Button } from '../../UI/Button/Buttons';
import "./ArticleDetail.css";
import { articleService } from "../../../Services/ArticleService";
import { ArticleModel } from "../../../Models/ArticleModel";

interface Article {
    id: string;
    title: string;
    excerpt?: string;
    subtitle?: string;
    content: string;
    category?: string;
    readTime: number;
    publishedDate: string;
    imageUrl?: string;
    featured?: boolean;
    author?: string;
}

export function ArticleDetail(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const [article, setArticle] = useState<Article | null>(null);
    const [isBookmarked, setIsBookmarked] = useState(false);

    // Simple markdown to HTML converter
    const markdownToHtml = (markdown: string): string => {
        return markdown
            // Headers
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/__(.*?)__/g, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/_(.*?)_/g, '<em>$1</em>')
            // Lists
            .replace(/^\* (.*$)/gim, '<li>$1</li>')
            .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
            .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
            // Line breaks
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>')
            // Wrap in paragraph tags
            .replace(/^([^<].*?)(?=<|$)/mg, '<p>$1</p>')
            // Clean up empty paragraphs
            .replace(/<p><\/p>/g, '')
            .replace(/<p><br><\/p>/g, '');
    };

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                if (!id) return navigate('/articles');
                const dbArticle: ArticleModel = await articleService.getArticleById(id);
                if (!dbArticle) return navigate('/articles');

                const mapped: Article = {
                    id: dbArticle.id,
                    title: language === 'he' ? (dbArticle.title_he || dbArticle.title_en) : (dbArticle.title_en || dbArticle.title_he),
                    excerpt: language === 'he' ? (dbArticle.subtitle_he || dbArticle.subtitle_en) : (dbArticle.subtitle_en || dbArticle.subtitle_he),
                    subtitle: language === 'he' ? (dbArticle.subtitle_he || dbArticle.subtitle_en) : (dbArticle.subtitle_en || dbArticle.subtitle_he),
                    content: language === 'he' ? (dbArticle.content_he || dbArticle.content_en) : (dbArticle.content_en || dbArticle.content_he),
                    category: undefined,
                    readTime: Math.max(1, Math.round(((dbArticle.content_en || dbArticle.content_he) || '').length / 800)),
                    publishedDate: dbArticle.created_at ? new Date(dbArticle.created_at).toISOString() : new Date().toISOString(),
                    imageUrl: (dbArticle as any).imageUrl || undefined,
                    featured: false,
                    author: undefined
                };

                if (mounted) setArticle(mapped);
            } catch (err) {
                console.error(err);
                navigate('/articles');
            }
        };
        load();
        return () => { mounted = false };
    }, [id, language, navigate]);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: article?.title,
                text: article?.excerpt,
                url: window.location.href,
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        // In a real app, this would save to local storage or backend
    };

    if (!article) {
        return (
            <div className="article-detail-loading">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="article-detail">
            <div className="container">
                {/* Back Button */}
                <div className="back-navigation">
                    <Button onClick={() => navigate('/articles')} className="back-button">
                        <ArrowLeft size={16} />
                        {language === 'he' ? 'חזרה למאמרים' : 'Back to Articles'}
                    </Button>
                </div>

                {/* Article Header */}
                <header className="article-header">
                    <div className="article-meta">
                        <span className="category-pill">
                            <Tag size={14} />
                            {t(`articles.category.${article.category}`, language)}
                        </span>
                        <span className="read-time">
                            <Clock size={14} />
                            {article.readTime} {t("articles.readTime", language)}
                        </span>
                        <span className="publish-date">
                            {new Date(article.publishedDate).toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </div>

                    <h1 className="article-title">{article.title}</h1>

                    {article.excerpt && (
                        <p className="article-excerpt">{article.excerpt}</p>
                    )}

                    {article.author && (
                        <div className="article-author">
                            <span>{language === 'he' ? 'מאת:' : 'By:'} {article.author}</span>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="article-actions">
                        <Button onClick={handleShare} className="action-button">
                            <Share2 size={16} />
                            {language === 'he' ? 'שתף' : 'Share'}
                        </Button>
                        <Button onClick={handleBookmark} className={`action-button ${isBookmarked ? 'bookmarked' : ''}`}>
                            <Bookmark size={16} />
                            {language === 'he' ? 'שמור' : 'Bookmark'}
                        </Button>
                    </div>
                </header>

                {/* Article Image */}
                {article.imageUrl && (
                    <div className="article-image-container">
                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="article-image"
                            loading="lazy"
                        />
                    </div>
                )}

                {/* Article Content */}
                <div
                    className="article-content"
                    dangerouslySetInnerHTML={{
                        __html: markdownToHtml(article.content)
                    }}
                />

                {/* Article Footer */}
                <footer className="article-footer">
                    <div className="article-tags">
                        <span className="tags-label">{language === 'he' ? 'תגיות:' : 'Tags:'}</span>
                        <span className="tag">{t(`articles.category.${article.category}`, language)}</span>
                        <span className="tag">Homeopathy</span>
                        <span className="tag">Natural Medicine</span>
                    </div>

                    <div className="article-share">
                        <h4>{language === 'he' ? 'שתף מאמר זה' : 'Share this article'}</h4>
                        <div className="share-buttons">
                            <Button onClick={handleShare} className="share-button">
                                <Share2 size={16} />
                                {language === 'he' ? 'שתף' : 'Share'}
                            </Button>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
