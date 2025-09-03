import express, { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { fileSaver } from "uploaded-file-saver";
import { StatusCode } from "../3-models/enums";
import { ProductModel } from "../3-models/product-model";
import { productService } from "../4-services/product-service";
import { authMiddleware } from "../6-middleware/auth-middleware";

class ProductController {
    public readonly router = express.Router();

    public constructor() {
        // Public routes (no authentication required)
        this.router.get("/dhnaturally/products", this.getAllProductsOrSearch);
        this.router.get("/dhnaturally/products/:id", this.getProductById);
        
        // Admin-only routes (authentication + admin role required)
        this.router.post("/dhnaturally/products", authMiddleware.verifyToken, authMiddleware.verifyAdmin, this.addProduct);
        this.router.put("/dhnaturally/products/:id", authMiddleware.verifyToken, authMiddleware.verifyAdmin, this.updateProduct);
        this.router.delete("/dhnaturally/products/:id", authMiddleware.verifyToken, authMiddleware.verifyAdmin, this.deleteProduct);
    }

    private getAllProductsOrSearch = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { search } = req.query;
            
            if (search && typeof search === 'string' && search.trim()) {
                // Handle search request
                const result = await productService.searchProducts(search.trim());
                res.json(result.products);
            } else {
                // Handle get all products request
                const products = await productService.getAllProducts();
                res.json(products);
            }
        } catch (error) {
            next(error);
        }
    }

    private getProductById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await productService.getProductById(req.params.id);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }

    private addProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = new ProductModel(req.body);
            
            // Handle image file if uploaded
            if (req.files && req.files.image) {
                product.image = req.files.image as UploadedFile;
            }
            
            const addedProduct = await productService.addProduct(product);
            res.status(StatusCode.Created).json(addedProduct);
        } catch (error) {
            next(error);
        }
    }

    private updateProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = new ProductModel(req.body);
            product.id = req.params.id;
            
            // Handle image file if uploaded
            if (req.files && req.files.image) {
                product.image = req.files.image as UploadedFile;
            }
            
            const updatedProduct = await productService.updateProduct(product);
            res.json(updatedProduct);
        } catch (error) {
            next(error);
        }
    }

    private deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await productService.deleteProduct(req.params.id);
            res.sendStatus(StatusCode.NoContent);
        } catch (error) {
            next(error);
        }
    }
}

export const productController = new ProductController();