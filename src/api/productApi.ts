import axiosClient from './axiosClient';
import { Product } from '../types';

const productApi = {
    getAll: async (): Promise<Product[]> => {
        const res = await axiosClient.get<Product[]>('/products');
        return res.data;
    },
    getById: async (id: string): Promise<Product> => {
        const res = await axiosClient.get<Product>(`/products/${id}`);
        return res.data;
    },
    create: async (product: Partial<Product>): Promise<Product> => {
        const res = await axiosClient.post<Product>('/products', product);
        return res.data;
    },
    update: async (id: string, product: Partial<Product>): Promise<Product> => {
        const res = await axiosClient.put<Product>(`/products/${id}`, product);
        return res.data;
    },
    delete: async (id: string): Promise<void> => {
        await axiosClient.delete(`/products/${id}`);
    },
};

export default productApi; 