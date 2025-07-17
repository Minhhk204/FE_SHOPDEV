import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://your-api-endpoint.com', // Thay đổi baseURL cho phù hợp
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Optional: Interceptors (nếu muốn xử lý token, lỗi...)
// axiosClient.interceptors.request.use(...)
// axiosClient.interceptors.response.use(...)

export default axiosClient; 