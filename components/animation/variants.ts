import type { Variants } from 'framer-motion'

const APPLE_EASE = [0.2, 0.8, 0.2, 1] as const

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: APPLE_EASE },
  },
}

export const stagger = (delayBase: number = 0.1): Variants => ({
  visible: { transition: { staggerChildren: delayBase } },
})

export const wordReveal: Variants = {
  hidden: { opacity: 0.18, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export const phoneEntrance: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: APPLE_EASE },
  },
}

// Avatar entrance — Chapter 03 Rindu reveal
export const avatarEntrance: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1.0, ease: APPLE_EASE },
  },
}

// Pain card slide-in — Chapter 02
export const painSlideIn: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: APPLE_EASE },
  },
}

// Chat bubble entry — Chapter 03
export const chatBubbleIn: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: APPLE_EASE },
  },
}

// Kinetic word reveal — Chapter 05
export const kineticWord: Variants = {
  hidden: { opacity: 0.2, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: APPLE_EASE },
  },
}
