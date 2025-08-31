import { v4 as uuid } from "uuid";
import { dal } from "../2-utils/dal";
import { NotFoundError } from "../3-models/error-models";
import { CategoryModel } from "../3-models/category-model";

class CategoryService {

    public async getAllCategories(language: 'en' | 'he' = 'en'): Promise<CategoryModel[]> {
        const sql = `
        SELECT
            id, name_en, name_he, description_en, description_he,
            slug, parent_id, sort_order, is_active, created_at, updated_at
        FROM categories
        WHERE is_active = 1
        ORDER BY sort_order, ${language === 'he' ? 'name_he' : 'name_en'};
        `;
        const categories = await dal.execute(sql);
        return categories.map((category: any) => new CategoryModel(category));
    }

    public async getCategoryById(id: string): Promise<CategoryModel> {
        const sql = `
        SELECT
            id, name_en, name_he, description_en, description_he,
            slug, parent_id, sort_order, is_active, created_at, updated_at
        FROM categories
        WHERE id = ? AND is_active = 1
        `;
        const rows = await dal.execute(sql, [id]);
        if (rows.length === 0) throw new NotFoundError(`Category with id ${id} not found`);
        return new CategoryModel(rows[0]);
    }

    public async getCategoryBySlug(slug: string): Promise<CategoryModel> {
        const sql = `
        SELECT
            id, name_en, name_he, description_en, description_he,
            slug, parent_id, sort_order, is_active, created_at, updated_at
        FROM categories
        WHERE slug = ? AND is_active = 1
        `;
        const rows = await dal.execute(sql, [slug]);
        if (rows.length === 0) throw new NotFoundError(`Category with slug ${slug} not found`);
        return new CategoryModel(rows[0]);
    }

    public async addCategory(category: CategoryModel): Promise<CategoryModel> {
        // Validate
        category.validateInsert();
        
        // Create UUID
        const categoryId = uuid();

        // Check if slug already exists
        const slugCheck = "SELECT COUNT(*) as count FROM categories WHERE slug = ?";
        const slugExists = await dal.execute(slugCheck, [category.slug]);
        if (slugExists[0].count > 0) {
            throw new Error("Category slug already exists");
        }

        // Create SQL
        const sql = `
        INSERT INTO categories (
            id, name_en, name_he, description_en, description_he,
            slug, parent_id, sort_order, is_active
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // Create values array
        const values = [
            categoryId,
            category.name_en,
            category.name_he,
            category.description_en || null,
            category.description_he || null,
            category.slug,
            category.parent_id || null,
            category.sort_order || 0,
            category.is_active ?? true
        ];
        await dal.execute(sql, values);

        const dbCategory = await this.getCategoryById(categoryId);
        return dbCategory;
    }

    public async updateCategory(category: CategoryModel): Promise<CategoryModel> {
        // Validate
        category.validateUpdate();

        // Check if slug already exists (excluding current category)
        const slugCheck = "SELECT COUNT(*) as count FROM categories WHERE slug = ? AND id != ?";
        const slugExists = await dal.execute(slugCheck, [category.slug, category.id]);
        if (slugExists[0].count > 0) {
            throw new Error("Category slug already exists");
        }

        // Create SQL
        const sql = `
        UPDATE categories
        SET
            name_en = ?, name_he = ?, description_en = ?, description_he = ?,
            slug = ?, parent_id = ?, sort_order = ?, is_active = ?
        WHERE id = ?
        `;

        // Create values array
        const values = [
            category.name_en,
            category.name_he,
            category.description_en || null,
            category.description_he || null,
            category.slug,
            category.parent_id || null,
            category.sort_order || 0,
            category.is_active ?? true,
            category.id
        ];
        const result = await dal.execute(sql, values);
        if (result.affectedRows === 0) {
            throw new NotFoundError(`Category with id ${category.id} not found`);
        }

        const updatedCategory = await this.getCategoryById(category.id);
        return updatedCategory;
    }

    public async deleteCategory(id: string): Promise<void> {
        // Check if category has products
        const productCheck = "SELECT COUNT(*) as count FROM product_categories WHERE category_id = ?";
        const hasProducts = await dal.execute(productCheck, [id]);
        if (hasProducts[0].count > 0) {
            throw new Error("Cannot delete category that has products assigned to it");
        }

        // Check if category has child categories
        const childCheck = "SELECT COUNT(*) as count FROM categories WHERE parent_id = ?";
        const hasChildren = await dal.execute(childCheck, [id]);
        if (hasChildren[0].count > 0) {
            throw new Error("Cannot delete category that has child categories");
        }

        const sql = "UPDATE categories SET is_active = 0 WHERE id = ?";
        const result = await dal.execute(sql, [id]);
        if (result.affectedRows === 0) {
            throw new NotFoundError(`Category with id ${id} not found`);
        }
    }

    public async getMainCategories(language: 'en' | 'he' = 'en'): Promise<CategoryModel[]> {
        const sql = `
        SELECT
            id, name_en, name_he, description_en, description_he,
            slug, parent_id, sort_order, is_active, created_at, updated_at
        FROM categories
        WHERE parent_id IS NULL AND is_active = 1
        ORDER BY sort_order, ${language === 'he' ? 'name_he' : 'name_en'};
        `;
        const categories = await dal.execute(sql);
        return categories.map((category: any) => new CategoryModel(category));
    }

    public async getSubCategories(parentId: string, language: 'en' | 'he' = 'en'): Promise<CategoryModel[]> {
        const sql = `
        SELECT
            id, name_en, name_he, description_en, description_he,
            slug, parent_id, sort_order, is_active, created_at, updated_at
        FROM categories
        WHERE parent_id = ? AND is_active = 1
        ORDER BY sort_order, ${language === 'he' ? 'name_he' : 'name_en'};
        `;
        const categories = await dal.execute(sql, [parentId]);
        return categories.map((category: any) => new CategoryModel(category));
    }

    public async getCategoryTree(language: 'en' | 'he' = 'en'): Promise<any[]> {
        // Get all categories
        const allCategories = await this.getAllCategories(language);
        
        // Build tree structure
        const categoryMap = new Map();
        const tree: any[] = [];

        // Create map of all categories
        allCategories.forEach(category => {
            categoryMap.set(category.id, {
                ...category,
                children: []
            });
        });

        // Build tree
        allCategories.forEach(category => {
            if (category.parent_id) {
                const parent = categoryMap.get(category.parent_id);
                if (parent) {
                    parent.children.push(categoryMap.get(category.id));
                }
            } else {
                tree.push(categoryMap.get(category.id));
            }
        });

        return tree;
    }
}

export const categoryService = new CategoryService();