import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';

import LoginPage from './pages/Auth/Login.jsx'
import RegisterPage from './pages/Auth/RegisterPage.jsx'
import AdminDashboardPage from './pages/Dashboard/Admin.jsx'

import './index.css' // Import Tailwind CSS

// Main App Component to manage auth state
function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false); // Update loading state on change too
    });

    // Cleanup listener on component unmount
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  // Show loading indicator while checking session
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {/* Simple spinner or loading message */}
        <p className="text-gray-500">Loading...</p>
        {/* Or use an SVG spinner like in LoginPage */}
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes - redirect if logged in */}
        <Route path="/login" element={!session ? <LoginPage /> : <Navigate to="/dashboard" replace />} />
        <Route path="/register" element={!session ? <RegisterPage /> : <Navigate to="/dashboard" replace />} />

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={session ? <AdminDashboardPage /> : <Navigate to="/login" replace />}
        />
        {/* TODO: Add specific Agent dashboard route later based on role */}

        {/* Default route: Redirect based on auth state */}
        <Route
          path="*"
          element={session ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) 