"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { type ReactNode, useEffect, useState, Children, isValidElement, type CSSProperties } from "react"

interface AnimationProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  threshold?: number
  rootMargin?: string
}

interface StaggeredChildrenProps extends AnimationProps {
  staggerDelay?: number
  initialDelay?: number
}

// Helper to check if user prefers reduced motion
function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check if window is available (SSR safety)
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    // Use the newer addEventListener if available, fallback to addListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [])

  return prefersReducedMotion
}

function getAnimationStyles(
  isInView: boolean,
  prefersReducedMotion: boolean,
  duration: number,
  delay: number,
  transform: { visible: string; hidden: string },
): CSSProperties {
  if (prefersReducedMotion) {
    return { opacity: 1, transform: transform.visible }
  }

  return {
    opacity: isInView ? 1 : 0,
    transform: isInView ? transform.visible : transform.hidden,
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
    transitionDelay: `${delay}ms`,
  }
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

  const styles = getAnimationStyles(isInView, prefersReducedMotion, duration, delay, {
    visible: "translateY(0)",
    hidden: "translateY(20px)",
  })

  return (
    <div ref={ref} className={cn(className)} style={styles}>
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

  const styles = getAnimationStyles(isInView, prefersReducedMotion, duration, delay, {
    visible: "translateX(0)",
    hidden: "translateX(-50px)",
  })

  return (
    <div ref={ref} className={cn(className)} style={styles}>
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

  const styles = getAnimationStyles(isInView, prefersReducedMotion, duration, delay, {
    visible: "translateX(0)",
    hidden: "translateX(50px)",
  })

  return (
    <div ref={ref} className={cn(className)} style={styles}>
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

  const styles = getAnimationStyles(isInView, prefersReducedMotion, duration, delay, {
    visible: "scale(1)",
    hidden: "scale(0.95)",
  })

  return (
    <div ref={ref} className={cn(className)} style={styles}>
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
}: StaggeredChildrenProps) {
  const { ref, isInView } = useInView({ threshold, rootMargin })
  const prefersReducedMotion = usePrefersReducedMotion()

  // Safely convert children to array and filter valid elements
  const childrenArray = Children.toArray(children).filter(isValidElement)

  if (childrenArray.length === 0) {
    return <div ref={ref} className={cn(className)} />
  }

  return (
    <div ref={ref} className={cn(className)}>
      {childrenArray.map((child, index) => {
        const styles = getAnimationStyles(
          isInView,
          prefersReducedMotion,
          duration,
          initialDelay + index * staggerDelay,
          {
            visible: "translateY(0)",
            hidden: "translateY(20px)",
          },
        )

        return (
          <div key={child.key || index} style={styles}>
            {child}
          </div>
        )
      })}
    </div>
  )
}
