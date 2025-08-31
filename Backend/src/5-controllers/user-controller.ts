import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "../3-models/user-model";
import { userService } from "../4-services/user-service";
import { CredentialsModel } from "../3-models/credentials-model";
import { StatusCode } from "../3-models/enums";
import { authMiddleware } from "../6-middleware/auth-middleware";
import { BadRequestError } from "../3-models/error-models";

class UserController {

    public readonly router = express.Router();

    public constructor() {
        // Public routes
        this.router.post("/register", this.register);
        this.router.post("/login", this.login);
        this.router.post("/contact-us", this.saveContactForm);
        
        // Protected routes
        this.router.post("/logout", authMiddleware.verifyToken, this.logout);
        this.router.post("/logout-all", authMiddleware.verifyToken, this.logoutAll);
        this.router.get("/profile", authMiddleware.verifyToken, this.getProfile);
        this.router.put("/profile", authMiddleware.verifyToken, this.updateProfile);
        this.router.post("/change-password", authMiddleware.verifyToken, this.changePassword);
        
        // Admin routes
        this.router.get("/all", authMiddleware.verifyToken, authMiddleware.verifyAdminOrDev, this.getAllUsers);
        this.router.get("/:userId", authMiddleware.verifyToken, authMiddleware.verifyOwnerOrAdmin, this.getUserById);
        this.router.put("/:userId", authMiddleware.verifyToken, authMiddleware.verifyOwnerOrAdmin, this.updateUser);
        this.router.delete("/:userId", authMiddleware.verifyToken, authMiddleware.verifyAdmin, this.deleteUser);
    }

    public async register(request: Request, response: Response, next: NextFunction) {
        try {
            const user = new UserModel(request.body);
            const result = await userService.register(user);
            response.status(StatusCode.Created).json({
                message: "User registered successfully",
                token: result.token,
                user: result.user
            });
        }
        catch (err: any) {
            next(err);
        }
    }
    
    public async login(request: Request, response: Response, next: NextFunction) {
        try {
            const credentials = new CredentialsModel(request.body);
            const result = await userService.login(credentials);
            
            response.json({
                message: "Login successful",
                token: result.token,
                user: result.user
            });
        }
        catch (err: any) {
            next(err);
        }
    }

    public async saveContactForm(request: Request, response: Response, next: NextFunction) {
        try {
            const { name, email, phone, subject, message } = request.body;
            
            if (!name || !email || !message) {
                throw new BadRequestError("Name, email, and message are required");
            }
            
            await userService.saveContactForm({ name, email, phone, subject, message });
            response.status(StatusCode.Created).json({ 
                message: "Contact form submitted successfully. We will get back to you soon!" 
            });
        } catch (err: any) {
            next(err);
        }
    }

    public async logout(request: Request, response: Response, next: NextFunction) {
        try {
            const token = request.headers.authorization?.split(" ")[1];
            if (token && request.user) {
                await userService.logout(request.user.id, token);
            }
            response.json({ message: "Logged out successfully" });
        } catch (err: any) {
            next(err);
        }
    }

    public async logoutAll(request: Request, response: Response, next: NextFunction) {
        try {
            if (request.user) {
                await userService.logoutAllSessions(request.user.id);
            }
            response.json({ message: "Logged out from all devices successfully" });
        } catch (err: any) {
            next(err);
        }
    }

    public async getProfile(request: Request, response: Response, next: NextFunction) {
        try {
            if (!request.user) {
                throw new BadRequestError("User not found in request");
            }
            response.json({
                message: "Profile retrieved successfully",
                user: request.user.toPublicObject()
            });
        } catch (err: any) {
            next(err);
        }
    }

    public async updateProfile(request: Request, response: Response, next: NextFunction) {
        try {
            if (!request.user) {
                throw new BadRequestError("User not found in request");
            }
            
            const updatedUser = await userService.updateUser(request.user.id, request.body);
            response.json({
                message: "Profile updated successfully",
                user: updatedUser.toPublicObject()
            });
        } catch (err: any) {
            next(err);
        }
    }

    public async changePassword(request: Request, response: Response, next: NextFunction) {
        try {
            if (!request.user) {
                throw new BadRequestError("User not found in request");
            }
            
            const { currentPassword, newPassword } = request.body;
            if (!currentPassword || !newPassword) {
                throw new BadRequestError("Current password and new password are required");
            }
            
            await userService.changePassword(request.user.id, currentPassword, newPassword);
            response.json({ message: "Password changed successfully" });
        } catch (err: any) {
            next(err);
        }
    }

    public async getAllUsers(request: Request, response: Response, next: NextFunction) {
        try {
            const page = parseInt(request.query.page as string) || 1;
            const limit = parseInt(request.query.limit as string) || 10;
            
            const result = await userService.getAllUsers(page, limit);
            response.json({
                message: "Users retrieved successfully",
                users: result.users,
                pagination: {
                    page,
                    limit,
                    total: result.total,
                    pages: Math.ceil(result.total / limit)
                }
            });
        } catch (err: any) {
            next(err);
        }
    }

    public async getUserById(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = request.params.userId;
            const user = await userService.getUserById(userId);
            response.json({
                message: "User retrieved successfully",
                user: user.toPublicObject()
            });
        } catch (err: any) {
            next(err);
        }
    }

    public async updateUser(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = request.params.userId;
            const updatedUser = await userService.updateUser(userId, request.body);
            response.json({
                message: "User updated successfully",
                user: updatedUser.toPublicObject()
            });
        } catch (err: any) {
            next(err);
        }
    }

    public async deleteUser(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = request.params.userId;
            await userService.deleteUser(userId);
            response.status(StatusCode.NoContent).json({ message: "User deleted successfully" });
        } catch (err: any) {
            next(err);
        }
    }

}

export const userController = new UserController();
