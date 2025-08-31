import Joi from "joi";
import { BadRequestError } from "./error-models";

export class SessionModel {
    public id: string;
    public user_id: string;
    public token_hash: string;
    public expires_at: Date;
    public created_at?: Date;
    public last_used?: Date;
    public ip_address?: string;
    public user_agent?: string;

    public constructor(session: SessionModel) {
        this.id = session.id;
        this.user_id = session.user_id;
        this.token_hash = session.token_hash;
        this.expires_at = session.expires_at;
        this.created_at = session.created_at;
        this.last_used = session.last_used;
        this.ip_address = session.ip_address;
        this.user_agent = session.user_agent;
    }

    private static insertValidationSchema = Joi.object({
        id: Joi.string().uuid().required(),
        user_id: Joi.string().uuid().required(),
        token_hash: Joi.string().required().max(255),
        expires_at: Joi.date().required().min('now'),
        ip_address: Joi.string().ip().optional(),
        user_agent: Joi.string().max(1000).optional()
    });

    public validateInsert(): void {
        const result = SessionModel.insertValidationSchema.validate(this);
        if (result.error) {
            throw new BadRequestError(result.error.message);
        }
    }

    // Check if session is expired
    public isExpired(): boolean {
        return new Date() > this.expires_at;
    }

    // Check if session expires soon (within 30 minutes)
    public expiresSoon(): boolean {
        const thirtyMinutesFromNow = new Date(Date.now() + 30 * 60 * 1000);
        return this.expires_at <= thirtyMinutesFromNow;
    }
}