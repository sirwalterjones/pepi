import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { supabase } from '../../lib/supabaseClient'; // Import supabase client

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    console.log('Attempting login with:', { email });

    try {
      // Check Supabase config first (optional but good practice)
      // if (!checkSupabaseConfig()) { // Assuming checkSupabaseConfig is exported from supabaseClient
      //   throw new Error("Supabase not configured. Check environment variables.");
      // }

      const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });

      if (loginError) throw loginError;

      console.log('Login successful:', data);
      // TODO: Implement proper state management to update auth status globally
      alert('Login Successful!'); // Temporary feedback
      // navigate('/dashboard'); // Navigate to dashboard upon successful login (when route exists)

    } catch (err) {
      console.error('Login error:', err);
      // Provide user-friendly error messages
      if (err.message.includes('Invalid login credentials')) {
        setError('Invalid email or password.');
      } else if (err.message.includes('Email not confirmed')) {
         setError('Please confirm your email address first.');
      } else {
        setError(err.message || 'An unexpected error occurred during login.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-4">
      <div className="p-8 px-10 max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-200">
        {/* Placeholder for Logo? */}
        <div className="text-center mb-8">
           {/* <img src="/path/to/logo.png" alt="Logo" className="mx-auto h-12 w-auto" /> */}
           <h1 className="text-3xl font-bold text-gray-800 mt-2">PEPI Tracker</h1>
           <p className="text-gray-500">Sign in to access your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="you@example.com"
            />
          </div>

          <div>
             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="••••••••"
            />
          </div>

          {/* Optional: Forgot Password Link */}
          {/* <div className="text-sm text-right">
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Forgot your password?
            </a>
          </div> */}

          {error && (
            <div className="bg-red-50 border border-red-200 text-sm text-red-700 rounded-md p-3" role="alert">
                <span className="font-medium">Error:</span> {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition duration-150 ease-in-out"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Need an account?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
} 