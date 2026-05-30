import { useReducedMotion, type Variants } from 'framer-motion'

const INSTANT_FADE: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
}

export function useReducedMotionSafe() {
  const reduced = useReducedMotion() ?? false

  return {
    reduced,
    variants: (full: Variants, reducedVariant: Variants = INSTANT_FADE): Variants =>
      reduced ? reducedVariant : full,
    duration: (full: number): number => (reduced ? 0 : full),
  }
}
