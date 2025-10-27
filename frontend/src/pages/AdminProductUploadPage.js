import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Notification from '../components/Notification';
import api from '../api';

const AdminProductUploadPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null); // For file input
  const [previewImage, setPreviewImage] = useState(null); // For image preview

  const [categories, setCategories] = useState([]); // Dynamically populate categories
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/login'); // Redirect non-admin users
    }
    // In a real app, fetch categories from a dedicated API endpoint
    setCategories(['Electronics', 'Books', 'Clothing', 'Home Appliances', 'Food', 'Beauty', 'Other']);
  }, [user, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('stock', stock);
    if (image) {
      formData.append('image', image); // 'image' should match the field name in multer config
    }

    try {
      const { data } = await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(`Product "${data.name}" uploaded successfully!`);
      // Reset form
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setStock('');
      setImage(null);
      setPreviewImage(null);
    } catch (err) {
      console.error("Product upload error:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Failed to upload product.');
    } finally {
      setLoading(false);
    }
  };

  if (!user || !user.isAdmin) {
    return (
      <div className="container mx-auto p-6 text-center text-red-600 font-bold text-xl mt-10">
        You must be an administrator to view this page. Redirecting to login...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl mt-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Upload New Product</h1>
      {success && <Notification message={success} type="success" onClose={() => setSuccess(null)} />}
      {error && <Notification message={error} type="error" onClose={() => setError(null)} />}

      <form onSubmit={submitHandler} className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="name">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="input-field h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="price">
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              className="input-field"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="0.01"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="stock">
              Stock Quantity
            </label>
            <input
              type="number"
              id="stock"
              className="input-field"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              min="0"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className="input-field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="mb-8">
          <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="image">
            Product Image
          </label>
          <input
            type="file"
            id="image"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            accept="image/*"
            onChange={handleImageChange}
          />
          {previewImage && (
            <div className="mt-4">
              <img src={previewImage} alt="Image Preview" className="max-w-xs h-auto rounded-lg shadow-md border border-gray-200" />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline text-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Product'}
        </button>
      </form>
    </div>
  );
};

export default AdminProductUploadPage;