import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/profile';

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

const userService = {
    // Get user profile
    getProfile: async () => {
        try {
            const response = await axios.get(API_URL, {
                headers: authHeader()
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update user profile
    updateProfile: async (profileData) => {        
        try {
            const response = await axios.put(API_URL, JSON.stringify(profileData), {
                headers: {
                    ...authHeader(),
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Change password
    changePassword: async (passwordData) => {
        try {
            const response = await axios.put(`${API_URL}/password`, JSON.stringify(passwordData), {
                headers: {
                    ...authHeader(),
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete user profile
    deleteProfile: async () => {
        try {
            const response = await axios.delete(API_URL, {
                headers: authHeader()
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default userService;