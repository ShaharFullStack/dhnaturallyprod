import { Request, Response, NextFunction } from "express";
import { cyber } from "../2-utils/cyber";
import { userService } from "../4-services/user-service";
import { UnauthorizedError, ForbiddenError } from "../3-models/error-models";
import { RoleModel } from "../3-models/role-model";
import { UserModel } from "../3-models/user-model";

// Extend Express Request to include user
declare global {
    namespace Express {
        interface Request {
            user?: UserModel;
        }
    }
}

class AuthMiddleware {

    // Verify JWT token and add user to request
    public verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw new UnauthorizedError("Access denied. No token provided.");
            }

            const token = authHeader.split(" ")[1]; // Bearer TOKEN
            if (!token) {
                throw new UnauthorizedError("Access denied. Invalid token format.");
            }

            // Validate token format and expiration
            if (!cyber.validateToken(token)) {
                throw new UnauthorizedError("Access denied. Invalid or expired token.");
            }

            // Validate session in database
            const user = await userService.validateSession(token);
            if (!user) {
                throw new UnauthorizedError("Access denied. Session not found or expired.");
            }

            // Add user to request object
            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    };

    // Optional token verification (for endpoints that work with or without authentication)
    public optionalAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const authHeader = req.headers.authorization;
            if (authHeader) {
                const token = authHeader.split(" ")[1];
                if (token && cyber.validateToken(token)) {
                    const user = await userService.validateSession(token);
                    if (user) {
                        req.user = user;
                    }
                }
            }
            next();
        } catch (error) {
            // For optional auth, we don't throw errors, just continue without user
            next();
        }
    };

    // Verify user has admin role
    public verifyAdmin = (req: Request, res: Response, next: NextFunction): void => {
        try {
            if (!req.user) {
                throw new UnauthorizedError("Access denied. Authentication required.");
            }

            if (req.user.roleId !== RoleModel.Admin) {
                throw new ForbiddenError("Access denied. Admin privileges required.");
            }

            next();
        } catch (error) {
            next(error);
        }
    };

    // Verify user has admin or developer role
    public verifyAdminOrDev = (req: Request, res: Response, next: NextFunction): void => {
        try {
            if (!req.user) {
                throw new UnauthorizedError("Access denied. Authentication required.");
            }

            if (req.user.roleId !== RoleModel.Admin && req.user.roleId !== RoleModel.Developer) {
                throw new ForbiddenError("Access denied. Admin or Developer privileges required.");
            }

            next();
        } catch (error) {
            next(error);
        }
    };

    // Verify user owns resource or has admin privileges
    public verifyOwnerOrAdmin = (req: Request, res: Response, next: NextFunction): void => {
        try {
            if (!req.user) {
                throw new UnauthorizedError("Access denied. Authentication required.");
            }

            const resourceUserId = req.params.userId || req.params.id;
            const isOwner = req.user.id === resourceUserId;
            const isAdmin = req.user.roleId === RoleModel.Admin;

            if (!isOwner && !isAdmin) {
                throw new ForbiddenError("Access denied. You can only access your own resources.");
            }

            next();
        } catch (error) {
            next(error);
        }
    };

    // Verify account is active
    public verifyActiveAccount = (req: Request, res: Response, next: NextFunction): void => {
        try {
            if (!req.user) {
                throw new UnauthorizedError("Access denied. Authentication required.");
            }

            if (!req.user.isActive) {
                throw new ForbiddenError("Access denied. Account is deactivated.");
            }

            next();
        } catch (error) {
            next(error);
        }
    };

    // Rate limiting by user (can be enhanced with Redis)
    private userRequestCounts = new Map<string, { count: number, resetTime: number }>();

    public rateLimitByUser = (maxRequests: number = 100, windowMinutes: number = 15) => {
        return (req: Request, res: Response, next: NextFunction): void => {
            try {
                const userId = req.user?.id || req.ip;
                const now = Date.now();
                const windowMs = windowMinutes * 60 * 1000;

                let userRequests = this.userRequestCounts.get(userId);

                if (!userRequests || now > userRequests.resetTime) {
                    userRequests = { count: 1, resetTime: now + windowMs };
                    this.userRequestCounts.set(userId, userRequests);
                } else {
                    userRequests.count++;
                }

                if (userRequests.count > maxRequests) {
                    res.status(429).json({
                        error: "Too many requests",
                        message: `Rate limit exceeded. Try again in ${Math.ceil((userRequests.resetTime - now) / 1000 / 60)} minutes.`
                    });
                    return;
                }

                // Set rate limit headers
                res.set({
                    'X-RateLimit-Limit': maxRequests.toString(),
                    'X-RateLimit-Remaining': (maxRequests - userRequests.count).toString(),
                    'X-RateLimit-Reset': new Date(userRequests.resetTime).toISOString()
                });

                next();
            } catch (error) {
                next(error);
            }
        };
    };

    // Clean up expired rate limit entries (should be called periodically)
    public cleanupRateLimit = (): void => {
        const now = Date.now();
        for (const [userId, data] of this.userRequestCounts.entries()) {
            if (now > data.resetTime) {
                this.userRequestCounts.delete(userId);
            }
        }
    };
}

export const authMiddleware = new AuthMiddleware();

// Clean up rate limit data every hour
setInterval(() => {
    authMiddleware.cleanupRateLimit();
}, 60 * 60 * 1000);