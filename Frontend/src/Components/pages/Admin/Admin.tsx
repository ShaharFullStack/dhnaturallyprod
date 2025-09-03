import React, { JSX, useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { t } from '../../../lib/i18b';
import { useLanguage } from '../../../Contexts/language-context';
import { useAuth } from '../../../Contexts/auth-context';
import { 
    Plus, 
    Edit, 
    Trash2, 
    Package, 
    FileText, 
    BarChart3,
    Search,
    Eye,
    CheckCircle,
    XCircle,
    Calendar,
    Image as ImageIcon
} from 'lucide-react';
import { Button } from '../../UI/Button/Buttons';
import './AdminDashboard.css';

interface Product {
    id: string;
    name_en: string;
    name_he: string;
    price: number;
    imageUrl?: string;
    created_at: string;
}

interface Article {
    id: string;
    title_en: string;
    title_he: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

export function Admin(): JSX.Element {
    const { language } = useLanguage();
    const { logout, token } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'articles'>('overview');
    const [products, setProducts] = useState<Product[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

    const loadProducts = useCallback(async () => {
        setLoading(true);
        try {
            // Add cache-busting parameter to ensure fresh data
            const response = await fetch(`http://localhost:4000/api/dhnaturally/products?_t=${Date.now()}`);
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }
        } catch (error) {
            console.error('Failed to load products:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const loadArticles = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:4000/api/dhnaturally/articles');
            if (response.ok) {
                const data = await response.json();
                setArticles(data);
            }
        } catch (error) {
            console.error('Failed to load articles:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (activeTab === 'products') {
            loadProducts();
        } else if (activeTab === 'articles') {
            loadArticles();
        }
    }, [activeTab, loadProducts, loadArticles]);

    // Listen for refresh parameter from URL
    useEffect(() => {
        const refresh = searchParams.get('refresh');
        if (refresh && activeTab === 'products') {
            loadProducts();
        }
    }, [searchParams, activeTab, loadProducts]);

    const deleteProduct = async (id: string) => {
        if (!window.confirm(t('admin.confirm.delete.product', language) ?? 'Are you sure you want to delete this product?')) {
            return;
        }
        
        try {
            const response = await fetch(`http://localhost:4000/api/dhnaturally/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                loadProducts();
            } else {
                console.error('Failed to delete product:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    const deleteArticle = async (id: string) => {
        if (!window.confirm(t('admin.confirm.delete.article', language) ?? 'Are you sure you want to delete this article?')) {
            return;
        }
        
        try {
            const response = await fetch(`http://localhost:4000/api/dhnaturally/articles/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                loadArticles();
            } else {
                console.error('Failed to delete article:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to delete article:', error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.name_he.includes(searchTerm);
        // Simplified filtering since we don't have is_active field
        return matchesSearch;
    });

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             article.title_he.includes(searchTerm);
        const matchesFilter = filterStatus === 'all' || 
                             (filterStatus === 'active' && article.is_published) ||
                             (filterStatus === 'inactive' && !article.is_published);
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <div className="container">
                    <div className="header-content">
                        <div>
                            <h1>{t('admin.dashboard.title', language) ?? 'Admin Dashboard'}</h1>
                            <p>{t('admin.dashboard.welcome', language) ?? 'Manage your products and articles'}</p>
                        </div>
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="admin-content container">
                {/* Navigation Tabs */}
                <div className="admin-nav">
                    <button 
                        className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <BarChart3 size={20} />
                        {t('admin.dashboard.overview', language) ?? 'Overview'}
                    </button>
                    <button 
                        className={`nav-tab ${activeTab === 'products' ? 'active' : ''}`}
                        onClick={() => setActiveTab('products')}
                    >
                        <Package size={20} />
                        {t('admin.dashboard.products', language) ?? 'Products'}
                    </button>
                    <button 
                        className={`nav-tab ${activeTab === 'articles' ? 'active' : ''}`}
                        onClick={() => setActiveTab('articles')}
                    >
                        <FileText size={20} />
                        {t('admin.dashboard.articles', language) ?? 'Articles'}
                    </button>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="overview-content">
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <Package size={24} />
                                </div>
                                <div className="stat-info">
                                    <h3>{products.length}</h3>
                                    <p>{t('admin.dashboard.totalProducts', language) ?? 'Total Products'}</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <FileText size={24} />
                                </div>
                                <div className="stat-info">
                                    <h3>{articles.length}</h3>
                                    <p>{t('admin.dashboard.totalArticles', language) ?? 'Total Articles'}</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <CheckCircle size={24} />
                                </div>
                                <div className="stat-info">
                                    <h3>{products.length}</h3>
                                    <p>{t('admin.products.title', language) ?? 'Products'}</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <CheckCircle size={24} />
                                </div>
                                <div className="stat-info">
                                    <h3>{articles.filter(a => a.is_published).length}</h3>
                                    <p>{t('admin.articles.published', language) ?? 'Published Articles'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="quick-actions">
                            <h3>{t('admin.dashboard.recentActivity', language) ?? 'Quick Actions'}</h3>
                            <div className="action-buttons">
                                <Button 
                                    className="action-btn"
                                    onClick={() => navigate('/admin/products/new')}
                                >
                                    <Plus size={20} />
                                    {t('admin.products.add', language) ?? 'Add New Product'}
                                </Button>
                                <Button 
                                    className="action-btn"
                                    onClick={() => navigate('/admin/articles/new')}
                                >
                                    <Plus size={20} />
                                    {t('admin.articles.add', language) ?? 'Add New Article'}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div className="products-content">
                        <div className="content-header">
                            <h2>{t('admin.products.title', language) ?? 'Products Management'}</h2>
                            <Button onClick={() => navigate('/admin/products/new')}>
                                <Plus size={16} />
                                {t('admin.products.add', language) ?? 'Add Product'}
                            </Button>
                        </div>

                        <div className="filters">
                            <div className="search-box">
                                <Search size={20} />
                                <input
                                    type="text"
                                    placeholder={t('admin.products.search', language) ?? 'Search products...'}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <select 
                                value={filterStatus} 
                                onChange={(e) => setFilterStatus(e.target.value as any)}
                            >
                                <option value="all">{t('admin.status.active', language) ?? 'All'}</option>
                                <option value="active">{t('admin.status.active', language) ?? 'Active'}</option>
                                <option value="inactive">{t('admin.status.inactive', language) ?? 'Inactive'}</option>
                            </select>
                        </div>

                        {loading ? (
                            <div className="loading">{t('admin.loading.products', language) ?? 'Loading products...'}</div>
                        ) : (
                            <div className="items-grid">
                                {filteredProducts.map(product => (
                                    <div key={product.id} className="item-card">
                                        <div className="item-image">
                                            {product.imageUrl ? (
                                                <img src={product.imageUrl} alt={product.name_en} />
                                            ) : (
                                                <div className="no-image">
                                                    <ImageIcon size={32} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="item-content">
                                            <h3>{language === 'he' ? product.name_he : product.name_en}</h3>
                                            <div className="item-meta">
                                                <span className="price">
                                                    ${product.price}
                                                </span>
                                            </div>
                                            <div className="item-status">
                                                <span className="status active">
                                                    <CheckCircle size={16} />
                                                    {t('admin.status.active', language) ?? 'Available'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="item-actions">
                                            <Button 
                                                className="edit-btn"
                                                onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                            >
                                                <Edit size={16} />
                                            </Button>
                                            <Button 
                                                className="delete-btn"
                                                onClick={() => deleteProduct(product.id)}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Articles Tab */}
                {activeTab === 'articles' && (
                    <div className="articles-content">
                        <div className="content-header">
                            <h2>{t('admin.articles.title', language) ?? 'Articles Management'}</h2>
                            <Button onClick={() => navigate('/admin/articles/new')}>
                                <Plus size={16} />
                                {t('admin.articles.add', language) ?? 'Add Article'}
                            </Button>
                        </div>

                        <div className="filters">
                            <div className="search-box">
                                <Search size={20} />
                                <input
                                    type="text"
                                    placeholder={t('admin.articles.search', language) ?? 'Search articles...'}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <select 
                                value={filterStatus} 
                                onChange={(e) => setFilterStatus(e.target.value as any)}
                            >
                                <option value="all">{t('admin.status.active', language) ?? 'All'}</option>
                                <option value="active">{t('admin.articles.published', language) ?? 'Published'}</option>
                                <option value="inactive">{t('admin.status.draft', language) ?? 'Draft'}</option>
                            </select>
                        </div>

                        {loading ? (
                            <div className="loading">{t('admin.loading.articles', language) ?? 'Loading articles...'}</div>
                        ) : (
                            <div className="items-list">
                                {filteredArticles.map(article => (
                                    <div key={article.id} className="item-row">
                                        <div className="item-info">
                                            <h3>{language === 'he' ? article.title_he : article.title_en}</h3>
                                            <div className="item-meta">
                                                <span className="date">
                                                    <Calendar size={14} />
                                                    {new Date(article.created_at).toLocaleDateString()}
                                                </span>
                                                {article.is_published ? (
                                                    <span className="status published">
                                                        <CheckCircle size={14} />
                                                        {t('admin.status.published', language) ?? 'Published'}
                                                    </span>
                                                ) : (
                                                    <span className="status draft">
                                                        <XCircle size={14} />
                                                        {t('admin.status.draft', language) ?? 'Draft'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="item-actions">
                                            <Button 
                                                className="view-btn"
                                                onClick={() => navigate(`/articles/${article.id}`)}
                                            >
                                                <Eye size={16} />
                                            </Button>
                                            <Button 
                                                className="edit-btn"
                                                onClick={() => navigate(`/admin/articles/edit/${article.id}`)}
                                            >
                                                <Edit size={16} />
                                            </Button>
                                            <Button 
                                                className="delete-btn"
                                                onClick={() => deleteArticle(article.id)}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Admin;
