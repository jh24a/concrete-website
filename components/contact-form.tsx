"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Loader2 } from "lucide-react"

export function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    projectType: "Residential",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formState.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formState.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      try {
        // Formbricks submission
        const response = await fetch("https://app.formbricks.com/api/v1/client/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formId: "YOUR_FORMBRICKS_FORM_ID", // Replace with your actual Formbricks form ID
            data: {
              name: formState.name,
              email: formState.email,
              phone: formState.phone,
              projectType: formState.projectType,
              message: formState.message,
            },
          }),
        })

        if (response.ok) {
          // Show success message
          setIsSubmitted(true)

          // Reset form
          setFormState({
            name: "",
            email: "",
            phone: "",
            message: "",
            projectType: "Residential",
          })
        } else {
          console.error("Form submission failed")
          alert("There was an error submitting your form. Please try again later.")
        }
      } catch (error) {
        console.error("Form submission error:", error)
        alert("There was an error submitting your form. Please try again later.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-white p-8 shadow-md">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold">Thank You!</h3>
        <p className="text-center text-gray-600 max-w-md">
          Your message has been sent successfully. We'll get back to you as soon as possible to discuss your concrete
          flooring project.
        </p>
        <Button onClick={() => setIsSubmitted(false)} className="mt-4">
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border bg-white p-8 shadow-md">
      <div className="grid gap-2">
        <Label htmlFor="name" className="text-base font-medium">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Your name"
          value={formState.name}
          onChange={handleChange}
          className={`p-3 text-base ${errors.name ? "border-red-500" : ""}`}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email" className="text-base font-medium">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Your email"
          value={formState.email}
          onChange={handleChange}
          className={`p-3 text-base ${errors.email ? "border-red-500" : ""}`}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone" className="text-base font-medium">
          Phone
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Your phone number"
          value={formState.phone}
          onChange={handleChange}
          className={`p-3 text-base ${errors.phone ? "border-red-500" : ""}`}
        />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
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
          className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Industrial">Industrial</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message" className="text-base font-medium">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your project"
          value={formState.message}
          onChange={handleChange}
          className={`p-3 text-base ${errors.message ? "border-red-500" : ""}`}
          rows={4}
        />
        {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
      </div>
      <Button type="submit" className="w-full h-12 text-base font-medium" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Request"
        )}
      </Button>
      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to our privacy policy and terms of service.
      </p>
    </form>
  )
}
