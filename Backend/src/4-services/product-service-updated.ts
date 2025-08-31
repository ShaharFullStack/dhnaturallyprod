import { OkPacketParams } from "mysql2";
import { v4 as uuid } from "uuid";
import { fileSaver } from "uploaded-file-saver";
import { dal } from "../2-utils/dal";
import { NotFoundError } from "../3-models/error-models";
import { ProductModel } from "../3-models/product-model";
import { appConfig } from "../2-utils/app-config";

class ProductService {

    public async getAllProducts(language: 'en' | 'he' = 'en'): Promise<ProductModel[]> {
        const sql = `
        SELECT
            id, name_en, name_he, description_en, description_he, 
            short_description_en, short_description_he, price, sale_price,
            sku, stock_quantity, manage_stock, in_stock, weight, dimensions,
            imageName, gallery, meta_title_en, meta_title_he, 
            meta_description_en, meta_description_he, is_active, is_featured, 
            sort_order, created_at, updated_at,
            CONCAT('${appConfig.dhnaturallyImagesWebPath}', imageName) AS imageUrl
        FROM products
        WHERE is_active = 1
        ORDER BY ${language === 'he' ? 'name_he' : 'name_en'}, sort_order;
        `;
        const products = await dal.execute(sql);
        return products.map((product: any) => new ProductModel(product));
    }

    public async getProductById(id: string): Promise<ProductModel> {
        const sql = `
        SELECT
            id, name_en, name_he, description_en, description_he, 
            short_description_en, short_description_he, price, sale_price,
            sku, stock_quantity, manage_stock, in_stock, weight, dimensions,
            imageName, gallery, meta_title_en, meta_title_he, 
            meta_description_en, meta_description_he, is_active, is_featured, 
            sort_order, created_at, updated_at,
            CONCAT('${appConfig.dhnaturallyImagesWebPath}', imageName) AS imageUrl
        FROM products
        WHERE id = ? AND is_active = 1
        `;
        const rows = await dal.execute(sql, [id]);
        if (rows.length === 0) throw new NotFoundError(`Product with id ${id} not found`);
        return new ProductModel(rows[0]);
    }

    public async addProduct(product: ProductModel): Promise<ProductModel> {

        // Validate
        product.validateInsert();
        // Create UUID
        const productId = uuid();

        // Handle image if exists
        let imageName = null;
        if (product.image) {
            imageName = await fileSaver.add(product.image);
        }

        // Create SQL
        const sql = `
        INSERT INTO products (
            id, name_en, name_he, description_en, description_he,
            short_description_en, short_description_he, price, sale_price,
            sku, stock_quantity, manage_stock, in_stock, weight, dimensions,
            imageName, gallery, meta_title_en, meta_title_he,
            meta_description_en, meta_description_he, is_active, is_featured, sort_order
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // Create values array
        const values = [
            productId,
            product.name_en,
            product.name_he,
            product.description_en,
            product.description_he,
            product.short_description_en || null,
            product.short_description_he || null,
            product.price,
            product.sale_price || null,
            product.sku || null,
            product.stock_quantity || 0,
            product.manage_stock ?? true,
            product.in_stock ?? true,
            product.weight || null,
            product.dimensions || null,
            imageName,
            product.gallery ? JSON.stringify(product.gallery) : null,
            product.meta_title_en || null,
            product.meta_title_he || null,
            product.meta_description_en || null,
            product.meta_description_he || null,
            product.is_active ?? true,
            product.is_featured ?? false,
            product.sort_order || 0
        ];
        await dal.execute(sql, values);

        const dbProduct = await this.getProductById(productId);
        return dbProduct;
    }

    public async updateProduct(product: ProductModel): Promise<ProductModel> {
        // Validate
        product.validateUpdate();

        // Handle image if exists
        let imageName = await this.getImageName(product.id);
        if (product.image) {
            imageName = await fileSaver.update(imageName, product.image);
        }

        // Create SQL
        const sql = `
        UPDATE products
        SET
            name_en = ?, name_he = ?, description_en = ?, description_he = ?,
            short_description_en = ?, short_description_he = ?, price = ?, sale_price = ?,
            sku = ?, stock_quantity = ?, manage_stock = ?, in_stock = ?, weight = ?,
            dimensions = ?, imageName = ?, gallery = ?, meta_title_en = ?, meta_title_he = ?,
            meta_description_en = ?, meta_description_he = ?, is_active = ?, is_featured = ?,
            sort_order = ?
        WHERE id = ?
        `;

        // Create values array
        const values = [
            product.name_en,
            product.name_he,
            product.description_en,
            product.description_he,
            product.short_description_en || null,
            product.short_description_he || null,
            product.price,
            product.sale_price || null,
            product.sku || null,
            product.stock_quantity || 0,
            product.manage_stock ?? true,
            product.in_stock ?? true,
            product.weight || null,
            product.dimensions || null,
            imageName,
            product.gallery ? JSON.stringify(product.gallery) : null,
            product.meta_title_en || null,
            product.meta_title_he || null,
            product.meta_description_en || null,
            product.meta_description_he || null,
            product.is_active ?? true,
            product.is_featured ?? false,
            product.sort_order || 0,
            product.id
        ];
        const result: OkPacketParams = await dal.execute(sql, values);
        if (result.affectedRows === 0) {
            throw new NotFoundError(`Product with id ${product.id} not found`);
        }

        const updatedProduct = await this.getProductById(product.id);
        return updatedProduct;
    }

    public async deleteProduct(id: string): Promise<void> {

        const imageName = await this.getImageName(id);
        const sql = `
        DELETE FROM products
        WHERE id = ?
        `;
        const result: OkPacketParams = await dal.execute(sql, [id]);
        if (result.affectedRows === 0) {
            throw new NotFoundError(`Product with id ${id} not found`);
        }

        // Remove image if exists
        if (imageName) {
            await fileSaver.delete(imageName);
        }
    }

    private async getImageName(productId: string): Promise<string> {
        const sql = `
        SELECT imageName
        FROM products
        WHERE id = ?
        `;
        const result = await dal.execute(sql, [productId]);

        if (result.length === 0) {
            throw new NotFoundError(`Product with id ${productId} not found`);
        }
        return result[0]?.imageName;
    }

    public async searchProducts(searchValue: string, language: 'en' | 'he' = 'en', page: number = 1, pageSize: number = 10): Promise<{ products: ProductModel[], total: number }> {
        const offset = (page - 1) * pageSize;
        const sql = `
        SELECT 
            id, name_en, name_he, description_en, description_he, 
            short_description_en, short_description_he, price, sale_price,
            sku, stock_quantity, manage_stock, in_stock, weight, dimensions,
            imageName, gallery, meta_title_en, meta_title_he, 
            meta_description_en, meta_description_he, is_active, is_featured, 
            sort_order, created_at, updated_at,
            CONCAT('${appConfig.dhnaturallyImagesWebPath}', imageName) AS imageUrl
        FROM products
        WHERE is_active = 1 AND (
            name_en LIKE CONCAT('%', ?, '%') OR 
            name_he LIKE CONCAT('%', ?, '%') OR 
            description_en LIKE CONCAT('%', ?, '%') OR 
            description_he LIKE CONCAT('%', ?, '%') OR
            short_description_en LIKE CONCAT('%', ?, '%') OR 
            short_description_he LIKE CONCAT('%', ?, '%')
        )
        ORDER BY ${language === 'he' ? 'name_he' : 'name_en'}
        LIMIT ? OFFSET ?;
        `;

        const totalSql = `
        SELECT COUNT(*) as count
        FROM products
        WHERE is_active = 1 AND (
            name_en LIKE CONCAT('%', ?, '%') OR 
            name_he LIKE CONCAT('%', ?, '%') OR 
            description_en LIKE CONCAT('%', ?, '%') OR 
            description_he LIKE CONCAT('%', ?, '%') OR
            short_description_en LIKE CONCAT('%', ?, '%') OR 
            short_description_he LIKE CONCAT('%', ?, '%')
        )
        `;

        const [products, totalResult] = await Promise.all([
            dal.execute(sql, [searchValue, searchValue, searchValue, searchValue, searchValue, searchValue, pageSize, offset]),
            dal.execute(totalSql, [searchValue, searchValue, searchValue, searchValue, searchValue, searchValue])
        ]);

        const total = totalResult[0]?.count || 0;
        return { 
            products: products.map((product: any) => new ProductModel(product)), 
            total 
        };
    }

    public async getFeaturedProducts(language: 'en' | 'he' = 'en', limit: number = 8): Promise<ProductModel[]> {
        const sql = `
        SELECT
            id, name_en, name_he, description_en, description_he, 
            short_description_en, short_description_he, price, sale_price,
            sku, stock_quantity, manage_stock, in_stock, weight, dimensions,
            imageName, gallery, meta_title_en, meta_title_he, 
            meta_description_en, meta_description_he, is_active, is_featured, 
            sort_order, created_at, updated_at,
            CONCAT('${appConfig.dhnaturallyImagesWebPath}', imageName) AS imageUrl
        FROM products
        WHERE is_active = 1 AND is_featured = 1 AND in_stock = 1
        ORDER BY ${language === 'he' ? 'name_he' : 'name_en'}, sort_order
        LIMIT ?;
        `;
        const products = await dal.execute(sql, [limit]);
        return products.map((product: any) => new ProductModel(product));
    }

    public async getProductsByCategory(categoryId: string, language: 'en' | 'he' = 'en', page: number = 1, pageSize: number = 12): Promise<{ products: ProductModel[], total: number }> {
        const offset = (page - 1) * pageSize;
        const sql = `
        SELECT 
            p.id, p.name_en, p.name_he, p.description_en, p.description_he, 
            p.short_description_en, p.short_description_he, p.price, p.sale_price,
            p.sku, p.stock_quantity, p.manage_stock, p.in_stock, p.weight, p.dimensions,
            p.imageName, p.gallery, p.meta_title_en, p.meta_title_he, 
            p.meta_description_en, p.meta_description_he, p.is_active, p.is_featured, 
            p.sort_order, p.created_at, p.updated_at,
            CONCAT('${appConfig.dhnaturallyImagesWebPath}', p.imageName) AS imageUrl
        FROM products p
        JOIN product_categories pc ON p.id = pc.product_id
        WHERE pc.category_id = ? AND p.is_active = 1 AND p.in_stock = 1
        ORDER BY ${language === 'he' ? 'p.name_he' : 'p.name_en'}, p.sort_order
        LIMIT ? OFFSET ?;
        `;

        const totalSql = `
        SELECT COUNT(*) as count
        FROM products p
        JOIN product_categories pc ON p.id = pc.product_id
        WHERE pc.category_id = ? AND p.is_active = 1 AND p.in_stock = 1
        `;

        const [products, totalResult] = await Promise.all([
            dal.execute(sql, [categoryId, pageSize, offset]),
            dal.execute(totalSql, [categoryId])
        ]);

        const total = totalResult[0]?.count || 0;
        return { 
            products: products.map((product: any) => new ProductModel(product)), 
            total 
        };
    }
}

export const productService = new ProductService();