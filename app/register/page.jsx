'use client' // Needs client for Link

import React from 'react';
import Link from 'next/link'; // Use Next.js Link
import RegisterForm from '@/components/Auth/RegisterForm'; // Corrected casing: Auth
import { Button } from "@/components/ui/button"; // Corrected alias path

export default function RegisterPage() {
  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-stone-50 to-green-100 p-4">
      <RegisterForm />
      <p className="mt-6 text-sm text-muted-foreground">
        Already have an account?{' '}
        <Button variant="link" className="p-0 h-auto font-medium" asChild>
            <Link href="/login">
                Sign in here
            </Link>
        </Button>
      </p>
    </div>
  );
} 