import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/Auth/Login.jsx'
import RegisterPage from './pages/Auth/RegisterPage.jsx'
// import AdminDashboardPage from './pages/Dashboard/Admin.jsx' // TODO: Add dashboard route later

import './index.css' // Import Tailwind CSS

// Placeholder for Auth state check - replace with actual Supabase logic
const isAuthenticated = () => {
  // TODO: Check Supabase auth state (e.g., supabase.auth.session())
  return false; // Default to not logged in
};

// Placeholder ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected.
    return <Navigate to="/login" replace />;
  }
  return children;
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Dashboard Route */}
        {/* <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        /> */}

        {/* Default route: Redirect to login if not authenticated, dashboard if authenticated */}
        <Route 
          path="*" 
          element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
) 