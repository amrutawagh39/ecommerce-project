import React from 'react';

const CartPage = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
            <p className="mt-4 text-lg text-gray-600">
                This is where the user's selected products will appear.
            </p>
            <div className="mt-6 p-4 border rounded bg-white shadow-sm">
                {/* Cart component logic will be added here */}
                <p>Your cart is currently empty.</p>
            </div>
        </div>
    );
};

export default CartPage;