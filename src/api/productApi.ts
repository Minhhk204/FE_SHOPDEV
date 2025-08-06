import axiosClient from './axiosClient';
import { Product, ProductAttributes, ProductSizeAttributes } from '../types';
import { ProductSize } from '../types';

const productApi = {
    getAll: async (): Promise<Product[]> => {
        const res = await axiosClient.get<Product[]>('/api/product/list');
        return res.data.products;
    },
    getActiveProducts: async (): Promise<Product[]> => {
        const res = await axiosClient.get<Product[]>('/api/product/list?isActive=true');
        return res.data.products;
    },
    getById: async (id: number): Promise<Product> => {
        const res = await axiosClient.get<Product>(`/api/product/details/${id}`);
        return res.data;
    },
    create: async (product: Partial<ProductAttributes>): Promise<Product> => {
        const res = await axiosClient.post<Product>('/api/product/admin/create-product', product);
        return res.data;
    },
    update: async (id: number, product: Partial<ProductAttributes>): Promise<Product> => {
        const res = await axiosClient.put<Product>(`/api/product/admin/update-product/${id}`, product);
        return res.data;
    },
    delete: async (id: number): Promise<void> => {
        await axiosClient.delete(`/api/product/admin/delete-product/${id}`);
    },
	createProductSize: async (productSize: Partial<ProductSizeAttributes>): Promise<Product> => {
        const res = await axiosClient.post<Product>('/api/product-size/admin/create', productSize);
        return res.data;
    },		
	updateProductSize: async (id: number, productSize: Partial<ProductSizeAttributes>): Promise<Product> => {
        const res = await axiosClient.put<Product>(`/api/product-size/admin/update/${id}`, productSize);
        return res.data;
    },
    deleteProductSize: async (id: number): Promise<void> => {
        await axiosClient.delete(`/api/product-size/admin/delete/${id}`);
    },
    // Thêm API cho admin
	// Dùng update để chuyển trạng thái (active) cho product thì sử dụng hàm update bên trên
    toggleActive: async (id: number): Promise<Product> => {
        const res = await axiosClient.patch<Product>(`/api/products/${id}/toggle-active`);
        return res.data;
    },
};

export default productApi; 