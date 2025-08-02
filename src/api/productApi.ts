import axiosClient from './axiosClient';
import { Product, ProductAttributes } from '../types';

const productApi = {
    getAll: async (): Promise<Product[]> => {
        const res = await axiosClient.get<{ products: Product[] }>('/api/products');
        return res.data.products;
    },
    getActiveProducts: async (): Promise<Product[]> => {
        const res = await axiosClient.get<Product[]>('/api/products?isActive=true');
        return res.data;
    },
    getById: async (id: number): Promise<Product> => {
        const res = await axiosClient.get<Product>(`/api/products/${id}`);
        return res.data;
    },
    create: async (product: Partial<ProductAttributes>): Promise<Product> => {
        const res = await axiosClient.post<Product>('/api/products', product);
        return res.data;
    },
    update: async (id: number, product: Partial<ProductAttributes>): Promise<Product> => {
        const res = await axiosClient.put<Product>(`/api/products/${id}`, product);
        return res.data;
    },
    delete: async (id: number): Promise<void> => {
        await axiosClient.delete(`/api/products/${id}`);
    },
    // Thêm API cho admin
    toggleActive: async (id: number): Promise<Product> => {
        const res = await axiosClient.patch<Product>(`/api/products/${id}/toggle-active`);
        return res.data;
    },
};

export default productApi; 