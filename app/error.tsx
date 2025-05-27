"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center px-4">
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-10 w-10 text-red-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h1>
          <p className="text-gray-600 mb-8">
            We're sorry, but something unexpected happened. Please try refreshing the page or go back to the homepage.
          </p>
          {process.env.NODE_ENV === "development" && (
            <details className="text-left bg-gray-100 p-4 rounded-md mb-4">
              <summary className="cursor-pointer font-medium">Error Details</summary>
              <pre className="mt-2 text-sm text-red-600 overflow-auto">{error.message}</pre>
            </details>
          )}
        </div>

        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center w-full h-12 px-6 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center w-full h-12 px-6 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            <Home className="mr-2 h-5 w-5" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
