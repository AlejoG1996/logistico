// hooks/useApi.js
import { useState, useCallback } from 'react';
import apiService from '../services/apiService';

const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const callApi = useCallback(async (apiMethod, ...args) => {
        setLoading(true);
        setError(null);
        
        try {
            const result = await apiMethod(...args);
            
            if (result.success) {
                return { success: true, data: result.data };
            } else {
                setError(result.error);
                return { success: false, error: result.error };
            }
        } catch (err) {
            const errorMessage = err.message || 'Error inesperado';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        loading,
        error,
        callApi,
        clearError,
        // Métodos específicos del API
        sendMessage: useCallback((message, conversationId) => 
            callApi(apiService.sendMessage, message, conversationId), [callApi]),
        getChatHistory: useCallback((conversationId) => 
            callApi(apiService.getChatHistory, conversationId), [callApi]),
        getProfile: useCallback(() => 
            callApi(apiService.getProfile), [callApi]),
        updateProfile: useCallback((profileData) => 
            callApi(apiService.updateProfile, profileData), [callApi]),
    };
};

export default useApi;