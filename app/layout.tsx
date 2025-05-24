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
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className="min-h-screen bg-background font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}