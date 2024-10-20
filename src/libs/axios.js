import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, 
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('@greenhubONG:token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const setupAxiosInterceptors = (logout) => {
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                logout(); 
                localStorage.removeItem('@greenhubONG:token'); 
            }
            return Promise.reject(error);
        }
    );
};
