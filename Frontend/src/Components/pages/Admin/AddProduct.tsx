import { JSX, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../../Contexts/language-context";
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
        if (isEdit && id) {
            loadProduct(id);
        }
    }, [isEdit, id]);

    const loadProduct = async (productId: string) => {
        setInitialLoading(true);
        try {
            const response = await fetch(`http://localhost:4000/api/dhnaturally/products/${productId}`);
            if (response.ok) {
                const data = await response.json();
                setProduct(data);
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
            }

            const url = isEdit 
                ? `http://localhost:4000/api/dhnaturally/products/${id}`
                : 'http://localhost:4000/api/dhnaturally/products';
            
            const method = isEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                body: formData
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/admin');
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
                        {t("addProduct.back", language)}
                    </Button>
                    <h1>{t(`addProduct.${isEdit ? 'edit' : 'add'}.title`, language)}</h1>
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
                        <h3>{t("addProduct.image.title", language)}</h3>
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
                                        <span>{t("addProduct.image.upload", language)}</span>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className="form-section">
                        <h3>{t("addProduct.basic.title", language)}</h3>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="nameEn">{t("addProduct.name.en", language)} *</label>
                                <input
                                    type="text"
                                    id="nameEn"
                                    value={product.name_en}
                                    onChange={(e) => handleInputChange('name_en', e.target.value)}
                                    required
                                    className="form-input"
                                    placeholder={t("addProduct.name.en.placeholder", language)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="nameHe">{t("addProduct.name.he", language)} *</label>
                                <input
                                    type="text"
                                    id="nameHe"
                                    value={product.name_he}
                                    onChange={(e) => handleInputChange('name_he', e.target.value)}
                                    required
                                    className="form-input hebrew-input"
                                    dir="rtl"
                                    placeholder={t("addProduct.name.he.placeholder", language)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Descriptions */}
                    <div className="form-section">
                        <h3>{t("addProduct.descriptions.title", language)}</h3>
                        
                        <div className="form-group">
                            <label htmlFor="descEn">{t("addProduct.description.en", language)} *</label>
                            <textarea
                                id="descEn"
                                value={product.description_en}
                                onChange={(e) => handleInputChange('description_en', e.target.value)}
                                required
                                rows={8}
                                className="form-textarea"
                                placeholder={t("addProduct.description.en.placeholder", language)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="descHe">{t("addProduct.description.he", language)} *</label>
                            <textarea
                                id="descHe"
                                value={product.description_he}
                                onChange={(e) => handleInputChange('description_he', e.target.value)}
                                required
                                rows={8}
                                className="form-textarea hebrew-input"
                                dir="rtl"
                                placeholder={t("addProduct.description.he.placeholder", language)}
                            />
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="form-section">
                        <h3>{t("addProduct.pricing.title", language)}</h3>
                        
                        <div className="form-group">
                            <label htmlFor="price">{t("addProduct.price", language)} *</label>
                            <input
                                type="number"
                                id="price"
                                value={product.price}
                                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                                required
                                min="0"
                                step="0.01"
                                className="form-input"
                                placeholder={t("addProduct.price.placeholder", language)}
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
                            {t("addProduct.cancel", language)}
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
                            {loading ? t("addProduct.saving", language) : t(`addProduct.${isEdit ? 'update' : 'save'}`, language)}
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    );
}
