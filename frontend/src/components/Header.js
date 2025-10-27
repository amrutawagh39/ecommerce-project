import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold hover:text-gray-200">
          E-Store
        </Link>
        <nav>
          <ul className="flex space-x-6 text-lg">
            <li><Link to="/cart" className="hover:underline">Cart</Link></li>
            <li><Link to="/login" className="hover:underline">Sign In</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;