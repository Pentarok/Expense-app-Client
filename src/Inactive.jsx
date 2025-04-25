import React from 'react';
import { Link } from 'react-router-dom';

const Inactive = () => {
  return (
    <div className="min-h-screen flex items-center my-2 justify-center rounded-xl bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Subscription Inactive</h1>
        <p className="text-gray-700 mb-6">
          Your trial or subscription has ended. To continue using the full features of the platform,
          please renew your subscription.
        </p>
        <p>
  Once your payment is complete, please <a href="/login" style={{ color: '#007BFF', textDecoration: 'underline' }}>log in</a> to access your account.
</p>

      </div>
    </div>
  );
};

export default Inactive;
