import React from 'react'

// TODO: This will become a layout or a redirect based on role
export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard Placeholder</h1>
      <p>You are logged in.</p>
      {/* TODO: Add Sign Out Button */}
      {/* TODO: Add role-specific content or redirect */}
    </div>
  )
} 