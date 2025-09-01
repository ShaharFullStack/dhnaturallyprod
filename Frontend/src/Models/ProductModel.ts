export class ProductModel {
    public id: string;
    public name_en: string;
    public name_he: string;
    public description_en: string;
    public description_he: string;
    public price: number;
    public imageUrl?: string;
    public image?: File;
    public category?: string;

    constructor(data?: Partial<ProductModel>) {
        this.id = data?.id ?? '';
        this.name_en = data?.name_en ?? '';
        this.name_he = data?.name_he ?? '';
        this.description_en = data?.description_en ?? '';
        this.description_he = data?.description_he ?? '';
        this.price = data?.price ?? 0;
        this.imageUrl = data?.imageUrl;
        this.image = data?.image;
        this.category = data?.category;
    }
}