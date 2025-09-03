import Joi from "joi";
import { BadRequestError } from "./error-models";
import { UploadedFile } from "express-fileupload";

export class ProductModel {
    public id: string;
    public name_en: string;
    public name_he: string;
    public description_en: string;
    public description_he: string;
    public short_description_en?: string;
    public short_description_he?: string;
    public price: number;
    public sale_price?: number;
    public sku?: string;
    public stock_quantity: number;
    public manage_stock: boolean;
    public in_stock: boolean;
    public weight?: number;
    public dimensions?: string;
    public imageName?: string;
    public gallery?: string[]; // Array of additional image names
    public meta_title_en?: string;
    public meta_title_he?: string;
    public meta_description_en?: string;
    public meta_description_he?: string;
    public is_active: boolean;
    public is_featured: boolean;
    public sort_order: number;
    public created_at?: Date;
    public updated_at?: Date;
    
    // For file upload handling
    public image?: UploadedFile;
    public imageUrl?: string; // Computed field for frontend

    public constructor(product: ProductModel) {
        this.id = product.id;
        this.name_en = product.name_en;
        this.name_he = product.name_he;
        this.description_en = product.description_en;
        this.description_he = product.description_he;
        this.short_description_en = product.short_description_en;
        this.short_description_he = product.short_description_he;
        this.price = product.price;
        this.sale_price = product.sale_price;
        this.sku = product.sku;
        this.stock_quantity = product.stock_quantity ?? 0;
        this.manage_stock = product.manage_stock ?? true;
        this.in_stock = product.in_stock ?? true;
        this.weight = product.weight;
        this.dimensions = product.dimensions;
        this.imageName = product.imageName;
        this.gallery = product.gallery;
        this.meta_title_en = product.meta_title_en;
        this.meta_title_he = product.meta_title_he;
        this.meta_description_en = product.meta_description_en;
        this.meta_description_he = product.meta_description_he;
        this.is_active = product.is_active ?? true;
        this.is_featured = product.is_featured ?? false;
        this.sort_order = product.sort_order ?? 0;
        this.created_at = product.created_at;
        this.updated_at = product.updated_at;
        
        // File upload properties
        this.image = product.image;
        this.imageUrl = product.imageUrl;
    }

    private static insertValidationSchema = Joi.object({
        id: Joi.string().uuid().optional(),
        name_en: Joi.string().min(2).max(200).required(),
        name_he: Joi.string().min(2).max(200).required(),
        description_en: Joi.string().min(10).max(5000).required(),
        description_he: Joi.string().min(10).max(5000).required(),
        price: Joi.number().min(0).precision(2).required(),
        image: Joi.object().optional()
    }).unknown(true);

    private static updateValidationSchema = Joi.object({
        id: Joi.string().uuid().required(),
        name_en: Joi.string().min(2).max(200).required(),
        name_he: Joi.string().min(2).max(200).required(),
        description_en: Joi.string().min(10).max(5000).required(),
        description_he: Joi.string().min(10).max(5000).required(),
        price: Joi.number().min(0).precision(2).required(),
        image: Joi.object().optional(),
        imageUrl: Joi.string().optional().max(500)
    }).unknown(true);

    public validateInsert(): void {
        const result = ProductModel.insertValidationSchema.validate(this);
        if (result.error) {
            throw new BadRequestError(result.error.message);
        }
    }

    public validateUpdate(): void {
        const result = ProductModel.updateValidationSchema.validate(this);
        if (result.error) {
            throw new BadRequestError(result.error.message);
        }
    }

    // Get localized name based on language
    public getName(language: 'en' | 'he' = 'en'): string {
        return language === 'he' ? this.name_he : this.name_en;
    }

    // Get localized description based on language
    public getDescription(language: 'en' | 'he' = 'en'): string {
        return language === 'he' ? this.description_he : this.description_en;
    }

    // Get localized short description based on language
    public getShortDescription(language: 'en' | 'he' = 'en'): string | undefined {
        return language === 'he' ? this.short_description_he : this.short_description_en;
    }

    // Get final price (sale price if available, otherwise regular price)
    public getFinalPrice(): number {
        return this.sale_price && this.sale_price > 0 ? this.sale_price : this.price;
    }

    // Check if product is on sale
    public isOnSale(): boolean {
        return !!(this.sale_price && this.sale_price > 0 && this.sale_price < this.price);
    }

    // Get discount percentage if on sale
    public getDiscountPercentage(): number {
        if (!this.isOnSale()) return 0;
        return Math.round(((this.price - this.sale_price!) / this.price) * 100);
    }
}

