// services/apiService.js
import apiClient from './axiosConfig';

class ApiService {
    // Métodos de autenticación
    async login(email, password) {
        try {
            const params = new URLSearchParams();
            params.append('username', email);  // 👈 debe ser 'username'
            params.append('password', password);

            const response = await apiClient.post('/auth/login', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.detail || error.message || 'Error en el login'
            };
        }
    }

    async verifyToken() {
        try {
            const response = await apiClient.get('/auth/verify');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.detail || error.message
            };
        }
    }

    async refreshToken(refreshToken) {
        try {
            const response = await apiClient.post('/auth/refresh', {
                refresh_token: refreshToken
            });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.detail || error.message
            };
        }
    }

    async logout() {
        try {
            await apiClient.post('/auth/logout');
        } catch (error) {
            // Continuar con logout local incluso si falla el endpoint
            console.warn('Error en logout del servidor:', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');
        }
    }

    // Métodos para el chatbot
    async sendMessage(message, conversationId = null) {
        try {
            const response = await apiClient.post('/chat/message', {
                message,
                conversation_id: conversationId
            });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.detail || error.message
            };
        }
    }

    async getChatHistory(conversationId = null) {
        try {
            const params = conversationId ? { conversation_id: conversationId } : {};
            const response = await apiClient.get('/chat/history', { params });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.detail || error.message
            };
        }
    }

    async createConversation(title = null) {
        try {
            const response = await apiClient.post('/chat/conversations', {
                title
            });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.detail || error.message
            };
        }
    }

    async getConversations() {
        try {
            const response = await apiClient.get('/chat/conversations');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.detail || error.message
            };
        }
    }

    async deleteConversation(conversationId) {
        try {
            const response = await apiClient.delete(`/chat/conversations/${conversationId}`);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.detail || error.message
            };
        }
    }

    // Métodos de usuario
    async getProfile() {
        try {
            const response = await apiClient.get('/users/profile');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.detail || error.message
            };
        }
    }

    async updateProfile(profileData) {
        try {
            const response = await apiClient.put('/users/profile', profileData);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.detail || error.message
            };
        }
    }

    async changePassword(currentPassword, newPassword) {
        try {
            const response = await apiClient.post('/users/change-password', {
                current_password: currentPassword,
                new_password: newPassword
            });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.detail || error.message
            };
        }
    }

    // Método genérico para requests personalizadas
    async customRequest(method, endpoint, data = null, config = {}) {
        try {
            const response = await apiClient({
                method,
                url: endpoint,
                data,
                ...config
            });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.detail || error.message
            };
        }
    }

    // Método para upload de archivos
    async uploadFile(file, endpoint = '/upload') {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await apiClient.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.detail || error.message
            };
        }
    }

    // Método para descargar archivos
    async downloadFile(url, filename) {
        try {
            const response = await apiClient.get(url, {
                responseType: 'blob',
            });

            // Crear URL del blob y descargar
            const blob = new Blob([response.data]);
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(downloadUrl);

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.detail || error.message
            };
        }
    }
}

export default new ApiService();