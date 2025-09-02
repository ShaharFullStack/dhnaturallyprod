import express, { NextFunction, Request, Response } from "express";
import { ArticleModel } from "../3-models/article-model";
import { articleService } from "../4-services/article-service";
import { StatusCode } from "../3-models/enums";

class ArticleController {
    public readonly router = express.Router();

    public constructor() {
        this.router.get("/dhnaturally/articles", this.getAllArticles);
        this.router.get("/dhnaturally/articles/:id", this.getArticleById);
        this.router.post("/dhnaturally/articles", this.addArticle);
        this.router.put("/dhnaturally/articles/:id", this.updateArticle);
        this.router.delete("/dhnaturally/articles/:id", this.deleteArticle);
    }

    private getAllArticles = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const articles = await articleService.getAllArticles();
            res.json(articles);
        } catch (error) {
            next(error);
        }
    }

    private getArticleById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const article = await articleService.getArticleById(req.params.id);
            res.json(article);
        } catch (error) {
            next(error);
        }
    }

    private addArticle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const article = new ArticleModel(req.body);
            const added = await articleService.addArticle(article);
            res.status(StatusCode.Created).json(added);
        } catch (error) {
            next(error);
        }
    }

    private updateArticle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const article = new ArticleModel(req.body);
            article.id = req.params.id;
            const updated = await articleService.updateArticle(article);
            res.json(updated);
        } catch (error) {
            next(error);
        }
    }

    private deleteArticle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await articleService.deleteArticle(req.params.id);
            res.sendStatus(StatusCode.NoContent);
        } catch (error) {
            next(error);
        }
    }
}

export const articleController = new ArticleController();
