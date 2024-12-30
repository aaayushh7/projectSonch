import axios from 'axios';

const API_URL = 'https://api-sonch.vercel.app/api';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getAllBlogs = async () => {
  const response = await axios.get(`${API_URL}/blogs`);
  sessionStorage.setItem('blogData', JSON.stringify(response.data));
  return response.data;
};

export const blogService = {
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

  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_URL}/upload`, formData, {
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
    const response = await axios.delete(`${API_URL}/images/${fileId}`);
    return response.data;
  },

  getAllBlogs,

  getBlogById: async (id) => {
    const response = await axios.get(`${API_URL}/blogs/${id}`);
    return response.data;
  },

  createBlog: async (blogData, bannerImage) => {
    try {
      let imageId = null;
      if (bannerImage) {
        const imageResponse = await blogService.uploadImage(bannerImage);
        imageId = imageResponse.fileId;
      }

      const response = await axios.post(`${API_URL}/blogs`, {
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

      const response = await axios.put(`${API_URL}/blogs/${id}`, {
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
    const response = await axios.delete(`${API_URL}/blogs/${id}`);
    sessionStorage.removeItem('blogData');
    await getAllBlogs();
    return response.data;
  }
};

export default blogService;