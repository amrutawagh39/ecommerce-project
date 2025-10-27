import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [serverStatus, setServerStatus] = useState('Checking backend status...');
  const [statusColor, setStatusColor] = useState('text-yellow-600');

  useEffect(() => {
    // This is the core check. It connects to the Express server on port 5000.
    axios.get('http://localhost:5000') 
      .then(response => {
        setServerStatus(`✅ Backend is ACTIVE: ${response.data}`);
        setStatusColor('text-green-600');
      })
      .catch(() => {
        // This will happen if the backend (node server.js) is not running
        setServerStatus('❌ Backend is OFFLINE (Could not connect to port 5000)');
        setStatusColor('text-red-600');
      });
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 border-b pb-2">E-commerce Frontend Running!</h1>
      
      <div className="p-6 border-2 border-dashed border-gray-400 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-3">API Connection Status:</h3>
        <p className={`font-mono text-xl ${statusColor}`}>
          {serverStatus}
        </p>
        <p className="text-sm mt-4 text-gray-600">
          Run your backend (`node server.js`) to see this turn GREEN.
        </p>
      </div>
    </div>
  );
};

export default HomePage;