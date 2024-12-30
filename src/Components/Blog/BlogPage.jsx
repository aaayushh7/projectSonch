import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogService from '../../api/blogService';
import './Blog.css';

export const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
  
    useEffect(() => {
      loadBlogs();
      setIsAdmin(!!localStorage.getItem('token'));
    }, []);
  
    const loadBlogs = async () => {
      try {
        const data = await blogService.getAllBlogs();
        setBlogs(data);
      } catch (error) {
        console.error('Error loading blogs:', error);
      }
    };
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await blogService.login(loginData.email, loginData.password);
        setIsAdmin(true);
        setShowLoginModal(false);
      } catch (error) {
        alert('Login failed');
      }
    };
  
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-4xl font-bold text-blue-800 text-center mb-12">SONCH Blog</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
              <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-blue-800 mb-3">{blog.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                  </p>
                  <Link
                    to={`/blog/${blog._id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
  
          {isAdmin ? (
            <Link
              to="/blog/new"
              className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              <i className="fas fa-plus"></i>
            </Link>
          ) : (
            <button 
              className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              onClick={() => setShowLoginModal(true)}
            >
              <i className="fas fa-plus"></i>
            </button>
          )}
  
          {showLoginModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-blue-800 mb-6">Admin Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
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
  