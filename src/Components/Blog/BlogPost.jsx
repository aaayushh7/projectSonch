import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import blogService from '../../api/blogService';
import 'react-quill/dist/quill.snow.css';

const ImageWithFallback = ({ src, alt, className, style }) => {
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const handleError = useCallback(() => {
    if (retryCount < MAX_RETRIES) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setImageError(false);
      }, 1000 * (retryCount + 1));
    } else {
      setImageError(true);
    }
  }, [retryCount]);

  if (imageError) {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center`}>
        <span className="text-gray-500">Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={`${src}?retry=${retryCount}`}
      alt={alt}
      className={className}
      style={style}
      onError={handleError}
      loading="lazy"
    />
  );
};

export const BlogPost = () => {
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const loadBlog = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await blogService.getBlogById(id);
      setBlog(data);
    } catch (error) {
      setError(error.message || 'Failed to load blog');
      setTimeout(() => navigate('/blog'), 3000);
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    loadBlog();
    setIsAdmin(!!localStorage.getItem('token'));
  }, [loadBlog]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      await blogService.deleteBlog(id);
      navigate('/blog');
    } catch (error) {
      alert('Error deleting blog: ' + (error.message || 'Unknown error'));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-6">
        {error}
        <div className="mt-2">Redirecting to blog list...</div>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {blog.bannerId && (
        <ImageWithFallback
          src={blogService.getImageUrl(blog.bannerId)}
          alt={blog.title}
          className="w-full rounded-lg mb-6 object-cover"
          style={{ maxHeight: '400px' }}
        />
      )}

      <h1 className="text-4xl font-bold text-center text-blue-800 mb-4">{blog.title}</h1>

      <div className="flex justify-center gap-4 text-gray-600 mb-8">
        <span className="flex items-center">
          <i className="fas fa-user mr-2"></i>
          {blog.author}
        </span>
        <span className="flex items-center">
          <i className="fas fa-calendar mr-2"></i>
          {new Date(blog.createdAt).toLocaleDateString()}
        </span>
      </div>

      <article 
        className="prose prose-lg mx-auto ql-editor"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <style>{`
        .ql-editor img {
          display: block;
          margin: 2rem auto;
          max-width: 100%;
          height: auto;
        }
        .prose {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .prose > * {
          width: 100%;
          text-align: justify;
        }
      `}</style>

      {isAdmin && (
        <div className="flex justify-center gap-4 mt-8">
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