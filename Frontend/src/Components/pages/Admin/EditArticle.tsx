import { JSX, useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../../Contexts/language-context";
import { useAuth } from "../../../Contexts/auth-context";
import { t } from "../../../lib/i18b";
import { Button } from "../../UI/Button/Buttons";
import { ArticleModel } from "../../../Models/ArticleModel";
import { articleService } from "../../../Services/ArticleService";
import { Upload, Save, ArrowLeft, Image as ImageIcon, Loader } from 'lucide-react';
import "../AddArticle/AddArticle.css";

export function EditArticle(): JSX.Element {
    const { language } = useLanguage();
    const { token } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [article, setArticle] = useState<ArticleModel>(new ArticleModel({
        is_published: false
    }));
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const loadArticle = useCallback(async (articleId: string) => {
        setInitialLoading(true);
        try {
            const headers: Record<string, string> = {
                'Content-Type': 'application/json'
            };
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`http://localhost:4000/api/dhnaturally/articles/${articleId}`, {
                headers
            });
            if (response.ok) {
                const data = await response.json();
                setArticle(new ArticleModel(data));
                if (data.imageName) {
                    setImagePreview(`http://localhost:4000/api/articles/images/${data.imageName}`);
                }
            } else {
                setError('Failed to load article');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to load article');
        } finally {
            setInitialLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (id) {
            loadArticle(id);
        }
    }, [id, loadArticle]);

    const handleInputChange = (field: keyof ArticleModel, value: string | boolean | number) => {
        setArticle(prev => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            await articleService.updateArticle(article, imageFile || undefined);
            setSuccess(true);
            setTimeout(() => {
                navigate('/admin');
            }, 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Failed to update article');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="add-article">
                <div className="loading-container">
                    <Loader className="animate-spin" size={32} />
                    <p>Loading article...</p>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="add-article">
                <div className="success-message">
                    <h2>{t("admin.success.article.updated", language) ?? "Article updated successfully!"}</h2>
                    <p>{t("admin.nav.backToArticles", language) ?? "Redirecting to articles..."}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="add-article">
            <header className="add-article-header">
                <div className="container">
                    <Button 
                        className="outline"
                        onClick={() => navigate('/admin')}
                    >
                        <ArrowLeft size={16} />
                        {t("admin.nav.backToDashboard", language)}
                    </Button>
                    <h1>{t("admin.article.form.title", language)}</h1>
                </div>
            </header>

            <main className="container">
                <form onSubmit={handleSubmit} className="article-form">
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {/* Image Upload */}
                    <div className="form-section">
                        <h3>{t("addArticle.image.title", language)}</h3>
                        <div className="image-upload">
                            <input
                                type="file"
                                id="articleImage"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="image-input"
                            />
                            <label htmlFor="articleImage" className="image-upload-label">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="image-preview" />
                                ) : (
                                    <div className="upload-placeholder">
                                        <ImageIcon size={48} />
                                        <span>{t("addArticle.image.upload", language)}</span>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    {/* English Content */}
                    <div className="form-section">
                        <h3>{t("addArticle.english.title", language)}</h3>
                        
                        <div className="form-group">
                            <label htmlFor="titleEn">{t("addArticle.title.en", language)} *</label>
                            <input
                                type="text"
                                id="titleEn"
                                value={article.title_en}
                                onChange={(e) => handleInputChange('title_en', e.target.value)}
                                required
                                className="form-input"
                                placeholder={t("addArticle.title.en.placeholder", language)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subtitleEn">{t("addArticle.subtitle.en", language)}</label>
                            <input
                                type="text"
                                id="subtitleEn"
                                value={article.subtitle_en || ''}
                                onChange={(e) => handleInputChange('subtitle_en', e.target.value)}
                                className="form-input"
                                placeholder={t("addArticle.subtitle.en.placeholder", language)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contentEn">{t("addArticle.content.en", language)} *</label>
                            <textarea
                                id="contentEn"
                                value={article.content_en}
                                onChange={(e) => handleInputChange('content_en', e.target.value)}
                                required
                                rows={10}
                                className="form-textarea"
                                placeholder={t("addArticle.content.en.placeholder", language)}
                            />
                        </div>
                    </div>

                    {/* Hebrew Content */}
                    <div className="form-section">
                        <h3>{t("addArticle.hebrew.title", language)}</h3>
                        
                        <div className="form-group">
                            <label htmlFor="titleHe">{t("addArticle.title.he", language)} *</label>
                            <input
                                type="text"
                                id="titleHe"
                                value={article.title_he}
                                onChange={(e) => handleInputChange('title_he', e.target.value)}
                                required
                                className="form-input hebrew-input"
                                dir="rtl"
                                placeholder={t("addArticle.title.he.placeholder", language)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subtitleHe">{t("addArticle.subtitle.he", language)}</label>
                            <input
                                type="text"
                                id="subtitleHe"
                                value={article.subtitle_he || ''}
                                onChange={(e) => handleInputChange('subtitle_he', e.target.value)}
                                className="form-input hebrew-input"
                                dir="rtl"
                                placeholder={t("addArticle.subtitle.he.placeholder", language)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contentHe">{t("addArticle.content.he", language)} *</label>
                            <textarea
                                id="contentHe"
                                value={article.content_he}
                                onChange={(e) => handleInputChange('content_he', e.target.value)}
                                required
                                rows={10}
                                className="form-textarea hebrew-input"
                                dir="rtl"
                                placeholder={t("addArticle.content.he.placeholder", language)}
                            />
                        </div>
                    </div>

                    {/* Article Settings */}
                    <div className="form-section">
                        <h3>{t("addArticle.settings.title", language)}</h3>
                        
                        <div className="form-group checkbox-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={article.is_published || false}
                                    onChange={(e) => handleInputChange('is_published', e.target.checked)}
                                    className="form-checkbox"
                                />
                                <span className="checkbox-text">{t("addArticle.published", language)}</span>
                            </label>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="form-actions">
                        <Button 
                            type="button" 
                            className="outline"
                            onClick={() => navigate('/admin')}
                        >
                            {t("editArticle.cancel", language)}
                        </Button>
                        <Button 
                            type="submit" 
                            className="primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <Upload className="animate-spin" size={16} />
                            ) : (
                                <Save size={16} />
                            )}
                            {loading ? t("admin.article.form.saving", language) : t("admin.article.form.save", language)}
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    );
}
