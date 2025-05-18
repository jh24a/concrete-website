"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { type ReactNode, useEffect, useState } from "react"

interface AnimationProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  threshold?: number
  rootMargin?: string
}

// Helper to check if user prefers reduced motion
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return prefersReducedMotion
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 500,
  threshold = 0.1,
  rootMargin = "0px",
}: AnimationProps) {
  const { ref, isInView } = useInView({ threshold, rootMargin })
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={
        prefersReducedMotion
          ? { opacity: 1 }
          : {
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(20px)",
              transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
              transitionDelay: `${delay}ms`,
            }
      }
    >
      {children}
    </div>
  )
}

export function SlideInLeft({
  children,
  className,
  delay = 0,
  duration = 500,
  threshold = 0.1,
  rootMargin = "0px",
}: AnimationProps) {
  const { ref, isInView } = useInView({ threshold, rootMargin })
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={
        prefersReducedMotion
          ? { opacity: 1 }
          : {
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateX(0)" : "translateX(-50px)",
              transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
              transitionDelay: `${delay}ms`,
            }
      }
    >
      {children}
    </div>
  )
}

export function SlideInRight({
  children,
  className,
  delay = 0,
  duration = 500,
  threshold = 0.1,
  rootMargin = "0px",
}: AnimationProps) {
  const { ref, isInView } = useInView({ threshold, rootMargin })
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={
        prefersReducedMotion
          ? { opacity: 1 }
          : {
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateX(0)" : "translateX(50px)",
              transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
              transitionDelay: `${delay}ms`,
            }
      }
    >
      {children}
    </div>
  )
}

export function ScaleIn({
  children,
  className,
  delay = 0,
  duration = 500,
  threshold = 0.1,
  rootMargin = "0px",
}: AnimationProps) {
  const { ref, isInView } = useInView({ threshold, rootMargin })
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={
        prefersReducedMotion
          ? { opacity: 1 }
          : {
              opacity: isInView ? 1 : 0,
              transform: isInView ? "scale(1)" : "scale(0.95)",
              transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
              transitionDelay: `${delay}ms`,
            }
      }
    >
      {children}
    </div>
  )
}

export function StaggeredChildren({
  children,
  className,
  staggerDelay = 100,
  initialDelay = 0,
  duration = 500,
  threshold = 0.1,
  rootMargin = "0px",
}: AnimationProps & { staggerDelay?: number; initialDelay?: number }) {
  const { ref, isInView } = useInView({ threshold, rootMargin })
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div ref={ref} className={cn(className)}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              style={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : {
                      opacity: isInView ? 1 : 0,
                      transform: isInView ? "translateY(0)" : "translateY(20px)",
                      transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
                      transitionDelay: `${initialDelay + index * staggerDelay}ms`,
                    }
              }
            >
              {child}
            </div>
          ))
        : children}
    </div>
  )
}
