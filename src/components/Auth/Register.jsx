import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Use alias
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function RegisterComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    console.log('Attempting registration with:', { email });

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({ 
        email,
        password,
      });

      if (signUpError) throw signUpError;

      console.log('Registration successful:', data);
      setMessage('Registration successful! Please check your email for a confirmation link.');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

    } catch (err) {
      console.error('Registration error:', err);
      if (err.message.includes('User already registered')) {
         setError('This email address is already registered.');
      } else if (err.message.includes('Password should be at least 6 characters')) {
          setError('Password must be at least 6 characters long.');
      } else {
          setError(err.message || 'An unexpected error occurred during registration.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // Use Card component for consistent styling with Login
    <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Enter your details to register</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reg-email">Email</Label>
              <Input
                id="reg-email"
                type="email"
                placeholder="your@email.com"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-password">Password</Label>
              <Input
                id="reg-password"
                type="password"
                placeholder="Create a password (min. 6 chars)"
                required
                autoComplete="new-password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Retype your password"
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Consistent Error/Message Styling */} 
            {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-sm text-destructive rounded-md p-3" role="alert">
                    {error}
                </div>
            )}
            {message && (
                 <div className="bg-primary/10 border border-primary/20 text-sm text-primary rounded-md p-3" role="alert">
                    {message}
                </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </CardContent>
        {/* Footer removed as link back is in RegisterPage */}
    </Card>
  );
} 