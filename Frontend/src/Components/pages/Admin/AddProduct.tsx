import { JSX, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../../Contexts/language-context";
import { useAuth } from "../../../Contexts/auth-context";
import { t } from "../../../lib/i18b";
import { Button } from "../../UI/Button/Buttons";
import { Upload, Save, ArrowLeft, Image as ImageIcon, Loader } from 'lucide-react';
import "./AddProduct.css";

interface ProductFormData {
    id?: string;
    name_en: string;
    name_he: string;
    description_en: string;
    description_he: string;
    price: number;
}

export function AddProduct(): JSX.Element {
    const { language } = useLanguage();
    const { token } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);
    
    const [product, setProduct] = useState<ProductFormData>({
        name_en: '',
        name_he: '',
        description_en: '',
        description_he: '',
        price: 0
    });
    
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [initialLoading, setInitialLoading] = useState<boolean>(isEdit);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        const loadProduct = async (productId: string) => {
            setInitialLoading(true);
            try {
                const response = await fetch(`http://localhost:4000/api/dhnaturally/products/${productId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Loaded product data:', data); // Debug log
                    
                    // Map the API data to the form structure
                    setProduct({
                        name_en: data.name_en || '',
                        name_he: data.name_he || '',
                        description_en: data.description_en || '',
                        description_he: data.description_he || '',
                        price: data.price || 0
                    });
                    
                    // Set image preview if exists
                    if (data.imageUrl) {
                        setImagePreview(data.imageUrl);
                    }
                } else {
                    setError('Failed to load product');
                }
            } catch (err: any) {
                setError(err.message || 'Failed to load product');
            } finally {
                setInitialLoading(false);
            }
        };

        if (isEdit && id) {
            loadProduct(id);
        }
    }, [isEdit, id, token]);

    const handleInputChange = (field: keyof ProductFormData, value: string | number | boolean) => {
        setProduct(prev => ({ ...prev, [field]: value }));
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
            const formData = new FormData();
            
            // Add all product fields
            Object.entries(product).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value.toString());
                }
            });
            
            // Add image if selected
            if (imageFile) {
                formData.append('image', imageFile);
                console.log('Image file added to FormData:', imageFile.name, imageFile.size);
            }

            console.log('FormData contents:');
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            const url = isEdit 
                ? `http://localhost:4000/api/dhnaturally/products/${id}`
                : 'http://localhost:4000/api/dhnaturally/products';
            
            const method = isEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`
                    // Note: Don't set Content-Type for FormData - browser sets it automatically with boundary
                },
                body: formData
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    // Force refresh of admin dashboard by adding timestamp
                    navigate('/admin?refresh=' + Date.now());
                }, 2000);
            } else {
                const errorData = await response.text();
                throw new Error(errorData || `Failed to ${isEdit ? 'update' : 'create'} product`);
            }
        } catch (err: any) {
            setError(err.message || `Failed to ${isEdit ? 'update' : 'create'} product`);
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="add-product">
                <div className="loading-container">
                    <Loader className="animate-spin" size={32} />
                    <p>Loading product...</p>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="add-product">
                <div className="success-message">
                    <h2>{t(`addProduct.success.${isEdit ? 'update' : 'create'}.title`, language)}</h2>
                    <p>{t(`addProduct.success.${isEdit ? 'update' : 'create'}.message`, language)}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="add-product">
            <header className="add-product-header">
                <div className="container">
                    <Button 
                        className="outline"
                        onClick={() => navigate('/admin')}
                    >
                        <ArrowLeft size={16} />
                        {t("admin.nav.backToDashboard", language)}
                    </Button>
                    <h1>{isEdit 
                        ? t('admin.product.form.edit.title', language) 
                        : t('admin.product.form.title', language)
                    }</h1>
                </div>
            </header>

            <main className="container">
                <form onSubmit={handleSubmit} className="product-form">
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {/* Image Upload */}
                    <div className="form-section">
                        <h3>{t("admin.product.form.image", language)}</h3>
                        <div className="image-upload">
                            <input
                                type="file"
                                id="productImage"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="image-input"
                            />
                            <label htmlFor="productImage" className="image-upload-label">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="image-preview" />
                                ) : (
                                    <div className="upload-placeholder">
                                        <ImageIcon size={48} />
                                        <span>{t("admin.product.form.uploadImage", language)}</span>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className="form-section">
                        <h3>{t("admin.product.form.basicInfo", language)}</h3>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="nameEn">{t("admin.product.form.name.en", language)} *</label>
                                <input
                                    type="text"
                                    id="nameEn"
                                    value={product.name_en}
                                    onChange={(e) => handleInputChange('name_en', e.target.value)}
                                    required
                                    className="form-input"
                                    placeholder={t("admin.product.form.placeholder.name.en", language)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="nameHe">{t("admin.product.form.name.he", language)} *</label>
                                <input
                                    type="text"
                                    id="nameHe"
                                    value={product.name_he}
                                    onChange={(e) => handleInputChange('name_he', e.target.value)}
                                    required
                                    className="form-input hebrew-input"
                                    dir="rtl"
                                    placeholder={t("admin.product.form.placeholder.name.he", language)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Descriptions */}
                    <div className="form-section">
                        <h3>{t("admin.product.form.content", language)}</h3>
                        
                        <div className="form-group">
                            <label htmlFor="descEn">{t("admin.product.form.description.en", language)} *</label>
                            <textarea
                                id="descEn"
                                value={product.description_en}
                                onChange={(e) => handleInputChange('description_en', e.target.value)}
                                required
                                rows={8}
                                className="form-textarea"
                                placeholder={t("admin.product.form.placeholder.description.en", language)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="descHe">{t("admin.product.form.description.he", language)} *</label>
                            <textarea
                                id="descHe"
                                value={product.description_he}
                                onChange={(e) => handleInputChange('description_he', e.target.value)}
                                required
                                rows={8}
                                className="form-textarea hebrew-input"
                                dir="rtl"
                                placeholder={t("admin.product.form.placeholder.description.he", language)}
                            />
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="form-section">
                        <h3>{t("admin.product.form.price", language)}</h3>
                        
                        <div className="form-group">
                            <label htmlFor="price">{t("admin.product.form.price", language)} *</label>
                            <input
                                type="number"
                                id="price"
                                value={product.price}
                                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                                required
                                min="0"
                                step="0.01"
                                className="form-input"
                                placeholder={t("admin.product.form.placeholder.price", language)}
                            />
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="form-actions">
                        <Button 
                            type="button" 
                            className="outline"
                            onClick={() => navigate('/admin')}
                        >
                            {t("admin.product.form.cancel", language)}
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
                            {loading 
                                ? t("admin.product.form.saving", language) 
                                : t("admin.product.form.save", language)
                            }
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    );
}
