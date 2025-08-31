import Joi from "joi";
import { BadRequestError } from "./error-models";
import { UploadedFile } from "express-fileupload";

export class ProductModel {
    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public image: UploadedFile;
    public imageUrl: string;

    public constructor(product: ProductModel) {
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.image = product.image;
        this.imageUrl = product.imageUrl;
    }


    public static insertValidationSchema = Joi.object({
        id: Joi.string().uuid().required(),
        name: Joi.string().min(2).max(100).required(),
        description: Joi.string().min(10).max(1000).required(),
        price: Joi.number().min(0).required(),
        image: Joi.object().required()
    });

    public validateInsert(): void {
        const result = ProductModel.insertValidationSchema.validate(this);

        if (result.error) {
            throw new BadRequestError(result.error.message);
        }
    }

    private static updateValidationSchema = Joi.object({
        id: Joi.string().uuid().required(),
        name: Joi.string().min(2).max(100).required(),
        description: Joi.string().min(10).max(1000).required(),
        price: Joi.number().min(0).required(),
        image: Joi.object().required(),
        imageUrl: Joi.string().optional().max(200),

    });

    public validateUpdate(): void {
        const result = ProductModel.updateValidationSchema.validate(this);
        if (result.error) {
            throw new BadRequestError(result.error.message);
        }
    }
}

