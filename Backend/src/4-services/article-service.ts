import { OkPacketParams } from "mysql2";
import { v4 as uuid } from "uuid";
import { fileSaver } from "uploaded-file-saver";
import path from "path";
import { dal } from "../2-utils/dal";
import { NotFoundError } from "../3-models/error-models";
import { ArticleModel } from "../3-models/article-model";
import { appConfig } from "../2-utils/app-config";

const articlesPath = path.join(__dirname, "..", "1-assets", "images", "articles");
const productsPath = path.join(__dirname, "..", "1-assets", "images", "products");

// Helper functions to temporarily configure fileSaver for articles
async function addArticleImage(image: any): Promise<string> {
    // Temporarily configure for articles
    fileSaver.config(articlesPath);
    const result = await fileSaver.add(image);
    // Restore to products configuration
    fileSaver.config(productsPath);
    return result;
}

async function updateArticleImage(existingImage: string, newImage: any): Promise<string> {
    // Temporarily configure for articles
    fileSaver.config(articlesPath);
    const result = await fileSaver.update(existingImage, newImage);
    // Restore to products configuration
    fileSaver.config(productsPath);
    return result;
}

async function deleteArticleImage(imageName: string): Promise<void> {
    // Temporarily configure for articles
    fileSaver.config(articlesPath);
    await fileSaver.delete(imageName);
    // Restore to products configuration
    fileSaver.config(productsPath);
}

function slugify(input: string): string {
    if (!input) return '';
    // Lowercase
    let s = input.toString().toLowerCase();
    // Replace non-alphanumeric (including punctuation/whitespace) with hyphen
    s = s.replace(/[^a-z0-9]+/g, '-');
    // Trim leading/trailing hyphens
    s = s.replace(/^-+|-+$/g, '');
    return s;
}

class ArticleService {
    public async getAllArticles(): Promise<ArticleModel[]> {
        const sql = `
        SELECT
            id,
            title AS title_en,
            subtitle AS subtitle_en,
            title_he,
            subtitle_he,
            content AS content_en,
            content_he,
            CASE 
                WHEN imageName IS NULL OR imageName = '' THEN NULL
                ELSE CONCAT('http://localhost:4000/api/articles/images/', imageName)
            END AS imageUrl,
            is_published,
            created_at
        FROM articles
        ORDER BY created_at DESC;
        `;
        const articles = await dal.execute(sql);
        return articles;
    }

    // Accept either a UUID id or a slug (stored in `slug` column).
    // If `slug` column isn't present in the DB, this will still work because
    // we attempt slug lookup first; if DB doesn't have slug, query will simply not match.
    public async getArticleById(idOrSlug: string): Promise<ArticleModel> {
        const sql = `
        SELECT
            id,
            title AS title_en,
            subtitle AS subtitle_en,
            title_he,
            subtitle_he,
            content AS content_en,
            content_he,
            imageName,
            CASE 
                WHEN imageName IS NULL OR imageName = '' THEN NULL
                ELSE CONCAT('http://localhost:4000/api/articles/images/', imageName)
            END AS imageUrl,
            is_published,
            created_at,
            updated_at
        FROM articles
        WHERE id = ?
          OR slug = ?
        LIMIT 1
        `;
        const slug = slugify(idOrSlug);
        const rows = await dal.execute(sql, [idOrSlug, slug]);
        if (!rows || rows.length === 0) throw new NotFoundError(`Article with id ${idOrSlug} not found`);
        return new ArticleModel(rows[0]);
    }

    public async addArticle(article: ArticleModel): Promise<ArticleModel> {
        article.validateInsert();
        const articleId = uuid();

        let imageName = null;
        // @ts-ignore file property may be present
        if ((article as any).image) {
            // @ts-ignore
            imageName = await addArticleImage((article as any).image);
        }

        const slug = slugify(article.title_en || article.title_he || '');

        const sql = `
        INSERT INTO articles (id, title, subtitle, title_he, subtitle_he, content, content_he, imageName, is_published, slug)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            articleId,
            article.title_en || article.title_he,
            article.subtitle_en || article.subtitle_he || null,
            article.title_he || article.title_en,
            article.subtitle_he || article.subtitle_en || null,
            article.content_en || article.content_he,
            article.content_he || article.content_en,
            imageName,
            article.is_published ?? false,
            slug
        ];
        await dal.execute(sql, values);

        const dbArticle = await this.getArticleById(articleId);
        return dbArticle;
    }

    public async updateArticle(article: ArticleModel): Promise<ArticleModel> {
        article.validateUpdate();

    let imageName = await this.getImageName(article.id);
    const slug = slugify(article.title_en || article.title_he || '');
        if ((article as any).image) {
            // @ts-ignore
            imageName = await updateArticleImage(imageName, (article as any).image);
        }

        const sql = `
        UPDATE articles
        SET title = ?, subtitle = ?, title_he = ?, subtitle_he = ?, content = ?, content_he = ?, imageName = ?, is_published = ?, slug = ?
        WHERE id = ?
        `;

        const values = [
            article.title_en || article.title_he,
            article.subtitle_en || article.subtitle_he || null,
            article.title_he || article.title_en,
            article.subtitle_he || article.subtitle_en || null,
            article.content_en || article.content_he,
            article.content_he || article.content_en,
            imageName,
            article.is_published ?? false,
            slug,
            article.id
        ];

        const result: OkPacketParams = await dal.execute(sql, values);
        if (result.affectedRows === 0) throw new NotFoundError(`Article with id ${article.id} not found`);

        return await this.getArticleById(article.id);
    }

    public async deleteArticle(id: string): Promise<void> {
        const imageName = await this.getImageName(id);
        const sql = `
        DELETE FROM articles
        WHERE id = ?
        `;
        const result: OkPacketParams = await dal.execute(sql, [id]);
        if (result.affectedRows === 0) throw new NotFoundError(`Article with id ${id} not found`);

        if (imageName) await deleteArticleImage(imageName);
    }

    private async getImageName(articleId: string): Promise<string> {
        const sql = `
        SELECT imageName FROM articles WHERE id = ?
        `;
        const result = await dal.execute(sql, [articleId]);
        if (result.length === 0) throw new NotFoundError(`Article with id ${articleId} not found`);
        return result[0]?.imageName;
    }
}

export const articleService = new ArticleService();
