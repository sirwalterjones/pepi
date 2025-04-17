'use client' // Required for hooks and handlers

import React, { useState } from 'react';
import { supabase } from '@/src/lib/supabaseClient'; // Ensure path alias is correct
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/src/components/ui/card";
import { ReloadIcon } from "@radix-ui/react-icons";

// Renamed from RegisterComponent
export default function RegisterForm() { 
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

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({ 
        email,
        password,
        // Note: Default role is handled by DB trigger 'handle_new_user'
      });

      if (signUpError) throw signUpError;

      console.log('Registration successful:', data);
      setMessage('Registration successful! Please check your email if confirmation is enabled, or log in.');
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
          setError('An unexpected error occurred during registration.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg border border-border/40 rounded-xl overflow-hidden">
        <CardHeader className="text-center p-8 bg-card">
          <CardTitle className="text-2xl font-semibold tracking-tight">Create Account</CardTitle>
          <CardDescription className="text-muted-foreground">Enter your details to register</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleRegister} className="space-y-5">
             <div className="space-y-1.5">
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
            <div className="space-y-1.5">
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
            <div className="space-y-1.5">
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
                <div className="bg-destructive/10 border border-destructive/20 text-sm text-destructive rounded-md p-3 flex items-center gap-2" role="alert">
                   <span>{error}</span>
                </div>
            )}
            {message && (
                 <div className="bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-600 rounded-md p-3 flex items-center gap-2" role="alert">
                    <span>{message}</span>
                </div>
            )}

            <Button type="submit" className="w-full text-base py-2.5" disabled={loading}>
              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </CardContent>
    </Card>
  );
} 