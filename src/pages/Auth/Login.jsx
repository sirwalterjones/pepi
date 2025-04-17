import React, { useState } from 'react';
// import { supabase } from '../../lib/supabaseClient'; // TODO: Uncomment and use for actual login logic

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    console.log('Attempting login with:', { email, password });
    // TODO: Implement actual Supabase login logic here
    // try {
    //   const { error } = await supabase.auth.signInWithPassword({ email, password });
    //   if (error) throw error;
    //   // Handle successful login (e.g., redirect)
    // } catch (error) {
    //   setError(error.message);
    // } finally {
    //   setLoading(false);
    // }
    setLoading(false); // Placeholder
    setError('Login functionality not implemented yet.'); // Placeholder
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">PEPI Tracker Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="your@email.com"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {/* TODO: Add link to Register page */}
          {/* <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account? <a href="#" className="text-blue-500 hover:underline">Register</a>
          </p> */}
        </form>
      </div>
    </div>
  );
} 