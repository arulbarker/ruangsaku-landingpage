'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface PhoneScreenProps {
  children: ReactNode
  active: boolean
}

export function PhoneScreen({ children, active }: PhoneScreenProps) {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: active ? 1 : 0,
        y: active ? 0 : 12,
        scale: active ? 1 : 0.97,
      }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: active ? 'auto' : 'none',
      }}
      aria-hidden={!active}
    >
      {children}
    </motion.div>
  )
}
