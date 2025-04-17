import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginPage from './pages/Auth/Login.jsx' // Start with Login page
// import AdminDashboardPage from './pages/Dashboard/Admin.jsx' // Or Admin dashboard if logged in
import './index.css' // Import Tailwind CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* TODO: Add routing logic here to switch between Login and Dashboard */}
    <LoginPage />
    {/* <AdminDashboardPage /> */}
  </React.StrictMode>,
) 