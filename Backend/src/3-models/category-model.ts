import Joi from "joi";
import { BadRequestError } from "./error-models";

export class CategoryModel {
    public id: string;
    public name_en: string;
    public name_he: string;
    public description_en?: string;
    public description_he?: string;
    public slug: string;
    public parent_id?: string;
    public sort_order: number;
    public is_active: boolean;
    public created_at?: Date;
    public updated_at?: Date;

    public constructor(category: CategoryModel) {
        this.id = category.id;
        this.name_en = category.name_en;
        this.name_he = category.name_he;
        this.description_en = category.description_en;
        this.description_he = category.description_he;
        this.slug = category.slug;
        this.parent_id = category.parent_id;
        this.sort_order = category.sort_order ?? 0;
        this.is_active = category.is_active ?? true;
        this.created_at = category.created_at;
        this.updated_at = category.updated_at;
    }

    private static insertValidationSchema = Joi.object({
        id: Joi.string().uuid().optional(),
        name_en: Joi.string().min(2).max(100).required(),
        name_he: Joi.string().min(2).max(100).required(),
        description_en: Joi.string().max(1000).optional(),
        description_he: Joi.string().max(1000).optional(),
        slug: Joi.string().min(2).max(100).pattern(/^[a-z0-9-]+$/).required(),
        parent_id: Joi.string().uuid().optional().allow(null),
        sort_order: Joi.number().integer().optional(),
        is_active: Joi.boolean().optional()
    }).unknown(true);

    private static updateValidationSchema = Joi.object({
        id: Joi.string().uuid().required(),
        name_en: Joi.string().min(2).max(100).required(),
        name_he: Joi.string().min(2).max(100).required(),
        description_en: Joi.string().max(1000).optional().allow(''),
        description_he: Joi.string().max(1000).optional().allow(''),
        slug: Joi.string().min(2).max(100).pattern(/^[a-z0-9-]+$/).required(),
        parent_id: Joi.string().uuid().optional().allow(null),
        sort_order: Joi.number().integer().optional(),
        is_active: Joi.boolean().optional()
    }).unknown(true);

    public validateInsert(): void {
        const result = CategoryModel.insertValidationSchema.validate(this);
        if (result.error) {
            throw new BadRequestError(result.error.message);
        }
    }

    public validateUpdate(): void {
        const result = CategoryModel.updateValidationSchema.validate(this);
        if (result.error) {
            throw new BadRequestError(result.error.message);
        }
    }

    // Get localized name based on language
    public getName(language: 'en' | 'he' = 'en'): string {
        return language === 'he' ? this.name_he : this.name_en;
    }

    // Get localized description based on language
    public getDescription(language: 'en' | 'he' = 'en'): string | undefined {
        return language === 'he' ? this.description_he : this.description_en;
    }
}