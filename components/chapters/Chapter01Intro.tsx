'use client'

import { motion } from 'framer-motion'
import { useReducedMotionSafe } from '@/components/animation/useReducedMotionSafe'

export function Chapter01Intro() {
  const { reduced } = useReducedMotionSafe()

  return (
    <section
      id="ch-01"
      className="chapter-01"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2A1F4E 0%, #1E1535 100%)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '120px 24px 80px',
      }}
    >
      <motion.div
        aria-hidden="true"
        animate={
          reduced
            ? undefined
            : {
                background: [
                  'radial-gradient(circle at 30% 40%, rgba(91,63,160,0.25), transparent 60%)',
                  'radial-gradient(circle at 70% 60%, rgba(255,112,67,0.18), transparent 60%)',
                  'radial-gradient(circle at 30% 40%, rgba(91,63,160,0.25), transparent 60%)',
                ],
              }
        }
        transition={reduced ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      />

      <motion.h2
        className="ch01-headline"
        animate={
          reduced
            ? undefined
            : {
                fontVariationSettings: ['"wght" 300', '"wght" 700', '"wght" 300'],
                letterSpacing: ['-0.02em', '-0.04em', '-0.02em'],
              }
        }
        transition={reduced ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          fontSize: 'clamp(40px, 7vw, 84px)',
          textAlign: 'center',
          lineHeight: 1.05,
          maxWidth: '900px',
          fontWeight: reduced ? 600 : 300,
          letterSpacing: '-0.03em',
          position: 'relative',
          zIndex: 1,
        }}
      >
        Pernah ngerasa{' '}
        <strong
          style={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #B5A0FF, #FF8A65)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          duit habis
        </strong>
        ,
        <br />
        tapi nggak inget habis ke mana?
      </motion.h2>

      <motion.div
        className="scroll-hint"
        animate={reduced ? undefined : { y: [0, 6, 0] }}
        transition={reduced ? undefined : { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          marginTop: 48,
          fontSize: 11,
          opacity: 0.5,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          position: 'relative',
          zIndex: 1,
        }}
        aria-hidden="true"
      >
        Scroll ↓
      </motion.div>
    </section>
  )
}
