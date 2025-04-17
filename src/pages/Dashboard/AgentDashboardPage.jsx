import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient'; // Use alias
import { Button } from "@/components/ui/button"; // Import Button
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"; // Import Card components

// Simple NavBar for Agent view using shadcn Button
const AgentNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login'); // Navigate after sign out
  };

  return (
    <nav className="bg-background border-b p-4 flex justify-between items-center">
      <span className="text-xl font-semibold">PEPI Tracker</span>
      <Button variant="destructive" size="sm" onClick={handleLogout}>
          Logout
        </Button>
    </nav>
  );
};

export default function AgentDashboardPage() {
  // TODO: Fetch and display agent-specific data (their transactions)
  // const [user, setUser] = useState(null);
  // useEffect(() => { setUser(supabase.auth.user()); }, []);

  return (
    <div className="flex flex-col h-screen bg-background">
      <AgentNavBar />
      <main className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Your PEPI Funds History</h2>
        {/* Use Card for consistent content presentation */}
        <Card>
            <CardHeader>
                <CardTitle>Welcome, Agent!</CardTitle>
                {/* TODO: Display agent name */}
                 <CardDescription>
                     {/* Example: {user ? user.email : 'Loading...'} */}
                </CardDescription>
            </CardHeader>
             <CardContent>
                <p className="text-muted-foreground">Your transaction history and receipt download will appear here.</p>
                 {/* TODO: Implement agent-specific transaction table component */}
            </CardContent>
        </Card>
      </main>
    </div>
  );
} 