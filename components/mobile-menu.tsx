"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        className="relative z-50 h-10 w-10"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
        onClick={closeMenu}
      />

      {/* Mobile menu panel */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`fixed inset-y-0 right-0 z-40 w-full max-w-xs bg-white p-8 shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col space-y-8 mt-12">
          <Link
            href="#services"
            className="text-xl font-medium border-b border-gray-100 pb-3 hover:text-gray-900"
            onClick={closeMenu}
          >
            Services
          </Link>
          <Link
            href="#portfolio"
            className="text-xl font-medium border-b border-gray-100 pb-3 hover:text-gray-900"
            onClick={closeMenu}
          >
            Portfolio
          </Link>
          <Link
            href="#about"
            className="text-xl font-medium border-b border-gray-100 pb-3 hover:text-gray-900"
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            href="#testimonials"
            className="text-xl font-medium border-b border-gray-100 pb-3 hover:text-gray-900"
            onClick={closeMenu}
          >
            Testimonials
          </Link>
          <Link
            href="#contact"
            className="text-xl font-medium border-b border-gray-100 pb-3 hover:text-gray-900"
            onClick={closeMenu}
          >
            Contact
          </Link>
          <Link
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-base font-medium text-white shadow-md transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 w-full mt-4"
            onClick={closeMenu}
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </div>
  )
}
