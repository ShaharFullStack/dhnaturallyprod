import Joi from "joi";
import { BadRequestError } from "./error-models";

export class ArticleModel {
    public id: string;
    public title_en: string;
    public subtitle_en: string;
    public title_he: string;
    public subtitle_he: string;
    public content_en: string;
    public content_he: string;
    public imageName?: string;
    public is_published: boolean;
    public created_at?: Date;
    public updated_at?: Date;

    constructor(article: Partial<ArticleModel> = {}) {
        this.id = article.id ?? "";
        this.title_en = article.title_en ?? "";
        this.subtitle_en = article.subtitle_en ?? "";
        this.title_he = article.title_he ?? "";
        this.subtitle_he = article.subtitle_he ?? "";
        this.content_en = article.content_en ?? "";
        this.content_he = article.content_he ?? "";
        this.imageName = article.imageName;
        this.is_published = article.is_published ?? false;
        this.created_at = article.created_at;
        this.updated_at = article.updated_at;
    }

    private static insertSchema = Joi.object({
        id: Joi.string().uuid().optional(),
        title_en: Joi.string().min(2).max(300).required(),
        subtitle_en: Joi.string().min(2).max(300).required(),
        title_he: Joi.string().min(2).max(300).required(),
        subtitle_he: Joi.string().min(2).max(300).required(),
        content_en: Joi.string().min(10).max(20000).required(),
        content_he: Joi.string().min(10).max(20000).required(),
        imageName: Joi.string().max(500).optional().allow(null, ""),
        is_published: Joi.boolean().optional()
    });

    private static updateSchema = Joi.object({
        id: Joi.string().uuid().required(),
        title_en: Joi.string().min(2).max(300).required(),
        subtitle_en: Joi.string().min(2).max(300).required(),
        title_he: Joi.string().min(2).max(300).required(),
        subtitle_he: Joi.string().min(2).max(300).required(),
        content_en: Joi.string().min(10).max(20000).required(),
        content_he: Joi.string().min(10).max(20000).required(),
        imageName: Joi.string().max(500).optional().allow(null, ""),
        is_published: Joi.boolean().optional()
    });

    public validateInsert(): void {
        const result = ArticleModel.insertSchema.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }

    public validateUpdate(): void {
        const result = ArticleModel.updateSchema.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }
}
