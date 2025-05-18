import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Concrete Finish',
  description: 'Premium concrete floor finishes for your space',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}