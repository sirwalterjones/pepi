import { createClient } from '@supabase/supabase-js'

// Access environment variables using import.meta.env for Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.warn('Supabase URL not found. Please provide it in your environment variables (e.g., .env or Vercel dashboard) as VITE_SUPABASE_URL.');
  // throw new Error("Supabase URL not found."); // Optional: throw error to prevent app load
}

if (!supabaseAnonKey) {
  console.warn('Supabase Anon Key not found. Please provide it in your environment variables (e.g., .env or Vercel dashboard) as VITE_SUPABASE_ANON_KEY.');
   // throw new Error("Supabase Anon Key not found."); // Optional: throw error
}

// Handle cases where env vars might be missing during build/runtime if not throwing errors
const effectiveUrl = supabaseUrl || 'temp-url-placeholder';
const effectiveKey = supabaseAnonKey || 'temp-key-placeholder';

export const supabase = createClient(effectiveUrl, effectiveKey)

// Optional: Add a check function if you didn't throw errors above
export const checkSupabaseConfig = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase configuration is missing. Please check environment variables.");
    return false;
  }
  return true;
}; 