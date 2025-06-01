"use client"

import type React from "react"
import { useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Loader2, AlertCircle } from "lucide-react"
import type { ContactFormData, ContactFormErrors } from "@/types"
import { FORMSPREE_ENDPOINT } from "@/lib/constants"

const initialFormState: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
  projectType: "Residential",
}

const PROJECT_TYPES = [
  { value: "Residential", label: "Residential" },
  { value: "Commercial", label: "Commercial" },
  { value: "Industrial", label: "Industrial" },
  { value: "Other", label: "Other" },
] as const

export function ContactForm() {
  const [formState, setFormState] = useState<ContactFormData>(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateField = useCallback((name: string, value: string): string | null => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required"
        if (value.trim().length < 2) return "Name must be at least 2 characters"
        if (value.trim().length > 50) return "Name must be less than 50 characters"
        if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) return "Name contains invalid characters"
        return null

      case "email":
        if (!value.trim()) return "Email is required"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Please enter a valid email address"
        if (value.length > 254) return "Email address is too long"
        return null

      case "phone":
        if (!value.trim()) return "Phone number is required"
        const phoneRegex = /^[+]?[1-9][\d]{0,15}$|^[+]?[(]?[\d\s\-$$$$]{10,}$/
        const cleanPhone = value.replace(/[\s\-$$$$]/g, "")
        if (!phoneRegex.test(cleanPhone)) return "Please enter a valid phone number"
        if (cleanPhone.length < 10) return "Phone number must be at least 10 digits"
        return null

      case "message":
        if (!value.trim()) return "Message is required"
        if (value.trim().length < 10) return "Message must be at least 10 characters"
        if (value.trim().length > 1000) return "Message must be less than 1000 characters"
        return null

      default:
        return null
    }
  }, [])

  const validateForm = useCallback((): boolean => {
    const newErrors: ContactFormErrors = {}

    Object.keys(formState).forEach((key) => {
      if (key !== "projectType") {
        const error = validateField(key, formState[key as keyof ContactFormData])
        if (error) {
          newErrors[key] = error
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formState, validateField])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target

      setFormState((prev) => ({
        ...prev,
        [name]: value,
      }))

      // Real-time validation for touched fields
      if (touched[name]) {
        const error = validateField(name, value)
        setErrors((prev) => ({
          ...prev,
          [name]: error || "",
        }))
      }
    },
    [touched, validateField],
  )

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target

      setTouched((prev) => ({ ...prev, [name]: true }))

      const error = validateField(name, value)
      setErrors((prev) => ({
        ...prev,
        [name]: error || "",
      }))
    },
    [validateField],
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    // Mark all fields as touched
    const allTouched = Object.keys(formState).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    setTouched(allTouched)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData();
          Object.entries(formState).forEach(([key, value]) => {
            formData.append(key, value);
          });

          const response = await fetch(FORMSPREE_ENDPOINT, {
            method: "POST",
            body: formData,
            headers: { Accept: "application/json" },
          });

          if (!response.ok) {
            throw new Error("Network error");
          }

      setIsSubmitted(true);
      setFormState(initialFormState);
      setTouched({});
      setErrors({});
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError("There was an error submitting your form. Please try again later.")
    } finally {
      setIsSubmitting(false);
    }
  }

  const resetForm = useCallback(() => {
    setIsSubmitted(false)
    setSubmitError(null)
    setErrors({})
    setTouched({})
    setFormState(initialFormState)
  }, [])


  const isFormValid = useMemo(() => {
    return (
      Object.values(errors).every((error) => !error) && Object.values(formState).every((value) => value.trim() !== "")
    )
  }, [errors, formState])

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-white p-8 shadow-md">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold">Thank You!</h3>
        <p className="text-center text-gray-600 max-w-md">
          Your message has been sent successfully. We'll get back to you within 24 hours to discuss your concrete
          flooring project.
        </p>
        <Button onClick={resetForm} className="mt-4">
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border bg-form p-8 shadow-md" noValidate>
      {submitError && (
        <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-red-700" role="alert">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">{submitError}</p>
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor="name" className="text-base font-medium">
          Name *
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Your full name"
          value={formState.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`p-3 text-base ${errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          autoComplete="name"
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-red-500" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email" className="text-base font-medium">
          Email *
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your.email@example.com"
          value={formState.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`p-3 text-base ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          autoComplete="email"
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-red-500" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phone" className="text-base font-medium">
          Phone *
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="(555) 123-4567"
          value={formState.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`p-3 text-base ${errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          autoComplete="tel"
        />
        {errors.phone && (
          <p id="phone-error" className="text-sm text-red-500" role="alert">
            {errors.phone}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="projectType" className="text-base font-medium">
          Project Type
        </Label>
        <select
          id="projectType"
          name="projectType"
          value={formState.projectType}
          onChange={handleChange}
          className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          aria-describedby="projectType-description"
        >
          {PROJECT_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <p id="projectType-description" className="text-sm text-gray-500">
          Select the type of project you need help with
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message" className="text-base font-medium">
          Message *
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your project, including size, timeline, and any specific requirements..."
          value={formState.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`p-3 text-base ${errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          rows={4}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : "message-description"}
        />
        {errors.message ? (
          <p id="message-error" className="text-sm text-red-500" role="alert">
            {errors.message}
          </p>
        ) : (
          <p id="message-description" className="text-sm text-gray-500">
            Please provide as much detail as possible about your project (10-1000 characters)
          </p>
        )}
      </div>

      <Button type="submit"
        className="w-full h-12 text-base font-medium"
        disabled={isSubmitting || !isFormValid}
        aria-describedby="submit-description"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Request"
        )}
      </Button>

      <p id="submit-description" className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to our privacy policy and terms of service. We'll respond within 24 hours.
      </p>
    </form>
  )
}
