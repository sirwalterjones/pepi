import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Use process.env for Next.js environment variables
// Prefix with NEXT_PUBLIC_ for client-side access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Explicitly type the instance
let supabaseInstance: SupabaseClient | undefined;

if (!supabaseUrl) {
  console.warn('Supabase URL not found. Provide it as NEXT_PUBLIC_SUPABASE_URL.');
} else if (!supabaseAnonKey) {
  console.warn('Supabase Anon Key not found. Provide it as NEXT_PUBLIC_SUPABASE_ANON_KEY.');
} else {
  // createClient returns SupabaseClient<any, "public", any>
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
}

// Export the instance, which might be undefined
export const supabase = supabaseInstance;

// Optional check function
export const checkSupabaseConfig = () => {
  if (!supabaseUrl || !supabaseAnonKey || !supabaseInstance) {
    console.error("Supabase configuration is missing or invalid. Check NEXT_PUBLIC_ environment variables.");
    return false;
  }
  return true;
}; 