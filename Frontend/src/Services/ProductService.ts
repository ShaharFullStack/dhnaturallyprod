import axios, { AxiosRequestConfig } from "axios";
import { appConfig } from "../Utils/AppConfig";
import { store } from "../Redux/Store";
import { productActions } from "../Redux/ProductSlice";
import { ProductModel } from "../Models/ProductModel";

class ProductService {
    private getAuthHeader(): { Authorization: string } | {} {
        const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
        if (!token) return {};
        return { Authorization: `Bearer ${token}` };
    }
    public async getAllProducts(): Promise<ProductModel[]> {
    const state = store.getState() as any;
    if (state.products && state.products.length > 0) return state.products;

        const response = await axios.get<ProductModel[]>(appConfig.productsUrl, {
            headers: this.getAuthHeader(),
        });

        const products = response.data;
        const action = productActions.initProducts(products);
        store.dispatch(action);
        return products;
    }

    public async getProductById(id: string): Promise<ProductModel | undefined> {
    const globalProduct = (store.getState() as any).products?.find((product: any) => product.id === id);
        if (globalProduct) return globalProduct;

        const response = await axios.get<ProductModel>(`${appConfig.productsUrl}/${id}`, {
            headers: this.getAuthHeader(),
        });

        return response.data;
    }

    public async getFilteredProducts(filter: string): Promise<ProductModel[]> {
        const response = await axios.get<ProductModel[]>(`${appConfig.productsUrl}?filter=${filter}`, {
            headers: this.getAuthHeader(),
        });
        return response.data;
    }

    public async addProduct(product: ProductModel, imageFile?: File): Promise<void> {
        const formData = new FormData();
        if (product.name_en) formData.append("name_en", product.name_en);
        if (product.name_he) formData.append("name_he", product.name_he);
        if (product.description_en) formData.append("description_en", product.description_en);
        if (product.description_he) formData.append("description_he", product.description_he);
        formData.append("price", (product.price ?? 0).toString());
        if (product.category) formData.append("category", product.category);
        if (imageFile) {
            formData.append("image", imageFile);
        }
        const options: AxiosRequestConfig = {
            headers: {
                ...this.getAuthHeader(),
                "Content-Type": "multipart/form-data",
            },
        };
    await axios.post(appConfig.productsUrl, formData, options);
    const clearAction = productActions.clearProducts();
    store.dispatch(clearAction);
    await this.getAllProducts();
    }

    public async updateProduct(product: ProductModel, imageFile?: File): Promise<ProductModel> {
        const formData = new FormData();
        if (product.name_he) formData.append("name_he", product.name_he);
        if (product.name_en) formData.append("name_en", product.name_en);
        if (product.description_en) formData.append("description_en", product.description_en);
        if (product.description_he) formData.append("description_he", product.description_he);
        formData.append("price", (product.price ?? 0).toString());
        if (product.category) formData.append("category", product.category);
        if (imageFile) {
            formData.append("image", imageFile);
        }

        const options: AxiosRequestConfig = {
            headers: {
                ...this.getAuthHeader(),
                "Content-Type": "multipart/form-data",
            },
        };
        const response = await axios.put(`${appConfig.productsUrl}/${product.id}`, formData, options);
        return response.data;
    }

    public async deleteProduct(productId: string): Promise<void> {
        const options: AxiosRequestConfig = {
            headers: this.getAuthHeader(),
        };
        await axios.delete(`${appConfig.productsUrl}/${productId}`, options);

        const action = productActions.deleteProduct(productId);
        store.dispatch(action);
    }

    public async searchProducts(searchValue: string): Promise<{ products: ProductModel[] }> {
        const response = await axios.get<ProductModel[]>(
            `${appConfig.productsUrl}?search=${encodeURIComponent(searchValue)}`,
            {
                headers: this.getAuthHeader(),
            });
        return { products: response.data };
    }

    public async getProductByIdUser(id: string): Promise<ProductModel[]> {
        const response = await axios.get<ProductModel[]>(`${appConfig.productsUrl}/${id}`, {
            headers: this.getAuthHeader(),
        });
        return response.data;
    }
}
export const productService = new ProductService();