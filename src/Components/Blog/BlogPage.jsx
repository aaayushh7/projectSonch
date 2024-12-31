import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogService from '../../api/blogService';
import bg from '../../assets/hero.png';

const SkeletonBlog = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse flex h-48">
    <div className="w-1/3 bg-slate-200"></div>
    <div className="w-2/3 p-6">
      <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        <div className="h-4 bg-slate-200 rounded w-4/6"></div>
      </div>
    </div>
  </div>
);

const ImageSkeleton = () => (
  <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
    <span className="text-gray-400">Loading...</span>
  </div>
);

const API_URL = 'https://api-sonch.vercel.app/api';

const BlogCard = ({ blog }) => {
  const [imageStates, setImageStates] = useState({
    loaded: false,
    error: false,
    retryCount: 0,
    isLoading: true
  });
  const MAX_RETRIES = 3;

  const content = blog.content.replace(/<[^>]*>/g, '');
  const preview = content.split(' ').slice(0, 150).join(' ') + (content.split(' ').length > 150 ? '...' : '');

  const handleImageLoad = () => {
    setImageStates(prev => ({
      ...prev,
      loaded: true,
      error: false,
      isLoading: false
    }));
  };

  const handleImageError = () => {
    setImageStates(prev => {
      if (prev.retryCount < MAX_RETRIES) {
        // Start loading state again for retry
        const newState = {
          ...prev,
          isLoading: true,
          retryCount: prev.retryCount + 1,
          error: false
        };
        
        setTimeout(() => {
          const img = new Image();
          img.src = `${API_URL}/images/${blog.bannerId}?retry=${newState.retryCount}`;
          img.onload = handleImageLoad;
          img.onerror = () => {
            setImageStates(curr => ({
              ...curr,
              error: true,
              isLoading: false
            }));
          };
        }, 1000 * (prev.retryCount + 1));
        
        return newState;
      }
      return {
        ...prev,
        error: true,
        isLoading: false
      };
    });
  };

  useEffect(() => {
    if (blog.bannerId) {
      setImageStates(prev => ({ ...prev, isLoading: true }));
      // Preload image
      const img = new Image();
      img.src = `${API_URL}/images/${blog.bannerId}`;
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
    }

    return () => {
      setImageStates({
        loaded: false,
        error: false,
        retryCount: 0,
        isLoading: true
      });
    };
  }, [blog.bannerId]);

  return (
    <div className="bg-white shadow-lg border-4 border-blue-700 overflow-hidden hover:shadow-lg transition-shadow flex p-3 sm:h-[200px]">
      <div className="w-1/3 relative">
        {blog.bannerId ? (
          <>
            {imageStates.isLoading && <ImageSkeleton />}
            <img
              src={`${API_URL}/images/${blog.bannerId}?retry=${imageStates.retryCount}`}
              alt={blog.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageStates.loaded ? 'opacity-100' : 'opacity-0'
              } ${imageStates.error ? 'hidden' : 'block'}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
            {imageStates.error && (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Failed to load image</span>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      <div className="w-2/3 pl-3 flex flex-col justify-between">
        <div>
          <h2 className="sm:text-2xl text-md font-semibold text-gray-800 line-clamp-1 text-left">{blog.title}</h2>
          <p className="text-gray-600 line-clamp-3 text-sm sm:text-xl">{preview}</p>
        </div>
        <Link
          to={`/blog/${blog._id}`}
          className="text-blue-600 hover:text-blue-800 font-medium mt-2 text-xs sm:text-xl inline-block"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const loadBlogs = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAdmin(true);
      }

      const cachedBlogs = sessionStorage.getItem('blogData');
      if (cachedBlogs) {
        setBlogs(JSON.parse(cachedBlogs));
        setIsLoading(false);
        return;
      }

      const data = await blogService.getAllBlogs();
      if (Array.isArray(data)) {
        setBlogs(data);
        sessionStorage.setItem('blogData', JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error loading blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await blogService.login(loginData.email, loginData.password);
      if (response?.token) {
        localStorage.setItem('token', response.token);
        setIsAdmin(true);
        setShowLoginModal(false);
        // Refresh blogs after login to get latest data
        await loadBlogs();
      } else {
        throw new Error('Login failed - No token received');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('blogData');
    setIsAdmin(false);
    setShowAdminMenu(false);
    // Refresh blogs after logout
    loadBlogs();
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="max-w-full mx-auto">
        <h1
          className="text-4xl font-bold text-blue-800 text-center mb-7 flex items-center justify-center h-[150px] md:h-[250px]"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            padding: '1rem',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
            width: '100%',
          }}
        >
          SONCH Blog
        </h1>
    
        <div className="grid md:grid-cols-1 lg:grid-cols-1 p-6 gap-6">
          {isLoading ? (
            Array(6).fill(null).map((_, index) => (
              <SkeletonBlog key={index} />
            ))
          ) : (
            blogs.map(blog => (
              <BlogCard key={blog._id} blog={blog} />
            ))
          )}
        </div>

        {/* Admin Menu Button */}
        <div className="fixed bottom-8 right-8">
          {isAdmin ? (
            <div className="relative">
              <button
                className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                onClick={() => setShowAdminMenu(!showAdminMenu)}
              >
                <i className="fas fa-plus"></i>
              </button>
              
              {showAdminMenu && (
                <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg overflow-hidden w-48">
                  <Link
                    to="/blog/new"
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    New Post
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              onClick={() => setShowLoginModal(true)}
            >
              <i className="fas fa-plus"></i>
            </button>
          )}
        </div>

        {/* Login Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-blue-800 mb-6">Admin Login</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLoginModal(false)}
                    className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};