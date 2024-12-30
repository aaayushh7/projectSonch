import axios from 'axios';

const API_URL = 'https://api-sonch.vercel.app/api';

// Create an axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to the instance
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      // Also ensure content-type is set for non-form-data requests
      if (!config.headers['Content-Type'] && !(config.data instanceof FormData)) {
        config.headers['Content-Type'] = 'application/json';
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403 || error.response?.status === 401) {
      // Clear stored data on auth errors
      localStorage.removeItem('token');
      sessionStorage.removeItem('blogData');
      // You might want to redirect to login or show a message
    }
    return Promise.reject(error);
  }
);

const getAllBlogs = async () => {
  const response = await axiosInstance.get('/blogs');
  sessionStorage.setItem('blogData', JSON.stringify(response.data));
  return response.data;
};

export const blogService = {
  login: async (email, password) => {
    const response = await axiosInstance.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: async () => {
    try {
      // Add a call to your logout endpoint if you have one
      // await axiosInstance.post('/auth/logout');
      localStorage.removeItem('token');
      sessionStorage.removeItem('blogData');
    } catch (error) {
      console.error('Error during logout:', error);
      // Still remove token even if logout request fails
      localStorage.removeItem('token');
      sessionStorage.removeItem('blogData');
    }
  },

  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosInstance.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getImageUrl: (fileId) => {
    if (!fileId) return null;
    return `${API_URL}/images/${fileId}`;
  },

  deleteImage: async (fileId) => {
    if (!fileId) return;
    const response = await axiosInstance.delete(`/images/${fileId}`);
    return response.data;
  },

  getAllBlogs,

  getBlogById: async (id) => {
    const response = await axiosInstance.get(`/blogs/${id}`);
    return response.data;
  },

  createBlog: async (blogData, bannerImage) => {
    try {
      let imageId = null;
      if (bannerImage) {
        const imageResponse = await blogService.uploadImage(bannerImage);
        imageId = imageResponse.fileId;
      }

      const response = await axiosInstance.post('/blogs', {
        ...blogData,
        bannerId: imageId
      });
      
      sessionStorage.removeItem('blogData');
      await getAllBlogs();
      return response.data;
    } catch (error) {
      console.error('Error in createBlog:', error);
      throw error;
    }
  },

  updateBlog: async (id, blogData, bannerImage) => {
    try {
      let imageId = blogData.bannerId;
      if (bannerImage) {
        const imageResponse = await blogService.uploadImage(bannerImage);
        imageId = imageResponse.fileId;
      }

      const response = await axiosInstance.put(`/blogs/${id}`, {
        ...blogData,
        bannerId: imageId
      });
      
      sessionStorage.removeItem('blogData');
      await getAllBlogs();
      return response.data;
    } catch (error) {
      console.error('Error in updateBlog:', error);
      throw error;
    }
  },

  deleteBlog: async (id) => {
    try {
      // Verify token exists before attempting delete
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authorization token found');
      }

      const response = await axiosInstance.delete(`/blogs/${id}`);
      sessionStorage.removeItem('blogData');
      await getAllBlogs();
      return response.data;
    } catch (error) {
      console.error('Error in deleteBlog:', error);
      if (error.response?.status === 403) {
        throw new Error('Not authorized to delete this blog');
      }
      throw error;
    }
  }
};

export default blogService;