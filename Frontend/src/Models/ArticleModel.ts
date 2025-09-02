export class ArticleModel {
    public id: string;
    public title_en: string;
    public subtitle_en?: string;
    public title_he: string;
    public subtitle_he?: string;
    public content_en: string;
    public content_he: string;
    public created_at: string;
    public imageUrl?: string;
    public slug?: string;
    public excerpt?: string;
    public readTime?: number;
    public category?: string;
    public featured?: boolean;
    public publishedDate?: string;
    public image?: File;
    public is_published?: boolean;

    constructor(data?: Partial<ArticleModel>) {
        this.id = data?.id ?? '';
        this.title_en = data?.title_en ?? '';
        this.subtitle_en = data?.subtitle_en ?? '';
        this.title_he = data?.title_he ?? '';
        this.subtitle_he = data?.subtitle_he ?? '';
        this.content_en = data?.content_en ?? '';
        this.content_he = data?.content_he ?? '';
        this.created_at = data?.created_at ?? new Date().toISOString();
        this.imageUrl = data?.imageUrl;
        this.image = data?.image;
        this.is_published = data?.is_published ?? false;
    }
}
