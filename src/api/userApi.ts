import axiosClient from './axiosClient';
import { User, UserCreationAttributes } from '../types';

const userApi = {
    // Auth APIs
    login: async (payload: { email: string; password: string }) => {
        const res = await axiosClient.post('/api/auth/login', payload);
        return res.data;
    },
    register: async (payload: UserCreationAttributes) => {
        const res = await axiosClient.post('/api/auth/register', payload);
        return res.data;
    },
    getCurrentUser: async () => {
        const res = await axiosClient.get('/api/auth/profile');
        return res.data;
    },
    updateProfile: async (userData: Partial<UserCreationAttributes>) => {
        const res = await axiosClient.put('/api/auth/profile/update', userData);
        return res.data;
    },
    changePassword: async (payload: { currentPassword: string; newPassword: string }) => {
        const res = await axiosClient.put('/api/auth/change-password', payload);
        return res.data;
    },

    // User management APIs (for admin) - nếu có
    getAllUsers: async (): Promise<User[]> => {
        const res = await axiosClient.get<User[]>('/api/users');
        return res.data;
    },
    getUserById: async (id: number): Promise<User> => {
        const res = await axiosClient.get<User>(`/api/users/${id}`);
        return res.data;
    },
    updateUser: async (id: number, userData: Partial<UserCreationAttributes>): Promise<User> => {
        const res = await axiosClient.put<User>(`/api/users/${id}`, userData);
        return res.data;
    },
    deleteUser: async (id: number): Promise<void> => {
        await axiosClient.delete(`/api/users/${id}`);
    },
    toggleUserActive: async (id: number): Promise<User> => {
        const res = await axiosClient.patch<User>(`/api/users/${id}/toggle-active`);
        return res.data;
    },
    changeUserRole: async (id: number, role: "user" | "admin"): Promise<User> => {
        const res = await axiosClient.patch<User>(`/api/users/${id}/role`, { role });
        return res.data;
    },
};

export default userApi; 