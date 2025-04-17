import { redirect } from 'next/navigation'

// Redirect root path to login page by default
export default function HomePage() {
  redirect('/login')
  // Alternatively, could check auth status here server-side and redirect
  // to /dashboard if logged in, but middleware is often better for that.
  // return null; // Or some placeholder if needed before redirect completes
} 