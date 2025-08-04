import axiosClient from './axiosClient';
import { CartItem, CartItemAttributies } from '../types/index';

const cartApi = {
    getAll: async (): Promise<CartItem[]> => {
        const res = await axiosClient.get<CartItem[]>('/api/cart/get-cart');
        return res.data.listCartItem;
    },
    create: async (cartItem: Partial<CartItemAttributies>): Promise<CartItem> => {
        const res = await axiosClient.post<CartItem>('/api/cart-items/add', cartItem);
        return res.data;
    },
    update: async (id: number, cartItem: Partial<CartItemAttributies>): Promise<CartItem> => {
        const res = await axiosClient.put<CartItem>(`/api/product/admin/update-product/${id}`, cartItem);
        return res.data;
    },
    delete: async (id: number): Promise<void> => {
        await axiosClient.delete(`/api/product/admin/delete-product/${id}`);
    },
    
};

export default cartApi; 