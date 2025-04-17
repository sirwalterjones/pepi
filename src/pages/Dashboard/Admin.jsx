import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import { supabase } from '@/lib/supabaseClient'; // Use alias
import TransactionsTable from '@/components/Transactions/Table'; // Use alias
import AgentsList from '@/components/Agents/List'; // Use alias
import { Button } from "@/components/ui/button"; // Import Button

// NavBar component with Logout using shadcn Button
const NavBar = ({ setCurrentView }) => { // Accept setCurrentView prop
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
    <nav className="bg-background border-b p-4 flex justify-between items-center">
      <span className="text-xl font-semibold">PEPI Tracker (Admin)</span>
      <div className="flex items-center space-x-2">
        {/* TODO: Implement Year Selector */}
        {/* <span className="text-sm text-muted-foreground mr-4">Year: 2025</span> */}
        {/* Use Buttons to set the current view */}
        <Button variant="default" size="sm" onClick={() => setCurrentView('transactions')}>New Transaction</Button>
        <Button variant="ghost" size="sm" onClick={() => setCurrentView('agents')}>Agents</Button>
        <Button variant="ghost" size="sm" onClick={() => setCurrentView('reports')}>Reports</Button>
        <Button variant="destructive" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
};

const AdminSidebar = () => (
  <aside className="w-64 bg-card p-4 border-r h-full flex-shrink-0">
    <h3 className="text-lg font-semibold mb-4 text-card-foreground">Quick Stats</h3>
    <div className="space-y-2 text-sm text-muted-foreground">
      {/* TODO: Fetch and display actual data */}
      <p>Total In: <span className="font-medium text-foreground">$0.00</span></p>
      <p>Total Out: <span className="font-medium text-foreground">$0.00</span></p>
      <p>Current Balance: <span className="font-medium text-foreground">$0.00</span></p>
    </div>
    {/* Add more sidebar content as needed */}
  </aside>
);

export default function AdminDashboardPage() {
  // TODO: Add state management for selected view (Transactions, Agents, Reports)
  const [currentView, setCurrentView] = React.useState('transactions'); // Example state

  return (
    <div className="flex flex-col h-screen bg-background">
      <NavBar setCurrentView={setCurrentView} /> { /* Pass setter */}
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
          {currentView === 'reports' && <p>Reports View Placeholder</p>}
          {/* TODO: Add Reporting component */} 
          {/* {currentView === 'reports' && <ReportsComponent />} */}
        </main>
      </div>
    </div>
  );
} 