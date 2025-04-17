import '@/index.css' // Corrected path: CSS file is directly in src
import { Inter } from 'next/font/google' // Use Next.js font optimization

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata = {
  title: 'PEPI Tracker',
  description: 'PEPI Fund Management Application',
  // Add other metadata as needed
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}> { /* Apply font class */}
      <head>
        { /* Favicons, other head elements can go here */}
        { /* Note: Google Font link in index.html is no longer needed */}
      </head>
      <body className="antialiased bg-background text-foreground min-h-screen flex flex-col">
        {/* TODO: Consider adding Auth Provider here later */}
        {children}
      </body>
    </html>
  )
} 