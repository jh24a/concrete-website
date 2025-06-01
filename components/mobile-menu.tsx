"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { NAVIGATION_ITEMS } from "@/lib/constants"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

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
        closeMenu()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  // Prevent scrolling when menu is open and fix horizontal scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    // Always prevent horizontal scrolling
    document.body.style.overflowX = "hidden"
    document.documentElement.style.overflowX = "hidden"

    return () => {
      document.body.style.overflow = ""
      document.body.style.overflowX = ""
      document.documentElement.style.overflowX = ""
    }
  }, [isOpen])

  // Focus management
  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      // Focus first link when menu opens
      setTimeout(() => {
        firstLinkRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  const openMenu = useCallback(() => {
    setIsVisible(true)
    setTimeout(() => {
      setIsOpen(true)
    }, 10)
  }, [])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => {
      setIsVisible(false)
      // Return focus to menu button
      buttonRef.current?.focus()
    }, 300)
  }, [])

  const toggleMenu = useCallback(() => {
    if (isOpen) {
      closeMenu()
    } else {
      openMenu()
    }
  }, [isOpen, openMenu, closeMenu])

  const handleLinkClick = useCallback(() => {
    closeMenu()
  }, [closeMenu])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, closeMenu])

  return (
    <div className="md:hidden">
      {/* Hamburger Menu Button */}
      <button
        ref={buttonRef}
        className="relative z-[60] p-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-md transition-colors"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-haspopup="true"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Render overlay and menu when visible */}
      {isVisible && (
        <>
          {/* Mobile Menu Overlay - Higher z-index to cover header */}
          <div
            className={cn("fixed inset-0 transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-0")}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 45,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100vw",
              height: "100vh",
              position: "fixed",
            }}
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Mobile Menu Panel - Completely Solid White */}
          <div
            ref={menuRef}
            id="mobile-menu"
            className={cn(
              "fixed top-0 right-0 h-full w-80 max-w-[90vw] transition-transform duration-300 ease-in-out",
              isOpen ? "translate-x-0" : "translate-x-full",
            )}
            style={{
              backgroundColor: "#ffffff",
              zIndex: 50,
              position: "fixed",
              boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.15)",
              border: "none",
              backdropFilter: "none",
              WebkitBackdropFilter: "none",
            }}
            onClick={(e) => e.stopPropagation()}
            role="navigation"
            aria-label="Mobile navigation"
          >
            {/* Menu Header */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderBottom: "1px solid #e5e7eb",
                minHeight: "80px",
                display: "flex",
                alignItems: "center",
                padding: "24px",
              }}
            >
              <span style={{ fontSize: "20px", fontWeight: "bold", color: "#111827" }}>Menu</span>
            </div>

            {/* Menu Content */}
            <div
              style={{
                backgroundColor: "#ffffff",
                height: "calc(100vh - 80px)",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                padding: "24px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
                {NAVIGATION_ITEMS.map((item, index) => (
                  <Link
                    key={item.href}
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    style={{
                      display: "block",
                      padding: "16px",
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "#111827",
                      textDecoration: "none",
                      borderRadius: "6px",
                      borderBottom: "1px solid #f3f4f6",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f9fafb"
                      e.currentTarget.style.color = "#6b7280"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent"
                      e.currentTarget.style.color = "#111827"
                    }}
                    onClick={handleLinkClick}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* CTA Button */}
              <div style={{ paddingTop: "32px", borderTop: "1px solid #e5e7eb" }}>
                <Link
                  href="#contact"
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                    padding: "16px 24px",
                    backgroundColor: "#111827",
                    color: "#ffffff",
                    borderRadius: "6px",
                    fontWeight: "500",
                    textDecoration: "none",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#374151"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#111827"
                  }}
                  onClick={handleLinkClick}
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
