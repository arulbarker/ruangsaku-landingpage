'use client'

import { ReactNode, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotionSafe } from '@/components/animation/useReducedMotionSafe'

interface ChapterTransitionProps {
  fromColor: string
  toColor: string
  children?: ReactNode
}

export function ChapterTransition({ fromColor, toColor, children }: ChapterTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { reduced } = useReducedMotionSafe()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const background = useTransform(scrollYProgress, [0, 1], [fromColor, toColor])

  return (
    <motion.div
      ref={ref}
      style={{
        background: reduced ? toColor : background,
        minHeight: '60vh',
        position: 'relative',
      }}
    >
      {children}
    </motion.div>
  )
}
