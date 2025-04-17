'use client' // Required for useState, useEffect, event handlers

import React, { useState } from 'react';
import Link from 'next/link'; // Use Next.js Link
import { useRouter } from 'next/navigation'; // Use Next.js navigation
import { supabase } from '@/src/lib/supabaseClient'; // Ensure path alias is correct
import { Button } from "@/src/components/ui/button"; 
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/src/components/ui/card";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter(); // Use Next.js router

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
      if (loginError) throw loginError;
      // On successful login, Supabase auth state changes.
      // Routing logic (e.g., in middleware or a layout) will redirect.
      // Force a router refresh to ensure layout re-evaluates auth state if needed:
      router.refresh(); 
    } catch (err) {
      console.error('Login error:', err);
      if (err.message.includes('Invalid login credentials')) {
        setError('Invalid email or password.');
      } else if (err.message.includes('Email not confirmed')) {
         setError('Please confirm your email address first.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // Apply font via layout.jsx
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-stone-50 to-slate-100 p-4">
       <Card className="w-full max-w-md shadow-lg border border-border/40 rounded-xl overflow-hidden">
        <CardHeader className="text-center p-8 bg-card">
          <CardTitle className="text-2xl font-semibold tracking-tight">PEPI Tracker</CardTitle>
          <CardDescription className="text-muted-foreground">Sign in to access your account</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
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
                  <span>{error}</span>
              </div>
            )}

            <Button type="submit" className="w-full text-base py-2.5" disabled={loading}>
               {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="bg-muted/50 p-6 border-t flex justify-center">
          <p className="text-sm text-muted-foreground">
            Need an account?{' '}
            <Button variant="link" className="p-0 h-auto font-medium" asChild>
                 {/* Use Next.js Link */}
                 <Link href="/register">
                     Register here
                </Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
} 