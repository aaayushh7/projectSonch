// src/api/blogService.js
import axios from 'axios';

const API_URL = 'https://api-sonch.vercel.app/api';

// Add token to requests if it exists
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const blogService = {
  // Auth
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  // Blog operations
  getAllBlogs: async () => {
    const response = await axios.get(`${API_URL}/blogs`);
    return response.data;
  },

  getBlogById: async (id) => {
    const response = await axios.get(`${API_URL}/blogs/${id}`);
    return response.data;
  },

  createBlog: async (blogData) => {
    const response = await axios.post(`${API_URL}/blogs`, blogData);
    return response.data;
  },

  updateBlog: async (id, blogData) => {
    const response = await axios.put(`${API_URL}/blogs/${id}`, blogData);
    return response.data;
  },

  deleteBlog: async (id) => {
    const response = await axios.delete(`${API_URL}/blogs/${id}`);
    return response.data;
  }
};

export default blogService;