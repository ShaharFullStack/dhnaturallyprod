import axios, { AxiosRequestConfig } from "axios";
import { appConfig } from "../Utils/AppConfig";
import { ArticleModel } from "../Models/ArticleModel";

class ArticleService {
    private getAuthHeader(): { Authorization: string } | {} {
        const token = localStorage.getItem("token");
        if (!token) return {};
        return { Authorization: `Bearer ${token}` };
    }

    public async getAllArticles(): Promise<ArticleModel[]> {
        const response = await axios.get<ArticleModel[]>(appConfig.articlesUrl, {
            headers: this.getAuthHeader(),
        });
        return response.data;
    }

    public async getArticleById(id: string): Promise<ArticleModel> {
        const response = await axios.get<ArticleModel>(`${appConfig.articlesUrl}/${id}`, {
            headers: this.getAuthHeader(),
        });
        return response.data;
    }

    public async addArticle(article: ArticleModel, imageFile?: File): Promise<ArticleModel> {
        const formData = new FormData();
        if (article.title_en) formData.append("title_en", article.title_en);
    if (article.subtitle_en) formData.append("subtitle_en", article.subtitle_en);
        if (article.title_he) formData.append("title_he", article.title_he);
    if (article.subtitle_he) formData.append("subtitle_he", article.subtitle_he);
        if (article.content_en) formData.append("content_en", article.content_en);
        if (article.content_he) formData.append("content_he", article.content_he);
        if (article.created_at) formData.append("created_at", article.created_at);
        formData.append("is_published", (article.is_published ?? false).toString());
        if (imageFile) formData.append("image", imageFile);

        const options: AxiosRequestConfig = {
            headers: {
                ...this.getAuthHeader(),
                "Content-Type": "multipart/form-data",
            },
        };
        const response = await axios.post<ArticleModel>(appConfig.articlesUrl, formData, options);
        return response.data;
    }

    public async updateArticle(article: ArticleModel, imageFile?: File): Promise<ArticleModel> {
        const formData = new FormData();
        if (article.title_en) formData.append("title_en", article.title_en);
    if (article.subtitle_en) formData.append("subtitle_en", article.subtitle_en);
        if (article.title_he) formData.append("title_he", article.title_he);
    if (article.subtitle_he) formData.append("subtitle_he", article.subtitle_he);
        if (article.content_en) formData.append("content_en", article.content_en);
        if (article.content_he) formData.append("content_he", article.content_he);
        formData.append("is_published", (article.is_published ?? false).toString());
        if (imageFile) formData.append("image", imageFile);

        const options: AxiosRequestConfig = {
            headers: {
                ...this.getAuthHeader(),
                "Content-Type": "multipart/form-data",
            },
        };
        const response = await axios.put<ArticleModel>(`${appConfig.articlesUrl}/${article.id}`, formData, options);
        return response.data;
    }

    public async deleteArticle(id: string): Promise<void> {
        await axios.delete(`${appConfig.articlesUrl}/${id}`, { headers: this.getAuthHeader() });
    }
}

export const articleService = new ArticleService();
