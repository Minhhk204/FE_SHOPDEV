import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000', // Thay đổi baseURL cho phù hợp với backend Express
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Interceptor: tự động gắn token vào header nếu có
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor: xử lý response và lỗi
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Nếu lỗi 401 (Unauthorized), xóa token và redirect về login
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            // Có thể dispatch logout action ở đây nếu cần
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosClient;