import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import { supabase } from '../../lib/supabaseClient'; // Import Supabase client
import TransactionsTable from '../../components/Transactions/Table'; // Adjust path as needed
import AgentsList from '../../components/Agents/List'; // Adjust path as needed

// NavBar component with Logout
const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
      // TODO: Show error to user?
    } else {
      // Navigate to login page after successful logout
      // The onAuthStateChange listener in App will handle the state update
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <span className="text-xl font-semibold text-gray-700">PEPI Tracker (Admin)</span>
      <div className="flex items-center space-x-3">
        {/* TODO: Implement Year Selector */}
        <span className="text-sm text-gray-500 mr-4">Year: 2025</span>
        {/* TODO: Add actual buttons/links and functionality for nav items */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition duration-150">New Transaction</button>
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium transition duration-150">Agents</button>
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium transition duration-150">Reports</button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition duration-150"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

const AdminSidebar = () => (
  <aside className="w-64 bg-gray-50 p-4 shadow-md h-full">
    <h3 className="text-lg font-semibold mb-4 text-gray-600">Quick Stats</h3>
    <div className="space-y-2">
      {/* TODO: Fetch and display actual data */}
      <p>Total In: <span className="font-medium">$0.00</span></p>
      <p>Total Out: <span className="font-medium">$0.00</span></p>
      <p>Current Balance: <span className="font-medium">$0.00</span></p>
    </div>
    {/* Add more sidebar content as needed */}
  </aside>
);

export default function AdminDashboardPage() {
  // TODO: Add state management for selected view (Transactions, Agents, Reports)
  const [currentView, setCurrentView] = React.useState('transactions'); // Example state

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {currentView === 'transactions' && 'Transaction Log'}
            {currentView === 'agents' && 'Agent Management'}
            {/* Add other view titles */} 
          </h2>

          {/* Conditionally render main content based on state */}
          {currentView === 'transactions' && <TransactionsTable />}
          {currentView === 'agents' && <AgentsList />}
          {/* TODO: Add Reporting component */} 
          {/* {currentView === 'reports' && <ReportsComponent />} */}
        </main>
      </div>
    </div>
  );
} 