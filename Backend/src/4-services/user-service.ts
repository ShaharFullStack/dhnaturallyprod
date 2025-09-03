import { v4 as uuidv4 } from "uuid";
import { cyber } from "../2-utils/cyber";
import { dal } from "../2-utils/dal";
import { CredentialsModel } from "../3-models/credentials-model";
import { BadRequestError, ForbiddenError, UnauthorizedError, NotFoundError } from "../3-models/error-models";
import { RoleModel } from "../3-models/role-model";
import { UserModel } from "../3-models/user-model";
import { SessionModel } from "../3-models/session-model";
import crypto from "crypto";

class UserService {

    public async register(user: UserModel): Promise<{ token: string, user: Partial<UserModel> }> {
        // Check if email already exists
        const sqlCheck = "SELECT COUNT(*) as count FROM users WHERE email = ? AND isActive = 1";
        const emailExists = await dal.execute(sqlCheck, [user.email]);
        if (emailExists[0].count > 0) {
            throw new BadRequestError("Email already exists.");
        }

        // Set defaults
        user.id = uuidv4();
        user.roleId = user.roleId || RoleModel.User;
        user.isActive = true;
        user.emailVerified = false;
        
        // Hash password
        user.password = cyber.hash(user.password);
        
        // Validate user data
        // Debug: log the user object being validated to diagnose unexpected fields
        try {
            console.log("Validating user keys:", Object.keys(user as any));
            console.log("Validating user object:", JSON.stringify(user, (_k, v) => (typeof v === 'function' ? undefined : v)));
        }
        catch (err) {
            console.log("Error stringifying user for debug:", err);
        }
        user.validateInsert();

        // Insert user into database
        const sql = `
            INSERT INTO users (id, firstName, lastName, email, password, roleId, isActive, emailVerified) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            user.id,
            user.firstName,
            user.lastName,
            user.email,
            user.password,
            user.roleId,
            user.isActive,
            user.emailVerified
        ];
        await dal.execute(sql, values);

        // Generate token and create session
        const token = cyber.getNewToken(user);
        await this.createSession(user.id, token);

        return { 
            token, 
            user: user.toPublicObject() 
        };
    }

    public async login(credentials: CredentialsModel): Promise<{ token: string, user: Partial<UserModel> }> {
        console.log("=== LOGIN SERVICE START ===");
        console.log("Credentials received:", JSON.stringify(credentials, null, 2));
        
        // Validate credentials - only create UserModel with email and password
        const tempUser = new UserModel({ 
            email: credentials.email, 
            password: credentials.password 
        } as UserModel);
        console.log("Temp user created for validation:", JSON.stringify(tempUser, null, 2));
        tempUser.validateLogin();
        console.log("Login validation passed");
        
        const hashedPassword = cyber.hash(credentials.password);
        console.log("Password hashed");

        const sql = `
            SELECT id, firstName, lastName, email, roleId, isActive, emailVerified, lastLogin, created_at, updated_at 
            FROM users 
            WHERE email = ? AND password = ? AND isActive = 1
        `;
        console.log("Executing SQL query");
        const users = await dal.execute(sql, [credentials.email, hashedPassword]);
        console.log("SQL query result:", users);

        if (users.length === 0) {
            throw new ForbiddenError("Incorrect email or password.");
        }

        console.log("Creating user from DB result");
        const user = new UserModel(users[0]);
        console.log("User created from DB:", JSON.stringify(user, null, 2));
        
        // Update last login
        console.log("Updating last login");
        await this.updateLastLogin(user.id);

        // Generate token and create session
        console.log("Generating token");
        const token = cyber.getNewToken(user);
        console.log("Creating session");
        await this.createSession(user.id, token);
        console.log("=== LOGIN SERVICE END ===");

        return { 
            token, 
            user: user.toPublicObject() 
        };
    }

    public async deleteUser(userId: string): Promise<void> {
        // Soft delete - set isActive to false
        const sql = "UPDATE users SET isActive = 0 WHERE id = ?";
        const result = await dal.execute(sql, [userId]);
        
        if (result.affectedRows === 0) {
            throw new NotFoundError(`User with id ${userId} not found.`);
        }

        // Logout all sessions
        await this.logoutAllSessions(userId);
    }

    public async logout(userId: string, token: string): Promise<void> {
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        const sql = "DELETE FROM user_sessions WHERE user_id = ? AND token_hash = ?";
        await dal.execute(sql, [userId, tokenHash]);
    }

    public async logoutAllSessions(userId: string): Promise<void> {
        const sql = "DELETE FROM user_sessions WHERE user_id = ?";
        await dal.execute(sql, [userId]);
    }

    public async getUserById(userId: string): Promise<UserModel> {
        const sql = `
            SELECT id, firstName, lastName, email, roleId, isActive, emailVerified, lastLogin, created_at, updated_at 
            FROM users 
            WHERE id = ? AND isActive = 1
        `;
        const users = await dal.execute(sql, [userId]);

        if (users.length === 0) {
            throw new NotFoundError(`User with id ${userId} not found.`);
        }

        return new UserModel(users[0]);
    }

    public async updateUser(userId: string, userData: Partial<UserModel>): Promise<UserModel> {
        // Get existing user
        const existingUser = await this.getUserById(userId);
        
        // Update only provided fields
        const updatedUser = Object.assign(
            new UserModel(existingUser),
            userData,
            { id: userId, password: existingUser.password } // Ensure ID and password don't change
        );

        updatedUser.validateUpdate();

        const sql = `
            UPDATE users 
            SET firstName = ?, lastName = ?, email = ?, isActive = ?, emailVerified = ?
            WHERE id = ?
        `;
        const values = [
            updatedUser.firstName,
            updatedUser.lastName,
            updatedUser.email,
            updatedUser.isActive,
            updatedUser.emailVerified,
            userId
        ];

        await dal.execute(sql, values);
        return await this.getUserById(userId);
    }

    public async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
        // Verify old password
        const user = await this.getUserById(userId);
        const hashedOldPassword = cyber.hash(oldPassword);
        
        const sqlCheck = "SELECT COUNT(*) as count FROM users WHERE id = ? AND password = ?";
        const result = await dal.execute(sqlCheck, [userId, hashedOldPassword]);
        
        if (result[0].count === 0) {
            throw new BadRequestError("Current password is incorrect.");
        }

        // Update password
        const hashedNewPassword = cyber.hash(newPassword);
        const sql = "UPDATE users SET password = ? WHERE id = ?";
        await dal.execute(sql, [hashedNewPassword, userId]);

        // Logout all sessions except current one (optional security measure)
        // await this.logoutAllSessions(userId);
    }

    private async createSession(userId: string, token: string): Promise<void> {
        const sessionId = uuidv4();
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        const expiresAt = new Date(Date.now() + 3 * 60 * 60 * 1000); // 3 hours

        const session = new SessionModel({
            id: sessionId,
            user_id: userId,
            token_hash: tokenHash,
            expires_at: expiresAt
        } as SessionModel);

        session.validateInsert();

        const sql = `
            INSERT INTO user_sessions (id, user_id, token_hash, expires_at) 
            VALUES (?, ?, ?, ?)
        `;
        await dal.execute(sql, [session.id, session.user_id, session.token_hash, session.expires_at]);
    }

    private async updateLastLogin(userId: string): Promise<void> {
        const sql = "UPDATE users SET lastLogin = CURRENT_TIMESTAMP WHERE id = ?";
        await dal.execute(sql, [userId]);
    }

    public async cleanExpiredSessions(): Promise<void> {
        const sql = "DELETE FROM user_sessions WHERE expires_at < CURRENT_TIMESTAMP";
        await dal.execute(sql);
    }

    public async validateSession(token: string): Promise<UserModel | null> {
        if (!cyber.validateToken(token)) {
            return null;
        }

        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        const sql = `
            SELECT u.id, u.firstName, u.lastName, u.email, u.roleId, u.isActive, u.emailVerified, u.lastLogin, u.created_at, u.updated_at
            FROM user_sessions s
            JOIN users u ON s.user_id = u.id
            WHERE s.token_hash = ? AND s.expires_at > CURRENT_TIMESTAMP AND u.isActive = 1
        `;
        
        const results = await dal.execute(sql, [tokenHash]);
        
        if (results.length === 0) {
            return null;
        }

        // Update last_used timestamp
        const updateSql = "UPDATE user_sessions SET last_used = CURRENT_TIMESTAMP WHERE token_hash = ?";
        await dal.execute(updateSql, [tokenHash]);

        return new UserModel(results[0]);
    }

    public async saveContactForm(data: {
        name: string;
        email: string;
        phone?: string;
        subject?: string;
        message: string;
    }): Promise<void> {
        const contactId = uuidv4();
        const sql = `
            INSERT INTO contact_forms (id, name, email, phone, subject, message) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [contactId, data.name, data.email, data.phone || null, data.subject || null, data.message];
        await dal.execute(sql, values);
    }

    public async getAllUsers(page: number = 1, limit: number = 10): Promise<{ users: Partial<UserModel>[], total: number }> {
        const offset = (page - 1) * limit;
        
        const sql = `
            SELECT id, firstName, lastName, email, roleId, isActive, emailVerified, lastLogin, created_at, updated_at
            FROM users
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
        `;
        
        const countSql = "SELECT COUNT(*) as total FROM users";
        
        const [users, countResult] = await Promise.all([
            dal.execute(sql, [limit, offset]),
            dal.execute(countSql)
        ]);

        return {
            users: users.map((user: any) => new UserModel(user).toPublicObject()),
            total: countResult[0].total
        };
    }

}

export const userService = new UserService();
