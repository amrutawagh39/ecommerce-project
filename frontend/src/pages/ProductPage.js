import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Notification from '../components/Notification';
import api from '../api';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL.replace('/api', ''); // Get base URL for images
  const defaultImage = 'https://via.placeholder.com/400x300?text=No+Image'; // Fallback image

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError('Failed to fetch product details. Product may not exist.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    // Implement cart functionality here
    // For now, just a placeholder
    alert(`Added ${product.name} to cart! (Cart not fully implemented yet)`);
  };

  if (loading) return <p className="text-center mt-8 text-xl text-gray-700">Loading product details...</p>;
  if (error) return <Notification message={error} type="error" onClose={() => setError(null)} />;
  if (!product) return <p className="text-center mt-8 text-xl text-gray-700">Product not found.</p>;

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-10 mt-8 bg-white rounded-lg shadow-lg">
      <div className="md:w-1/2 flex justify-center items-center p-4">
        <img
          src={product.imageUrl ? `${API_BASE_URL}${product.imageUrl}` : defaultImage}
          alt={product.name}
          className="max-w-full h-auto max-h-96 object-contain rounded-lg shadow-md border border-gray-200"
        />
      </div>
      <div className="md:w-1/2 p-4">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
        <p className="text-3xl text-blue-600 font-bold mb-6">${parseFloat(product.price).toFixed(2)}</p>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">{product.description}</p>
        <div className="mb-6 space-y-2 text-gray-800">
          <p><strong>Category:</strong> <span className="bg-gray-200 px-3 py-1 rounded-full text-sm font-medium">{product.category}</span></p>
          <p><strong>Availability:</strong> {product.stock > 0 ? (
            <span className="text-green-600 font-semibold">{product.stock} in stock</span>
          ) : (
            <span className="text-red-600 font-semibold">Out of Stock</span>
          )}</p>
        </div>
        <button
          onClick={addToCartHandler}
          className={`w-full md:w-auto bg-indigo-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-indigo-700 transition duration-300 ${product.stock === 0 && 'opacity-50 cursor-not-allowed'}`}
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;