import express, { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { fileSaver } from "uploaded-file-saver";
import { StatusCode } from "../3-models/enums";
import { ProductModel } from "../3-models/product-model";
import { productService } from "../4-services/product-service";

class ProductController {
    public readonly router = express.Router();

    public constructor() {
        this.router.get("/dhnaturally/products", this.getAllProducts);
        this.router.get("/dhnaturally/products/:id", this.getProductById);
        this.router.post("/dhnaturally/products", this.addProduct);
        this.router.put("/dhnaturally/products/:id", this.updateProduct);
        this.router.delete("/dhnaturally/products/:id", this.deleteProduct);
    }

    private getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await productService.getAllProducts();
            res.json(products);
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