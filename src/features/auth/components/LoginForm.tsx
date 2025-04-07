import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { v4 as uuidv4 } from 'uuid';

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username.trim() === '') {
      alert('Please enter a username');
      return;
    }

    login({
      id: uuidv4(),
      username,
      email,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`
    });
  };

  return (
    <div className="login-container max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome to Farming Comic Game</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-2 font-semibold">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email (Optional)
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your email (optional)"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Start Adventure
        </button>
      </form>
    </div>
  );
};
