import axiosInstance from './axios';

export const authService = {
  async login(email, password) {
    try {
      const response = await axiosInstance.post('/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Login failed';
    }
  },

  async register(userData) {
    try {
      const response = await axiosInstance.post('/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Registration failed';
    }
  },

  logout() {
    localStorage.removeItem('token');
  }
};
