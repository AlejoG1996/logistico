// services/axiosConfig.js
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

// Crear instancia de axios con configuración base
const apiClient = axios.create({
    baseURL: apiUrl,
    timeout: 10000, // 10 segundos
    headers: {
        'Content-Type': 'application/json',
    },
});

// Variable para controlar si estamos renovando el token
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    
    failedQueue = [];
};

// Interceptor para requests - agregar token automáticamente
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para responses - manejar refresh token automáticamente
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // ✅ CRITICAL: No aplicar refresh token para requests de login
        if (originalRequest.url?.includes('/auth/login') || originalRequest.url?.includes('/auth/refresh')) {
            return Promise.reject(error);
        }

        // Si el error es 401 y no hemos intentado renovar el token
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Si ya estamos renovando el token, agregar a la cola
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return apiClient(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refresh_token');
            
            if (!refreshToken) {
                // No hay refresh token, redirigir al login
                localStorage.removeItem('token');
                localStorage.removeItem('refresh_token');
                return Promise.reject(error);
            }

            try {
                // ✅ FIXED: Usar la variable de entorno correcta de Vite
                const response = await axios.post(`${apiUrl}/auth/refresh`, {
                    refresh_token: refreshToken
                });

                const { access_token, refresh_token: newRefreshToken } = response.data;
                
                localStorage.setItem('token', access_token);
                if (newRefreshToken) {
                    localStorage.setItem('refresh_token', newRefreshToken);
                }

                // Procesar cola de requests fallidas
                processQueue(null, access_token);

                // Reintentar request original
                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return apiClient(originalRequest);

            } catch (refreshError) {
                // Error al renovar token, limpiar y redirigir
                processQueue(refreshError, null);
                localStorage.removeItem('token');
                localStorage.removeItem('refresh_token');
                // Opcional: redirigir automáticamente
                // window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;