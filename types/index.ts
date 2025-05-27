export interface PortfolioImage {
  src: string
  alt: string
  width: number
  height: number
  thumbnail: string
}

export interface Testimonial {
  name: string
  role: string
  quote: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
  projectType: string
}

export interface ContactFormErrors {
  [key: string]: string
}
