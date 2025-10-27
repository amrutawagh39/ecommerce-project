import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const API_BASE_URL = process.env.REACT_APP_API_URL.replace('/api', ''); // Get base URL for images
  const defaultImage = 'https://via.placeholder.com/300x200?text=No+Image'; // Fallback image

  return (
    <div className="border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.imageUrl ? `${API_BASE_URL}${product.imageUrl}` : defaultImage}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition duration-300 truncate">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-lg font-medium mt-1 mb-3">${parseFloat(product.price).toFixed(2)}</p>
        <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;