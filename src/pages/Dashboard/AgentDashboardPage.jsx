import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

// Simple NavBar for Agent view
const AgentNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login'); // Navigate after sign out
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <span className="text-xl font-semibold text-gray-700">PEPI Tracker</span>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition duration-150"
      >
        Logout
      </button>
    </nav>
  );
};

export default function AgentDashboardPage() {
  // TODO: Fetch and display agent-specific data (their transactions)
  // const [user, setUser] = useState(null);
  // useEffect(() => { setUser(supabase.auth.user()); }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <AgentNavBar />
      <main className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your PEPI Funds History</h2>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-600">
            Welcome, Agent!
            {/* TODO: Display agent name, e.g., user?.email or data from profiles table */}
          </p>
          <p className="mt-4">Your transaction history and receipt download will appear here.</p>
          {/* TODO: Implement agent-specific transaction table component */}
        </div>
      </main>
    </div>
  );
} 