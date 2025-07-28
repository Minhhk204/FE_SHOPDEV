import axiosClient from './axiosClient';
import { Product, ProductAttributes } from '../types';

const productApi = {
    getAll: async (): Promise<Product[]> => {
        const res = await axiosClient.get<Product[]>('/products');
        return res.data;
    },
    getById: async (id: number): Promise<Product> => {
        const res = await axiosClient.get<Product>(`/products/${id}`);
        return res.data;
    },
    create: async (product: Partial<ProductAttributes>): Promise<Product> => {
        const res = await axiosClient.post<Product>('/products', product);
        return res.data;
    },
    update: async (id: number, product: Partial<ProductAttributes>): Promise<Product> => {
        const res = await axiosClient.put<Product>(`/products/${id}`, product);
        return res.data;
    },
    delete: async (id: number): Promise<void> => {
        await axiosClient.delete(`/products/${id}`);
    },
    // Thêm API cho admin
    getActiveProducts: async (): Promise<Product[]> => {
        const res = await axiosClient.get<Product[]>('/products?isActive=true');
        return res.data;
    },
    toggleActive: async (id: number): Promise<Product> => {
        const res = await axiosClient.patch<Product>(`/products/${id}/toggle-active`);
        return res.data;
    },
};

export default productApi; 