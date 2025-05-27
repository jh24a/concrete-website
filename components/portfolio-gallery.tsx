"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import Image from "next/image"
import { Lightbox, type LightboxImage } from "@/components/lightbox"
import { StaggeredChildren } from "@/components/animations"
import { ImageSkeleton } from "@/components/loading-skeleton"

interface PortfolioGalleryProps {
  images: Array<LightboxImage & { thumbnail: string }>
}

export function PortfolioGallery({ images }: PortfolioGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loadingImages, setLoadingImages] = useState<Set<number>>(
    new Set(Array.from({ length: images.length }, (_, i) => i)),
  )
  const [errorImages, setErrorImages] = useState<Set<number>>(new Set())
  const galleryRef = useRef<HTMLDivElement>(null)

  const openLightbox = useCallback((index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    // Return focus to the gallery item that was clicked
    const galleryItems = galleryRef.current?.querySelectorAll('[role="button"]')
    const currentItem = galleryItems?.[currentImageIndex] as HTMLElement
    currentItem?.focus()
  }, [currentImageIndex])

  const handleImageLoad = useCallback((index: number) => {
    setLoadingImages((prev) => {
      const newSet = new Set(prev)
      newSet.delete(index)
      return newSet
    })
  }, [])

  const handleImageError = useCallback((index: number) => {
    setLoadingImages((prev) => {
      const newSet = new Set(prev)
      newSet.delete(index)
      return newSet
    })
    setErrorImages((prev) => new Set(prev).add(index))
  }, [])

  // Handle keyboard navigation in gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) return // Don't handle gallery navigation when lightbox is open

      const galleryItems = galleryRef.current?.querySelectorAll('[role="button"]')
      if (!galleryItems) return

      const currentFocus = document.activeElement
      const currentIndex = Array.from(galleryItems).indexOf(currentFocus as Element)

      if (currentIndex === -1) return

      let nextIndex = currentIndex

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault()
          nextIndex = (currentIndex + 1) % galleryItems.length
          break
        case "ArrowLeft":
          e.preventDefault()
          nextIndex = currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1
          break
        case "ArrowDown":
          e.preventDefault()
          // Move to next row (assuming 3 columns on large screens)
          nextIndex = Math.min(currentIndex + 3, galleryItems.length - 1)
          break
        case "ArrowUp":
          e.preventDefault()
          // Move to previous row
          nextIndex = Math.max(currentIndex - 3, 0)
          break
        case "Home":
          e.preventDefault()
          nextIndex = 0
          break
        case "End":
          e.preventDefault()
          nextIndex = galleryItems.length - 1
          break
        case "Enter":
        case " ":
          e.preventDefault()
          openLightbox(currentIndex)
          return
      }
      ;(galleryItems[nextIndex] as HTMLElement)?.focus()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, openLightbox])

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500 text-lg">No images to display</p>
      </div>
    )
  }

  return (
    <>
      <StaggeredChildren
        ref={galleryRef}
        className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12"
        role="grid"
        aria-label="Portfolio gallery"
      >
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="overflow-hidden rounded-xl shadow-md group cursor-pointer focus-within:ring-2 focus-within:ring-gray-500 focus-within:ring-offset-2"
            role="gridcell"
          >
            <div
              className="relative focus:outline-none"
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              aria-label={`View larger image of ${image.alt}. Press Enter or Space to open.`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  openLightbox(index)
                }
              }}
            >
              {loadingImages.has(index) && (
                <div className="absolute inset-0 z-10">
                  <ImageSkeleton />
                </div>
              )}

              {errorImages.has(index) ? (
                <div className="aspect-[4/3] flex items-center justify-center bg-gray-100 text-gray-500">
                  <div className="text-center">
                    <p className="text-sm">Failed to load image</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setErrorImages((prev) => {
                          const newSet = new Set(prev)
                          newSet.delete(index)
                          return newSet
                        })
                        setLoadingImages((prev) => new Set(prev).add(index))
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              ) : (
                <Image
                  src={image.thumbnail || "/placeholder.svg"}
                  width={600}
                  height={400}
                  alt={image.alt}
                  className="aspect-[4/3] object-cover w-full transition-transform duration-300 group-hover:scale-105"
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageError(index)}
                  loading={index < 6 ? "eager" : "lazy"} // Load first 6 images eagerly
                />
              )}

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="bg-white/90 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
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
                    <path d="M15 3h6v6" />
                    <path d="M10 14 21 3" />
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </StaggeredChildren>

      <Lightbox images={images} initialIndex={currentImageIndex} isOpen={lightboxOpen} onClose={closeLightbox} />
    </>
  )
}
