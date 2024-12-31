import axios from 'axios';

const API_URL = 'https://api-sonch.vercel.app/api';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403 || error.response?.status === 401) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('blogData');
    }
    return Promise.reject(error);
  }
);

const compressImage = async (file, maxWidth = 1200, maxHeight = 800, quality = 0.7) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            resolve(new File([blob], file.name || 'image.jpg', {
              type: 'image/jpeg',
              lastModified: Date.now(),
            }));
          },
          'image/jpeg',
          quality
        );
      };
    };
  });
};

const retryRequest = async (fn, retries = MAX_RETRIES) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (i + 1)));
    }
  }
};

const blogService = {
  async uploadImage(input) {
    try {
      if (!(input instanceof File)) {
        throw new Error('Invalid input type for image upload');
      }
  
      console.log('Uploading file:', input.name, input.size);
      const compressedImage = await compressImage(input);
      console.log('Compressed size:', compressedImage.size);
      
      const formData = new FormData();
      formData.append('file', compressedImage);
      
      const response = await retryRequest(() => 
        axiosInstance.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      );
      return response.data;
    } catch (error) {
      console.error('Upload error details:', error.response?.data);
      throw error;
    }
  },

  getImageUrl(fileId) {
    if (!fileId) return null;
    return `${API_URL}/images/${fileId}?v=${Date.now()}`;
  },
  
  login: async (email, password) => {
    const response = await axiosInstance.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: async () => {
    try {
      localStorage.removeItem('token');
      sessionStorage.removeItem('blogData');
    } catch (error) {
      console.error('Error during logout:', error);
      localStorage.removeItem('token');
      sessionStorage.removeItem('blogData');
    }
  },

  async getAllBlogs() {
    const response = await retryRequest(() => axiosInstance.get('/blogs'));
    return response.data;
  },

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
      await blogService.getAllBlogs();
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
      await blogService.getAllBlogs();
      return response.data;
    } catch (error) {
      console.error('Error in updateBlog:', error);
      throw error;
    }
  },

  deleteBlog: async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authorization token found');
      }

      const response = await axiosInstance.delete(`/blogs/${id}`);
      sessionStorage.removeItem('blogData');
      await blogService.getAllBlogs();
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