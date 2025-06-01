  /* This is a template for what 'constant.ts' should look like.
   * Fill this in with your own details and rename to 'constants.ts' .
   * (it is importeted in many files of the components folder 
   *  - if you want to run website immediately, just renamte this file to 'constants.ts', but it is 
   *  recommended to make a new file and copy the template to fill in).
  */

export const COMPANY_INFO = {
  name: "ConcreteFinish",
  tagline: "Premium Concrete Floor Finishes",
  description:
    "Transform your space with our expert concrete finishing services. Durable, beautiful, and customized to your specific needs.",
  phone: "(555) 123-4567",
  email: "info@concretefinish.com",
  website: "https://thecompanywebsite.com", //must include protocol (http:// or https://)
  address: "123 Construction Way, Building City, ST 12345",
  street: "123 Construction Way",
  building: "Building Name", //optional, can be left empty if not applicable 
  city: "Building City",
  state: "ST",
  zip: "12345",
  country: "US", // Country Code (2-letter ISO 3166-1 alpha-2 code)
  logo: "/images/logo.png", //relative path to the logo image
  favicon: "/images/favicon.ico", //relative path to the favicon image
  socialMedia: {
    facebook: "https://www.facebook.com/concretefinish",
    instagram: "https://www.instagram.com/concretefinish",
    twitter: "https://www.twitter.com/concretefinish",
  },
  hours: {
    weekdays: "Monday - Friday: 8am - 5pm", 
    saturday: "Saturday: 9am - 2pm",
    sunday: "Sunday: Closed",
  },
  founded: 1998, 
  experience: new Date().getFullYear() - 1998,
} as const

export const FORMSPREE_ENDPOINT = "https://formspree.io/f/yourformID" as const

export const NAVIGATION_ITEMS = [
  { href: "#services", label: "Services" }, 
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "About" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
] as const

export const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "#",
    icon: "facebook",
    ariaLabel: "Follow us on Facebook",
  },
  {
    name: "Instagram",
    href: "#",
    icon: "instagram",
    ariaLabel: "Follow us on Instagram",
  },
  {
    name: "Twitter",
    href: "#",
    icon: "twitter",
    ariaLabel: "Follow us on Twitter",
  },
] as const

export const PROJECT_TYPES = [
  { value: "Residential", label: "Residential" },
  { value: "Commercial", label: "Commercial" },
  { value: "Industrial", label: "Industrial" },
  { value: "Other", label: "Other" },
] as const

export const SERVICES = [
  {
    title: "Polished Concrete",
    description: "Achieve a high-gloss, mirror-like finish that enhances the natural beauty of concrete.",
    icon: "polish",
  },
  {
    title: "Epoxy Coatings",
    description: "Durable, chemical-resistant floors ideal for garages, industrial spaces, and commercial facilities.",
    icon: "coating",
  },
  {
    title: "Decorative Overlays",
    description: "Custom patterns, textures, and colors to create unique and artistic concrete surfaces.",
    icon: "decorative",
  },
] as const

export const ANIMATION_DEFAULTS = {
  duration: 500,
  delay: 0,
  threshold: 0.1,
  rootMargin: "0px",
  staggerDelay: 100,
} as const
