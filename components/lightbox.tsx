"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface LightboxImage {
  src: string
  alt: string
  width: number
  height: number
}

interface LightboxProps {
  images: LightboxImage[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

export function Lightbox({ images, initialIndex, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isAnimating, setIsAnimating] = useState(false)

  const currentImage = images[currentIndex]

  const handlePrevious = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
    setTimeout(() => setIsAnimating(false), 300)
  }, [images.length, isAnimating])

  const handleNext = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    setTimeout(() => setIsAnimating(false), 300)
  }, [images.length, isAnimating])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          handlePrevious()
          break
        case "ArrowRight":
          handleNext()
          break
        case "Escape":
          onClose()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, handlePrevious, handleNext, onClose])

  // Prevent scrolling when lightbox is open
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

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Previous button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 z-50 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
        onClick={(e) => {
          e.stopPropagation()
          handlePrevious()
        }}
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      {/* Next button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 z-50 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
        onClick={(e) => {
          e.stopPropagation()
          handleNext()
        }}
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Image container */}
      <div
        className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cn("transition-opacity duration-300", isAnimating ? "opacity-50" : "opacity-100")}>
          <Image
            src={currentImage.src || "/placeholder.svg"}
            alt={currentImage.alt}
            width={currentImage.width}
            height={currentImage.height}
            className="h-auto max-h-[90vh] w-auto max-w-[90vw] object-contain"
            priority
          />
        </div>

        {/* Image counter */}
        <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm bg-black/50 py-2">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  )
}
