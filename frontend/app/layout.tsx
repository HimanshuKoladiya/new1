import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zenith - Mental Wellness Tracker',
  description: 'AI-powered mental wellness companion for students.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="p-4 bg-white shadow flex justify-between items-center">
            <div className="font-bold text-xl text-primary">Zenith</div>
            <div className="flex gap-4">
                <a href="/dashboard" className="text-sm font-medium hover:text-primary">Dashboard</a>
                <a href="/chat" className="text-sm font-medium hover:text-primary">AI Chat</a>
                <a href="/checkin" className="text-sm font-medium hover:text-primary">Check In</a>
            </div>
        </nav>
        <main className="min-h-screen p-8">{children}</main>
      </body>
    </html>
  )
}
