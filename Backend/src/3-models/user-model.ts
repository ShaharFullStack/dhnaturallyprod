import Joi from "joi";
import { BadRequestError } from "./error-models";
import { RoleModel } from "./role-model";

export class UserModel {
    public id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: RoleModel;
    public isActive: boolean;
    public emailVerified: boolean;
    public lastLogin?: string;
    public created_at?: string;
    public updated_at?: string;

    public constructor(user: Partial<UserModel> = {}) {
        // Accept both camelCase and snake_case properties coming from DB or client
        const anyUser: any = user as any;

        this.id = anyUser.id ?? "";
        this.firstName = anyUser.firstName ?? anyUser.first_name ?? "";
        this.lastName = anyUser.lastName ?? anyUser.last_name ?? "";
        this.email = anyUser.email ?? "";
        this.password = anyUser.password ?? "";
        this.roleId = anyUser.roleId ?? anyUser.role_id ?? RoleModel.User;
        this.isActive = anyUser.isActive ?? anyUser.is_active ?? true;
        this.emailVerified = anyUser.emailVerified ?? anyUser.email_verified ?? false;
        // Map timestamps from snake_case (DB) to camelCase
        this.lastLogin = anyUser.lastLogin ?? anyUser.last_login;
        this.updated_at = anyUser.updated_at;
        this.created_at = anyUser.created_at;
    }

    private static insertValidationSchema = Joi.object({
        firstName: Joi.string().required().min(2).max(100).trim(),
        lastName: Joi.string().required().min(2).max(100).trim(),
        email: Joi.string().required().email().max(255).lowercase().trim(),
        password: Joi.string().required().min(6).max(255),
        created_at: Joi.string().optional()
    }).unknown(true);
    private static updateValidationSchema = Joi.object({
        id: Joi.string().required().uuid(),
        firstName: Joi.string().required().min(2).max(100).trim(),
        lastName: Joi.string().required().min(2).max(100).trim(),
        email: Joi.string().required().email().max(255).lowercase().trim(),
        isActive: Joi.boolean().optional(),
        emailVerified: Joi.boolean().optional(),
        lastLogin: Joi.string().optional(),
        created_at: Joi.string().optional(),
        updated_at: Joi.string().optional()
    }).unknown(true);

    private static loginValidationSchema = Joi.object({
        email: Joi.string().required().email().max(255).lowercase().trim(),
        password: Joi.string().required().min(1).max(100)
    }); // Only allow email and password fields

    public validateInsert(): void {
        const result = UserModel.insertValidationSchema.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }

    public validateUpdate(): void {
        const result = UserModel.updateValidationSchema.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }

    public validateLogin(): void {
        // Create a completely clean object with only email and password
        const cleanLoginData = {
            email: this.email,
            password: this.password
        };
        
        // Create a fresh schema for validation
        const loginSchema = Joi.object({
            email: Joi.string().required().email().max(255).lowercase().trim(),
            password: Joi.string().required().min(1).max(100)
        });
        
        console.log("Clean login data for validation:", cleanLoginData);
        const result = loginSchema.validate(cleanLoginData);
        console.log("Validation result:", result);
        if (result.error) throw new BadRequestError(result.error.message);
    }

    // Remove sensitive information before sending to client
    public toPublicObject(): Partial<UserModel> {
        const { password, ...publicUser } = this;
        return publicUser;
    }
}