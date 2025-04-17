import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient'; // Use alias
import { Button } from "@/components/ui/button"; // Import shadcn components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ReloadIcon } from "@radix-ui/react-icons" // Optional: Spinner icon

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    console.log('Attempting login with:', { email });

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
      if (loginError) throw loginError;
      console.log('Login successful:', data);
      // Navigation is handled by the main App component via onAuthStateChange
      // navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      if (err.message.includes('Invalid login credentials')) {
        setError('Invalid email or password.');
      } else if (err.message.includes('Email not confirmed')) {
         setError('Please confirm your email address first.');
      } else {
        setError('An unexpected error occurred. Please try again.'); // Generic error
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // Use font-sans defined in tailwind.config.js (Inter)
    // Slightly softer background gradient
    <div className="font-sans flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-stone-50 to-slate-100 p-4">
       {/* Increase card padding, add subtle border */}
       <Card className="w-full max-w-md shadow-lg border border-border/40 rounded-xl overflow-hidden">
        <CardHeader className="text-center p-8 bg-card">
            {/* Placeholder for Logo */}
            {/* <img src="/logo.svg" alt="PEPI Tracker Logo" className="w-16 h-16 mx-auto mb-4" /> */}
          <CardTitle className="text-2xl font-semibold tracking-tight">PEPI Tracker</CardTitle>
          <CardDescription className="text-muted-foreground">Sign in to access your account</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleLogin} className="space-y-5"> { /* Slightly more space */}
            <div className="space-y-1.5"> { /* Tighter spacing for label/input */}
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-sm text-destructive rounded-md p-3 flex items-center gap-2" role="alert">
                  {/* Optional: Add an icon here */}
                  <span>{error}</span>
              </div>
            )}

            <Button type="submit" className="w-full text-base py-2.5" disabled={loading}> { /* Slightly larger button */}
               {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="bg-muted/50 p-6 border-t flex justify-center">
          <p className="text-sm text-muted-foreground">
            Need an account?{' '}
            <Button variant="link" className="p-0 h-auto font-medium" asChild>
                 <Link to="/register">
                     Register here
                </Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
} 