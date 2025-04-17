import React from 'react';
import { Link } from 'react-router-dom';
import RegisterComponent from '../../components/Auth/Register'; // Corrected path

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-green-100 p-4">
      <div className="flex flex-col items-center">
        <RegisterComponent />
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
} 