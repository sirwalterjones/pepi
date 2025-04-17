import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

import LoginPage from './pages/Auth/Login.jsx'
import RegisterPage from './pages/Auth/RegisterPage.jsx'
import AdminDashboardPage from './pages/Dashboard/Admin.jsx'
import AgentDashboardPage from './pages/Dashboard/AgentDashboardPage.jsx'; // Import Agent Dashboard

import './index.css' // Import Tailwind CSS

// Main App Component to manage auth state and roles
function App() {
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null); // State for user role
  const [loading, setLoading] = useState(true);

  // Function to fetch user profile/role
  const fetchUserProfile = async (userId) => {
    if (!userId) {
        setUserRole(null);
        return;
    }
    try {
        // Assumes a 'profiles' table with 'id' (matches auth.users.id) and 'role' columns
        const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', userId)
            .single(); // Fetch single profile

        if (error) {
            console.error('Error fetching profile:', error);
            setUserRole(null); // Set role to null if error or profile not found
        } else if (data) {
            setUserRole(data.role); // Set the fetched role
        } else {
            setUserRole(null); // No profile found for user
        }
    } catch (err) {
        console.error('Error in fetchUserProfile:', err);
        setUserRole(null);
    }
  };

  useEffect(() => {
    setLoading(true); // Ensure loading is true at the start
    // Check initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      await fetchUserProfile(session?.user?.id); // Fetch profile based on initial session
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      await fetchUserProfile(session?.user?.id); // Re-fetch profile on auth change
      // Consider setting loading state here if fetching profile takes time
    });

    // Cleanup listener
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  // Show loading indicator while checking session and profile
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // Determine which dashboard to show
  const DashboardComponent = () => {
    if (!session) {
      return <Navigate to="/login" replace />;
    }
    // Add a loading check for role if fetchUserProfile sets loading state
    // if (roleLoading) return <p>Loading profile...</p>; 
    
    switch (userRole) {
      case 'admin':
        return <AdminDashboardPage />;
      case 'agent':
        return <AgentDashboardPage />;
      default:
        // Handle cases where role is null or unexpected
        // Maybe show an error, a default page, or redirect to login
        console.warn(`Unknown or missing role: ${userRole}. Redirecting to login.`);
        // You might want a dedicated page for this state
        // For now, log out and redirect to login if role is invalid after login
        supabase.auth.signOut(); 
        return <Navigate to="/login" replace />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes - redirect if logged in */}
        <Route path="/login" element={!session ? <LoginPage /> : <Navigate to="/dashboard" replace />} />
        <Route path="/register" element={!session ? <RegisterPage /> : <Navigate to="/dashboard" replace />} />

        {/* Use DashboardComponent for the main dashboard route */}
        <Route
          path="/dashboard"
          element={<DashboardComponent />}
        />

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