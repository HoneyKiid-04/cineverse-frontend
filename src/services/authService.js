import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      if (response.data) {
        localStorage.setItem('token', JSON.stringify(response.data.data.token));
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        console.log(response.data.data.user);
        
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (username, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password
      });
      if (response.data) {
        localStorage.setItem('token', JSON.stringify(response.data.data.token));
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
  }
};

export default authService;