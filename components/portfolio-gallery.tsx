"use client"

import { useState } from "react"
import Image from "next/image"
import { Lightbox, type LightboxImage } from "@/components/lightbox"
import { StaggeredChildren } from "@/components/animations"

interface PortfolioGalleryProps {
  images: Array<LightboxImage & { thumbnail: string }>
}

export function PortfolioGallery({ images }: PortfolioGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  return (
    <>
      <StaggeredChildren className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
        {images.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl shadow-md group cursor-pointer"
            onClick={() => openLightbox(index)}
            role="button"
            tabIndex={0}
            aria-label={`View larger image of ${image.alt}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                openLightbox(index)
              }
            }}
          >
            <div className="relative">
              <Image
                src={image.thumbnail || "/placeholder.svg"}
                width={600}
                height={400}
                alt={image.alt}
                className="aspect-[4/3] object-cover w-full transition-transform duration-300 group-hover:scale-105"
              />
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
