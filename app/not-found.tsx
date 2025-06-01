"use client"

import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"
import { COMPANY_INFO } from "@/lib/constants"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center px-4"> 
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-12"> {COMPANY_INFO.name} </h1>
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the
            wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full h-12 px-6 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            <Home className="mr-2 h-5 w-5" />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center w-full h-12 px-6 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
