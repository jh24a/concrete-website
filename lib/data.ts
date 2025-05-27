import type { PortfolioImage, Testimonial } from "@/types"

export const portfolioImages: PortfolioImage[] = [
  {
    src: "/placeholder.svg?height=800&width=1200&text=Project+1",
    alt: "Polished concrete floor in a modern living room",
    width: 1200,
    height: 800,
    thumbnail: "/placeholder.svg?height=400&width=600&text=Project+1",
  },
  {
    src: "/placeholder.svg?height=800&width=1200&text=Project+2",
    alt: "Epoxy coating in an industrial facility",
    width: 1200,
    height: 800,
    thumbnail: "/placeholder.svg?height=400&width=600&text=Project+2",
  },
  {
    src: "/placeholder.svg?height=800&width=1200&text=Project+3",
    alt: "Decorative concrete overlay in a retail space",
    width: 1200,
    height: 800,
    thumbnail: "/placeholder.svg?height=400&width=600&text=Project+3",
  },
  {
    src: "/placeholder.svg?height=800&width=1200&text=Project+4",
    alt: "Stained concrete floor in a restaurant",
    width: 1200,
    height: 800,
    thumbnail: "/placeholder.svg?height=400&width=600&text=Project+4",
  },
  {
    src: "/placeholder.svg?height=800&width=1200&text=Project+5",
    alt: "Concrete floor with custom patterns in a hotel lobby",
    width: 1200,
    height: 800,
    thumbnail: "/placeholder.svg?height=400&width=600&text=Project+5",
  },
  {
    src: "/placeholder.svg?height=800&width=1200&text=Project+6",
    alt: "Polished concrete in a modern office space",
    width: 1200,
    height: 800,
    thumbnail: "/placeholder.svg?height=400&width=600&text=Project+6",
  },
]

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    quote:
      "The team transformed our old garage floor into a beautiful, durable surface. Extremely professional and the results exceeded our expectations.",
  },
  {
    name: "Mark Davis",
    role: "Commercial Property Manager",
    quote:
      "We've used ConcreteFinish for multiple properties. Their work is consistently excellent, and they always complete projects on schedule.",
  },
  {
    name: "Jennifer Williams",
    role: "Restaurant Owner",
    quote:
      "The decorative concrete flooring they installed in our restaurant has received countless compliments from customers. Durable and beautiful!",
  },
]

export const companyFeatures = [
  "Licensed & Insured",
  "Experienced Craftsmen",
  "Premium Materials",
  "On-Time Completion",
]
