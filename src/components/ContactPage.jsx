import React, { useState } from 'react';
import Header from './Header';

const ContactPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email submitted: ${email}`);
    setEmail('');
  };

  return (
    <div>

        <Header/>
        <div className="flex justify-center items-center min-h-screen text-white">
      <div className="w-full max-w-md  p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-center border-b-2 border-gray-500 pb-3 mb-4">
          Contact Us
        </h2>
        <div className="text-center mb-5">
          <p className="mb-2"><strong>Email:</strong> sontaya.km42@gmail.com</p>
          <p className="mb-2"><strong>Phone:</strong> +6680 214 2879</p>
          <p><strong>Address:</strong> 69 Mahachai dumri Mahasarakham</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium">Subscribe to our newsletter:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 w-full border border-gray-600 rounded-md text-white"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition duration-200"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ContactPage;
