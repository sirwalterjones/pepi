import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient'; // Import supabase client

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

    if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    console.log('Attempting registration with:', { email });

    try {
      // Check Supabase config first (optional)
      // if (!checkSupabaseConfig()) { 
      //   throw new Error("Supabase not configured.");
      // }

      const { data, error: signUpError } = await supabase.auth.signUp({ 
        email,
        password,
        // options: { // Optional: Add user metadata like role upon signup
        //   data: {
        //     role: 'agent' // Default role, could be adjusted
        //   }
        // }
      });

      if (signUpError) throw signUpError;

      console.log('Registration successful:', data);
      setMessage('Registration successful! Please check your email for a confirmation link.');
      // Clear form on success
      setEmail('');
      setPassword('');
      setConfirmPassword('');

    } catch (err) {
      console.error('Registration error:', err);
       // Provide user-friendly error messages
      if (err.message.includes('User already registered')) {
         setError('This email address is already registered.');
      } else if (err.message.includes('Password should be at least 6 characters')) {
          setError('Password must be at least 6 characters long.');
      } else {
          setError(err.message || 'An unexpected error occurred during registration.');
      }
    } finally {
      setLoading(false);
    }
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
            minLength="6" // HTML5 validation, also checked in JS
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
        {error && (
            <div className="bg-red-50 border border-red-200 text-sm text-red-700 rounded-md p-3 mb-4" role="alert">
                <span className="font-medium">Error:</span> {error}
            </div>
        )}
        {message && (
             <div className="bg-green-50 border border-green-200 text-sm text-green-700 rounded-md p-3 mb-4" role="alert">
                <span className="font-medium">Success:</span> {message}
            </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
           {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
          {loading ? 'Registering...' : 'Register'}
        </button>
         {/* Link back to login is handled by RegisterPage.jsx */}
      </form>
    </div>
  );
} 