import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/content`;

// Helper function to get auth token
const getAuthToken = () => {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
};

// Helper function to create auth header
const authHeader = () => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const contentService = {
    // Public routes
    listContents: async (Page = 1, PageSize = 10) => {
        try {
            const response = await axios.get(API_URL, {
                params: { Page,  PageSize }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getContentById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getContentByType: async (type) => {
        try {
            const response = await axios.get(`${API_URL}/type/${type}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    searchByTitle: async (query) => {
        try {
            const response = await axios.get(`${API_URL}/search`, {
                params: { title: query }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Protected routes (require authentication and admin role)
    createContent: async (contentData) => {
        try {
            const response = await axios.post(API_URL, contentData, {
                headers: authHeader()
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateContent: async (id, contentData) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, contentData, {
                headers: authHeader()
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteContent: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`, {
                headers: authHeader()
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default contentService;