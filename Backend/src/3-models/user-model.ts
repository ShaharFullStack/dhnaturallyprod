import Joi from "joi";
import { BadRequestError } from "./error-models";
import { RoleModel } from "./role-model";

export class UserModel {
    public id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public phone?: string;
    public roleId: RoleModel;
    public isActive: boolean;
    public emailVerified: boolean;
    public lastLogin?: Date;
    public createdAt?: Date;
    public updatedAt?: Date;

    public constructor(user: UserModel) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.phone = user.phone;
        this.roleId = user.roleId;
        this.isActive = user.isActive ?? true;
        this.emailVerified = user.emailVerified ?? false;
        this.lastLogin = user.lastLogin;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }

    private static insertValidationSchema = Joi.object({
        id: Joi.string().optional().uuid(),
        firstName: Joi.string().required().min(2).max(100).trim(),
        lastName: Joi.string().required().min(2).max(100).trim(),
        email: Joi.string().required().email().max(255).lowercase().trim(),
        password: Joi.string().required().min(6).max(100),
        phone: Joi.string().optional().max(20).pattern(/^[\d\-\+\(\)\s]+$/),
        roleId: Joi.number().optional().valid(1, 2, 3),
        isActive: Joi.boolean().optional(),
        emailVerified: Joi.boolean().optional()
    });

    private static updateValidationSchema = Joi.object({
        id: Joi.string().required().uuid(),
        firstName: Joi.string().required().min(2).max(100).trim(),
        lastName: Joi.string().required().min(2).max(100).trim(),
        email: Joi.string().required().email().max(255).lowercase().trim(),
        phone: Joi.string().optional().allow('').max(20).pattern(/^[\d\-\+\(\)\s]*$/),
        isActive: Joi.boolean().optional(),
        emailVerified: Joi.boolean().optional()
    });

    private static loginValidationSchema = Joi.object({
        email: Joi.string().required().email().max(255).lowercase().trim(),
        password: Joi.string().required().min(1).max(100)
    });

    public validateInsert(): void {
        const result = UserModel.insertValidationSchema.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }

    public validateUpdate(): void {
        const result = UserModel.updateValidationSchema.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }

    public validateLogin(): void {
        const result = UserModel.loginValidationSchema.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }

    // Remove sensitive information before sending to client
    public toPublicObject(): Partial<UserModel> {
        const { password, ...publicUser } = this;
        return publicUser;
    }
}