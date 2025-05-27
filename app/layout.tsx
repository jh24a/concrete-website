import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ErrorBoundary } from "@/components/error-boundary"
import { COMPANY_INFO } from "@/lib/constants"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://concretefinish.com"),
  title: {
    default: `${COMPANY_INFO.name} - ${COMPANY_INFO.tagline}`,
    template: `%s | ${COMPANY_INFO.name}`,
  },
  description: COMPANY_INFO.description,
  keywords: [
    "concrete flooring",
    "polished concrete",
    "epoxy coatings",
    "decorative concrete",
    "concrete finishing",
    "floor refinishing",
    "commercial flooring",
    "residential flooring",
    "industrial flooring",
    "concrete contractors",
    "floor polishing",
    "concrete staining",
    "garage floor coating",
    "warehouse flooring",
    "retail flooring",
    "restaurant flooring",
    "office flooring",
    "concrete repair",
    "floor restoration",
    "durable flooring",
  ],
  authors: [{ name: COMPANY_INFO.name, url: "https://concretefinish.com" }],
  creator: COMPANY_INFO.name,
  publisher: COMPANY_INFO.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://concretefinish.com",
    siteName: COMPANY_INFO.name,
    title: `${COMPANY_INFO.name} - ${COMPANY_INFO.tagline}`,
    description: COMPANY_INFO.description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${COMPANY_INFO.name} - Premium Concrete Floor Finishes`,
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: `${COMPANY_INFO.name} - Premium Concrete Floor Finishes`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_INFO.name} - ${COMPANY_INFO.tagline}`,
    description: COMPANY_INFO.description,
    images: ["/og-image.jpg"],
    creator: "@concretefinish",
    site: "@concretefinish",
  },
  alternates: {
    canonical: "https://concretefinish.com",
  },
  category: "Construction & Home Improvement",
  classification: "Business",
  other: {
    "business:contact_data:street_address": COMPANY_INFO.address,
    "business:contact_data:locality": "Building City",
    "business:contact_data:region": "ST",
    "business:contact_data:postal_code": "12345",
    "business:contact_data:country_name": "United States",
    "business:contact_data:email": COMPANY_INFO.email,
    "business:contact_data:phone_number": COMPANY_INFO.phone,
    "business:contact_data:website": "https://concretefinish.com",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="US-ST" />
        <meta name="geo.placename" content="Building City" />
        <meta name="geo.position" content="40.7128;-74.0060" />
        <meta name="ICBM" content="40.7128, -74.0060" />

        {/* Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://concretefinish.com/#business",
              name: COMPANY_INFO.name,
              description: COMPANY_INFO.description,
              url: "https://concretefinish.com",
              telephone: COMPANY_INFO.phone,
              email: COMPANY_INFO.email,
              foundingDate: COMPANY_INFO.founded.toString(),
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Construction Way",
                addressLocality: "Building City",
                addressRegion: "ST",
                postalCode: "12345",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "40.7128",
                longitude: "-74.0060",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "08:00",
                  closes: "17:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "09:00",
                  closes: "14:00",
                },
              ],
              serviceArea: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: "40.7128",
                  longitude: "-74.0060",
                },
                geoRadius: "50000", // 50km radius
              },
              priceRange: "$$",
              image: "https://concretefinish.com/og-image.jpg",
              logo: "https://concretefinish.com/logo.png",
              sameAs: [
                "https://www.facebook.com/concretefinish",
                "https://www.instagram.com/concretefinish",
                "https://twitter.com/concretefinish",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Concrete Finishing Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Polished Concrete",
                      description: "High-gloss, mirror-like finish that enhances the natural beauty of concrete",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Epoxy Coatings",
                      description: "Durable, chemical-resistant floors for garages, industrial and commercial spaces",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Decorative Overlays",
                      description: "Custom patterns, textures, and colors for unique concrete surfaces",
                    },
                  },
                ],
              },
            }),
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://concretefinish.com/#website",
              url: "https://concretefinish.com",
              name: COMPANY_INFO.name,
              description: COMPANY_INFO.description,
              publisher: {
                "@type": "Organization",
                "@id": "https://concretefinish.com/#business",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://concretefinish.com/?s={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://concretefinish.com/#organization",
              name: COMPANY_INFO.name,
              url: "https://concretefinish.com",
              logo: "https://concretefinish.com/logo.png",
              image: "https://concretefinish.com/og-image.jpg",
              description: COMPANY_INFO.description,
              telephone: COMPANY_INFO.phone,
              email: COMPANY_INFO.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Construction Way",
                addressLocality: "Building City",
                addressRegion: "ST",
                postalCode: "12345",
                addressCountry: "US",
              },
              sameAs: [
                "https://www.facebook.com/concretefinish",
                "https://www.instagram.com/concretefinish",
                "https://twitter.com/concretefinish",
              ],
            }),
          }}
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  )
}
