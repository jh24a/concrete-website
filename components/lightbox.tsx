"use client"

import { useState, useEffect, useCallback, useRef } from "react"
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

// Focus trap hook
function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    container.addEventListener("keydown", handleTabKey)
    firstElement?.focus()

    return () => {
      container.removeEventListener("keydown", handleTabKey)
    }
  }, [isActive])

  return containerRef
}

export function Lightbox({ images, initialIndex, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isAnimating, setIsAnimating] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set())

  const containerRef = useFocusTrap(isOpen)
  const currentImage = images[currentIndex]

  // Preload adjacent images
  const preloadImage = useCallback(
    (src: string) => {
      if (preloadedImages.has(src)) return

      const img = new window.Image()
      img.onload = () => {
        setPreloadedImages((prev) => new Set(prev).add(src))
      }
      img.src = src
    },
    [preloadedImages],
  )

  // Update current index when initialIndex changes
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
      setImageError(false)
      setImageLoading(true)
    }
  }, [initialIndex, isOpen])

  // Preload current and adjacent images
  useEffect(() => {
    if (!isOpen || !currentImage) return

    // Preload current image
    preloadImage(currentImage.src)

    // Preload next and previous images
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1

    if (images[nextIndex]) preloadImage(images[nextIndex].src)
    if (images[prevIndex]) preloadImage(images[prevIndex].src)
  }, [currentIndex, images, isOpen, currentImage, preloadImage])

  const handlePrevious = useCallback(() => {
    if (isAnimating || images.length <= 1) return
    setIsAnimating(true)
    setImageError(false)
    setImageLoading(true)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
    setTimeout(() => setIsAnimating(false), 300)
  }, [images.length, isAnimating])

  const handleNext = useCallback(() => {
    if (isAnimating || images.length <= 1) return
    setIsAnimating(true)
    setImageError(false)
    setImageLoading(true)
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    setTimeout(() => setIsAnimating(false), 300)
  }, [images.length, isAnimating])

  const handleClose = useCallback(() => {
    if (!isAnimating) {
      onClose()
    }
  }, [onClose, isAnimating])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault()
          handlePrevious()
          break
        case "ArrowRight":
          e.preventDefault()
          handleNext()
          break
        case "Escape":
          e.preventDefault()
          handleClose()
          break
        case "Home":
          e.preventDefault()
          if (!isAnimating && images.length > 0) {
            setCurrentIndex(0)
            setImageError(false)
            setImageLoading(true)
          }
          break
        case "End":
          e.preventDefault()
          if (!isAnimating && images.length > 0) {
            setCurrentIndex(images.length - 1)
            setImageError(false)
            setImageLoading(true)
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, handlePrevious, handleNext, handleClose, isAnimating, images.length])

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

  if (!isOpen || !currentImage) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Image lightbox - ${currentImage.alt}`}
      aria-describedby="lightbox-instructions"
      tabIndex={-1}
    >
      {/* Instructions for screen readers */}
      <div id="lightbox-instructions" className="sr-only">
        Use arrow keys to navigate between images, Escape to close, Home for first image, End for last image. Current
        image: {currentIndex + 1} of {images.length}.
      </div>

      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-50 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70 focus-visible:ring-white"
        onClick={(e) => {
          e.stopPropagation()
          handleClose()
        }}
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Previous button */}
      {images.length > 1 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 z-50 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70 focus-visible:ring-white disabled:opacity-30"
          onClick={(e) => {
            e.stopPropagation()
            handlePrevious()
          }}
          disabled={isAnimating}
          aria-label={`Previous image (${currentIndex === 0 ? images.length : currentIndex} of ${images.length})`}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 z-50 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70 focus-visible:ring-white disabled:opacity-30"
          onClick={(e) => {
            e.stopPropagation()
            handleNext()
          }}
          disabled={isAnimating}
          aria-label={`Next image (${currentIndex === images.length - 1 ? 1 : currentIndex + 2} of ${images.length})`}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      )}

      {/* Image container */}
      <div
        className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cn("transition-opacity duration-300", isAnimating ? "opacity-50" : "opacity-100")}>
          {imageError ? (
            <div className="flex h-96 w-96 items-center justify-center bg-gray-100 text-gray-500">
              <div className="text-center">
                <p className="text-lg font-medium">Failed to load image</p>
                <p className="text-sm">Please try again later</p>
                <Button
                  onClick={() => {
                    setImageError(false)
                    setImageLoading(true)
                  }}
                  className="mt-4"
                  size="icon"
                >
                  Retry
                </Button>
              </div>
            </div>
          ) : (
            <>
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900"></div>
                </div>
              )}
              <Image
                src={currentImage.src || "/placeholder.svg"}
                alt={currentImage.alt}
                width={currentImage.width}
                height={currentImage.height}
                className="h-auto max-h-[90vh] w-auto max-w-[90vw] object-contain"
                priority
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageError(true)
                  setImageLoading(false)
                }}
              />
            </>
          )}
        </div>

        {/* Image counter and title */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
          <div className="text-center">
            <p className="text-sm font-medium">{currentImage.alt}</p>
            {images.length > 1 && (
              <p className="text-xs text-gray-300 mt-1">
                {currentIndex + 1} of {images.length}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
