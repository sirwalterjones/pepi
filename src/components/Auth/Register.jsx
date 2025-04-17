import React, { useState } from 'react';
// import { supabase } from '../../lib/supabaseClient'; // TODO: Uncomment and use for actual registration logic

export default function RegisterComponent() { // Renamed to avoid conflict if used as a page
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    console.log('Attempting registration with:', { email }); // Don't log password
    // TODO: Implement actual Supabase registration logic here
    // try {
    //   const { user, error } = await supabase.auth.signUp({ email, password });
    //   if (error) throw error;
    //   setMessage('Registration successful! Please check your email for verification.');
    //   // Handle successful registration (e.g., clear form, show message)
    // } catch (error) {
    //   setError(error.message);
    // } finally {
    //   setLoading(false);
    // }
    setLoading(false); // Placeholder
    setError('Registration functionality not implemented yet.'); // Placeholder
  };

  // This is a component, likely used within a Register Page or Modal
  return (
    <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label htmlFor="reg-email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input
            type="email"
            id="reg-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="your@email.com"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reg-password" className="block text-sm font-medium text-gray-600 mb-1">Password</label>
          <input
            type="password"
            id="reg-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6" // Example: Enforce minimum password length
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Create a password (min. 6 chars)"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Retype your password"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
         {/* TODO: Add link back to Login page */}
         {/* <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account? <a href="#" className="text-blue-500 hover:underline">Login</a>
          </p> */}
      </form>
    </div>
  );
} 