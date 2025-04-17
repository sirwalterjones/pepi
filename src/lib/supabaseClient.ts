import { createClient } from '@supabase/supabase-js'

// Use process.env for Next.js environment variables
// Prefix with NEXT_PUBLIC_ for client-side access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseInstance;

if (!supabaseUrl) {
  console.warn('Supabase URL not found. Provide it as NEXT_PUBLIC_SUPABASE_URL.');
} else if (!supabaseAnonKey) {
  console.warn('Supabase Anon Key not found. Provide it as NEXT_PUBLIC_SUPABASE_ANON_KEY.');
} else {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
}

// Export the instance, handling potential undefined state if env vars are missing
export const supabase = supabaseInstance;

// Optional check function
export const checkSupabaseConfig = () => {
  if (!supabaseUrl || !supabaseAnonKey || !supabaseInstance) {
    console.error("Supabase configuration is missing or invalid. Check NEXT_PUBLIC_ environment variables.");
    return false;
  }
  return true;
}; 