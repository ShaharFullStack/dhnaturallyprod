import { OkPacketParams } from "mysql2";
import { v4 as uuid } from "uuid";
import { fileSaver } from "uploaded-file-saver";
import { dal } from "../2-utils/dal";
import { NotFoundError } from "../3-models/error-models";
import { ProductModel } from "../3-models/product-model";
import { appConfig } from "../2-utils/app-config";

class ProductService {

    public async getAllProducts(): Promise<ProductModel[]> {
        const sql = `
        SELECT
            id,
            name AS name_en,
            name_he,
            description AS description_en,
            description_he,
            price,
            imageName,
            created_at,
            updated_at,
            CASE 
                WHEN imageName IS NULL OR imageName = '' THEN NULL
                ELSE CONCAT('${appConfig.dhnaturallyImagesWebPath}', imageName)
            END AS imageUrl 
        FROM products
        ORDER BY name;
        `;
        const products = await dal.execute(sql);
        return products
    }

    public async getProductById(id: string): Promise<ProductModel> {
        const sql = `
        SELECT
            id,
            name AS name_en,
            name_he,
            description AS description_en,
            description_he,
            price,
            imageName,
            created_at,
            updated_at,
            CASE 
                WHEN imageName IS NULL OR imageName = '' THEN NULL
                ELSE CONCAT('${appConfig.dhnaturallyImagesWebPath}', imageName)
            END AS imageUrl
        FROM products
        WHERE id = ?
        `;
        const results = await dal.execute(sql, [id]);
        if (!results || !Array.isArray(results) || results.length === 0) {
            throw new NotFoundError(`Product with id ${id} not found`);
        }
        return new ProductModel(results[0]);
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
        INSERT INTO products (id, name, name_he, description, description_he, price, imageName)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        // Create values array
        const values = [
            productId,
            product.name_en,
            product.name_he,
            product.description_en,
            product.description_he,
            product.price,
            imageName
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
            name = ?,
            name_he = ?,
            description = ?,
            description_he = ?,
            price = ?,
            imageName = ?
        WHERE id = ?
        `;

        // Create values array
        const values = [
            product.name_en,
            product.name_he,
            product.description_en,
            product.description_he,
            product.price,
            imageName,
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

    public async searchProducts(searchValue: string, page: number = 1, pageSize: number = 50): Promise<{ products: ProductModel[], total: number }> {
        const offset = (page - 1) * pageSize;
        const sql = `
        SELECT
            id,
            name AS name_en,
            name_he,
            description AS description_en,
            description_he,
            price,
            imageName,
            created_at,
            updated_at,
            CASE 
                WHEN imageName IS NULL OR imageName = '' THEN NULL
                ELSE CONCAT('${appConfig.dhnaturallyImagesWebPath}', imageName)
            END AS imageUrl
        FROM products
        WHERE 
            name LIKE CONCAT('%', ?, '%') OR 
            name_he LIKE CONCAT('%', ?, '%') OR
            description LIKE CONCAT('%', ?, '%') OR
            description_he LIKE CONCAT('%', ?, '%')
        ORDER BY name
        LIMIT ? OFFSET ?
        `;

        const totalSql = `
        SELECT COUNT(*) as count
        FROM products
        WHERE 
            name LIKE CONCAT('%', ?, '%') OR 
            name_he LIKE CONCAT('%', ?, '%') OR
            description LIKE CONCAT('%', ?, '%') OR
            description_he LIKE CONCAT('%', ?, '%')
        `;

        const [products, totalResult] = await Promise.all([
            dal.execute(sql, [searchValue, searchValue, searchValue, searchValue, pageSize, offset]),
            dal.execute(totalSql, [searchValue, searchValue, searchValue, searchValue])
        ]);

        const total = totalResult[0]?.count || 0;
        return { products, total };
    }
}

export const productService = new ProductService();
