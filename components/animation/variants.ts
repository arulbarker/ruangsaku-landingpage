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
