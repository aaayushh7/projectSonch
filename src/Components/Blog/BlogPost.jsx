import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import blogService from '../../api/blogService';

export const BlogPost = () => {
    const [blog, setBlog] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
      loadBlog();
      setIsAdmin(!!localStorage.getItem('token'));
    }, [id]);
  
    const loadBlog = async () => {
      try {
        const data = await blogService.getBlogById(id);
        setBlog(data);
      } catch (error) {
        console.error('Error loading blog:', error);
        navigate('/blog');
      }
    };
  
    const handleDelete = async () => {
      if (window.confirm('Are you sure you want to delete this blog?')) {
        try {
          await blogService.deleteBlog(id);
          navigate('/blog');
        } catch (error) {
          console.error('Error deleting blog:', error);
        }
      }
    };
  
    if (!blog) return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">{blog.title}</h1>
        <div className="flex gap-4 text-gray-600 mb-8">
          <span className="flex items-center">
            <i className="fas fa-user mr-2"></i>
            {blog.author}
          </span>
          <span className="flex items-center">
            <i className="fas fa-calendar mr-2"></i>
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        {isAdmin && (
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => navigate(`/blog/edit/${id}`)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };
  