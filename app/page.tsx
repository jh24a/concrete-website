import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin, Clock, ArrowRight, Check } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { MobileMenu } from "@/components/mobile-menu"
import { ErrorBoundary } from "@/components/error-boundary"
import { FadeIn, SlideInLeft, SlideInRight, StaggeredChildren } from "@/components/animations"
import { PortfolioGallery } from "@/components/portfolio-gallery"
import { portfolioImages, testimonials, companyFeatures } from "@/lib/data"
import { COMPANY_INFO, NAVIGATION_ITEMS } from "@/lib/constants"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `${COMPANY_INFO.name} - ${COMPANY_INFO.tagline}`,
  description: COMPANY_INFO.description,
  openGraph: {
    title: `${COMPANY_INFO.name} - ${COMPANY_INFO.tagline}`,
    description: COMPANY_INFO.description,
    url: COMPANY_INFO.website, 
    siteName: COMPANY_INFO.name,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${COMPANY_INFO.name} - Premium Concrete Floor Finishes`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_INFO.name} - ${COMPANY_INFO.tagline}`,
    description: COMPANY_INFO.description,
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: COMPANY_INFO.website,
  },
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-gray-900 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      {/* Header - Fixed sticky positioning */}
      <header className="fixed top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm shadow-sm">
        <div className="container flex h-20 items-center justify-between px-4 md:px-6">
          <Link
            href="/"
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-md"
          >
            <span className="text-2xl font-bold tracking-tight">{COMPANY_INFO.name}</span>
          </Link>
          <nav className="hidden md:flex gap-8" role="navigation" aria-label="Main navigation">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium text-gray-700 hover:text-gray-900 hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="#contact"
              className="hidden md:inline-flex h-11 items-center justify-center rounded-md bg-gray-900 px-6 py-2 text-base font-medium text-gray-50 shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950"
            >
              Get a Quote
            </Link>
            <MobileMenu />
          </div>
        </div>
      </header>

      {/* Add padding-top to account for fixed header */}
      <main id="main-content" className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <SlideInLeft>
                <div className="space-y-6">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                    {COMPANY_INFO.tagline}
                  </h1>
                  <p className="text-gray-600 text-lg md:text-xl max-w-[600px]">{COMPANY_INFO.description}</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="#contact"
                      className="inline-flex h-12 items-center justify-center rounded-md bg-gray-900 px-8 text-base font-medium text-white shadow-md transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950"
                    >
                      Get a Free Quote
                    </Link>
                    <Link
                      href="#portfolio"
                      className="inline-flex h-12 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-base font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950"
                    >
                      View Our Work
                    </Link>
                  </div>
                </div>
              </SlideInLeft>
              <SlideInRight>
                <div className="mx-auto w-full max-w-[600px] overflow-hidden rounded-xl shadow-xl">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    width={800}
                    height={600}
                    alt="Polished concrete floor in a modern space showcasing our premium finishing work"
                    className="aspect-[4/3] object-cover w-full"
                    priority
                  />
                </div>
              </SlideInRight>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <FadeIn>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2 max-w-[800px]">
                  <div className="inline-block rounded-lg bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-800">
                    Our Services
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    Expert Concrete Solutions
                  </h2>
                  <p className="text-gray-600 text-lg md:text-xl">
                    We offer a comprehensive range of concrete floor finishing services to meet your specific needs.
                  </p>
                </div>
              </div>
            </FadeIn>
            <StaggeredChildren className="mx-auto grid max-w-6xl items-center gap-8 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <article className="grid gap-4 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10"
                    aria-hidden="true"
                  >
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                    <path d="M16 16h5v5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center">Polished Concrete</h3>
                <p className="text-gray-600 text-center">
                  Achieve a high-gloss, mirror-like finish that enhances the natural beauty of concrete.
                </p>
              </article>
              <article className="grid gap-4 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10"
                    aria-hidden="true"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center">Epoxy Coatings</h3>
                <p className="text-gray-600 text-center">
                  Durable, chemical-resistant floors ideal for garages, industrial spaces, and commercial facilities.
                </p>
              </article>
              <article className="grid gap-4 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10"
                    aria-hidden="true"
                  >
                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                    <path d="M7 2v20" />
                    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center">Decorative Overlays</h3>
                <p className="text-gray-600 text-center">
                  Custom patterns, textures, and colors to create unique and artistic concrete surfaces.
                </p>
              </article>
            </StaggeredChildren>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="w-full py-16 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <FadeIn>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2 max-w-[800px]">
                  <div className="inline-block rounded-lg bg-white px-4 py-1.5 text-sm font-medium text-gray-800">
                    Our Portfolio
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    Showcasing Our Finest Work
                  </h2>
                  <p className="text-gray-600 text-lg md:text-xl">
                    Browse through our gallery of completed projects to see the quality and craftsmanship we deliver.
                    <span className="block mt-2 text-gray-500 text-base italic">Click on any image to view larger</span>
                  </p>
                </div>
              </div>
            </FadeIn>

            <ErrorBoundary>
              <PortfolioGallery images={portfolioImages} />
            </ErrorBoundary>

            <FadeIn delay={300}>
              <div className="flex justify-center mt-12">
                <Link
                  href="#contact"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-gray-900 px-8 text-base font-medium text-white shadow-md transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950"
                >
                  Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <SlideInLeft>
                <div className="space-y-5">
                  <div className="inline-block rounded-lg bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-800">
                    About Us
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    {COMPANY_INFO.experience}+ Years of Excellence in Concrete Finishing
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Founded in {COMPANY_INFO.founded}, {COMPANY_INFO.name} has been delivering exceptional concrete
                    floor solutions to residential and commercial clients. Our team of skilled professionals is
                    committed to quality, innovation, and customer satisfaction.
                  </p>
                  <StaggeredChildren className="grid gap-3" staggerDelay={150}>
                    {companyFeatures.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
                          <Check className="h-4 w-4 text-gray-900" />
                        </div>
                        <span className="text-gray-700 text-lg">{item}</span>
                      </li>
                    ))}
                  </StaggeredChildren>
                </div>
              </SlideInLeft>
              <SlideInRight>
                <div className="mx-auto w-full max-w-[600px] overflow-hidden rounded-xl shadow-xl">
                  <Image
                    src="/placeholder.svg?height=600&width=800&text=Our+Team"
                    width={800}
                    height={600}
                    alt="Our experienced team of concrete finishing professionals at work"
                    className="aspect-[4/3] object-cover w-full"
                  />
                </div>
              </SlideInRight>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-16 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <FadeIn>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2 max-w-[800px]">
                  <div className="inline-block rounded-lg bg-white px-4 py-1.5 text-sm font-medium text-gray-800">
                    Testimonials
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">What Our Clients Say</h2>
                  <p className="text-gray-600 text-lg md:text-xl">
                    Don't just take our word for it. Hear from our satisfied customers about their experience working
                    with us.
                  </p>
                </div>
              </div>
            </FadeIn>
            <StaggeredChildren className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
              {testimonials.map((testimonial, index) => (
                <article
                  key={`${testimonial.name}-${index}`}
                  className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                      <span className="text-base font-medium" aria-hidden="true">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-600 italic">"{testimonial.quote}"</blockquote>
                </article>
              ))}
            </StaggeredChildren>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <FadeIn>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2 max-w-[800px]">
                  <div className="inline-block rounded-lg bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-800">
                    Contact Us
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    Get Your Free Consultation
                  </h2>
                  <p className="text-gray-600 text-lg md:text-xl">
                    Ready to transform your floors? Reach out to us for a free quote and consultation.
                  </p>
                </div>
              </div>
            </FadeIn>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 lg:grid-cols-2 lg:gap-12">
              <SlideInLeft>
                <ErrorBoundary>
                  <ContactForm />
                </ErrorBoundary>
              </SlideInLeft>
              <SlideInRight>
                <div className="space-y-8">
                  <div className="grid gap-3">
                    <h3 className="text-2xl font-bold">Our Information</h3>
                    <p className="text-gray-600 text-lg">
                      Feel free to reach out to us directly using the contact information below.
                    </p>
                  </div>
                  <StaggeredChildren className="grid gap-6" staggerDelay={150}>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                        <Phone className="h-5 w-5 text-gray-900" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Phone</h4>
                        <p className="text-gray-600">
                          <a
                            href={`tel:${COMPANY_INFO.phone.replace(/[^\d+]/g, "")}`}
                            className="hover:text-gray-900 transition-colors"
                          >
                            {COMPANY_INFO.phone}
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                        <Mail className="h-5 w-5 text-gray-900" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Email</h4>
                        <p className="text-gray-600">
                          <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-gray-900 transition-colors">
                            {COMPANY_INFO.email}
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                        <MapPin className="h-5 w-5 text-gray-900" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Address</h4>
                        <p className="text-gray-600">{COMPANY_INFO.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                        <Clock className="h-5 w-5 text-gray-900" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Hours</h4>
                        <p className="text-gray-600">{COMPANY_INFO.hours.weekdays}</p>
                        <p className="text-gray-600">{COMPANY_INFO.hours.saturday}</p>
                      </div>
                    </div>
                  </StaggeredChildren>
                </div>
              </SlideInRight>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-gray-50 py-12">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 md:px-6 md:flex-row md:justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold tracking-tight">{COMPANY_INFO.name}</span>
          </div>
          <p className="text-center text-gray-600 md:text-left">
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-md transition-colors"
              aria-label="Follow us on Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-md transition-colors"
              aria-label="Follow us on Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-md transition-colors"
              aria-label="Follow us on Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
