import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import blogService from '../../api/blogService';

export const BlogEditor = () => {
  const [blog, setBlog] = useState({ title: '', content: '', bannerId: '' });
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerPreview, setBannerPreview] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const quillRef = React.useRef();

  useEffect(() => {
    if (id) {
      loadBlog();
    }
  }, [id]);

  useEffect(() => {
    if (blog.bannerId) {
      setBannerPreview(blogService.getImageUrl(blog.bannerId));
    }
  }, [blog.bannerId]);

  const loadBlog = async () => {
    try {
      const data = await blogService.getBlogById(id);
      setBlog(data);
    } catch (error) {
      console.error('Error loading blog:', error);
      navigate('/blog');
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const API_URL = 'https://api-sonch.vercel.app/api';

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        try {
          const formData = new FormData();
          formData.append('file', file);

          const response = await blogService.uploadImage(file);
          const imageUrl = `${API_URL}/images/${response.fileId}`;
          
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();
          editor.insertEmbed(range.index, 'image', imageUrl);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    };
  }, []);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), [imageHandler]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (id) {
        await blogService.updateBlog(id, blog, bannerImage);
      } else {
        await blogService.createBlog(blog, bannerImage);
      }
      navigate('/blog');
    } catch (error) {
      console.error('Error saving blog:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        {id ? 'Edit Blog' : 'Create New Blog'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Banner Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Banner Image
          </label>
          <div className="flex flex-col space-y-2">
            {(bannerPreview || blog.bannerId) && (
              <div className="relative w-full h-48">
                <img
                  src={bannerPreview || blogService.getImageUrl(blog.bannerId)}
                  alt="Banner preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
        </div>

        {/* Title Input */}
        <div>
          <input
            type="text"
            placeholder="Enter blog title..."
            value={blog.title}
            onChange={(e) => setBlog({...blog, title: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Content Editor */}
        <div className="h-96">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={blog.content}
            onChange={(content) => setBlog({...blog, content})}
            className="h-80 bg-white"
            modules={modules}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/blog')}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};