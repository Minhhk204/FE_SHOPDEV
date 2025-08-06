import axiosClient from './axiosClient';
import { ProductSizeAttributes } from '../types';
import { showErrorToast } from '../utils/toast';

const productSizeApi = {
    create: async (data: { productId: number; size: number; stock: number }): Promise<ProductSizeAttributes> => {
        try {
            const res = await axiosClient.post<ProductSizeAttributes>('/api/product-size/admin/create', data);
            return res.data;
        } catch (error: any) {
            const message = error.response?.data?.message || 'Có lỗi xảy ra khi thêm size';
            showErrorToast(message);
        }
    },

    update: async (id: number, data: { size: number; stock: number }): Promise<ProductSizeAttributes> => {
        try {
            const res = await axiosClient.put<ProductSizeAttributes>(`/api/product-size/admin/update/${id}`, data);
            return res.data;
        } catch (error: any) {
            const message = error.response?.data?.message || 'Có lỗi xảy ra';
            showErrorToast(message);
        }
    },

    delete: async (id: number): Promise<void> => {
        try {
            await axiosClient.delete(`/api/product-size/admin/delete/${id}`);
        } catch (error: any) {
            const message = error.response?.data?.message || 'Có lỗi xảy ra';
            showErrorToast(message);
        }
    }
};

export default productSizeApi;