'use client'

import { useRef, type MouseEvent } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type MotionValue,
} from 'framer-motion'
import { trackLead } from '@/lib/meta/events'
import { useReducedMotionSafe } from '@/components/animation/useReducedMotionSafe'

const APP_URL = 'https://app.ruangsaku.com'

const HEADLINE_PARTS = [
  { text: 'Rindu' },
  { text: 'udah', accent: true },
  { text: 'nungguin', accent: true },
  { text: 'kamu' },
  { text: 'lho' },
  { text: '💜' },
]

function KineticWord({
  part,
  index,
  total,
  progress,
  reduced,
}: {
  part: { text: string; accent?: boolean }
  index: number
  total: number
  progress: MotionValue<number>
  reduced: boolean
}) {
  const start = index / total
  const end = start + (1 / total) * 0.6
  const opacity = useTransform(progress, [start, end], [0.2, 1])
  const y = useTransform(progress, [start, end], [16, 0])
  const wght = useTransform(progress, [start, end], [400, 800])
  const wghtString = useTransform(wght, (v) => `"wght" ${Math.round(v)}`)
  return (
    <motion.span
      style={{
        display: 'inline-block',
        marginRight: '0.32em',
        opacity: reduced ? 1 : opacity,
        y: reduced ? 0 : y,
        fontVariationSettings: reduced ? '"wght" 700' : wghtString,
        background: part.accent ? 'linear-gradient(135deg, #FF7043, #FF8A65)' : undefined,
        WebkitBackgroundClip: part.accent ? 'text' : undefined,
        WebkitTextFillColor: part.accent ? 'transparent' : undefined,
        backgroundClip: part.accent ? 'text' : undefined,
        color: part.accent ? undefined : 'white',
      }}
    >
      {part.text}
    </motion.span>
  )
}

export function Chapter05Climax() {
  const ref = useRef<HTMLElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)
  const { reduced } = useReducedMotionSafe()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  const btnX = useMotionValue(0)
  const btnY = useMotionValue(0)
  const btnXSpring = useSpring(btnX, { stiffness: 200, damping: 18 })
  const btnYSpring = useSpring(btnY, { stiffness: 200, damping: 18 })

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (reduced || !btnRef.current) return
    const r = btnRef.current.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 150) {
      btnX.set(dx * 0.25)
      btnY.set(dy * 0.25)
    } else {
      btnX.set(0)
      btnY.set(0)
    }
  }
  const handleLeave = () => {
    btnX.set(0)
    btnY.set(0)
  }

  return (
    <section
      ref={ref}
      id="ch-05"
      className="chapter-05"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1E1535 0%, #2A1F4E 100%)',
        color: 'white',
        padding: '120px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {!reduced &&
        Array.from({ length: 7 }, (_, i) => (
          <div
            key={i}
            aria-hidden="true"
            className={`particle p-${i}`}
            style={{
              position: 'absolute',
              width: 4 + (i % 3) * 2,
              height: 4 + (i % 3) * 2,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.4)',
              top: `${10 + (i * 13) % 70}%`,
              left: `${5 + (i * 17) % 85}%`,
            }}
          />
        ))}

      <h2
        style={{
          fontSize: 'clamp(36px, 6vw, 72px)',
          lineHeight: 1.15,
          textAlign: 'center',
          maxWidth: 900,
          marginBottom: 24,
          letterSpacing: '-0.02em',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {HEADLINE_PARTS.map((p, i) => (
          <KineticWord
            key={i}
            part={p}
            index={i}
            total={HEADLINE_PARTS.length}
            progress={scrollYProgress}
            reduced={reduced}
          />
        ))}
      </h2>

      <p
        style={{
          fontSize: 'clamp(15px, 2vw, 20px)',
          opacity: 0.75,
          marginBottom: 40,
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        Gratis. Selamanya. Tanpa kartu kredit.
      </p>

      <motion.a
        ref={btnRef}
        href={`${APP_URL}/register`}
        onClick={() => void trackLead({ contentName: 'CTA: Ch05 Climax Mulai Ngobrol' })}
        className="btn-cta btn-accent"
        style={{
          fontSize: 18,
          padding: '18px 44px',
          display: 'inline-block',
          x: reduced ? 0 : btnXSpring,
          y: reduced ? 0 : btnYSpring,
          background: 'linear-gradient(135deg, #FF7043, #E85D30)',
          position: 'relative',
          zIndex: 1,
        }}
        whileHover={{ scale: 1.05, boxShadow: '0 14px 40px rgba(255,112,67,0.5)' }}
        whileTap={{ scale: 0.95 }}
        animate={
          reduced
            ? undefined
            : {
                boxShadow: [
                  '0 10px 30px rgba(255,112,67,0.4)',
                  '0 14px 40px rgba(255,112,67,0.6)',
                  '0 10px 30px rgba(255,112,67,0.4)',
                ],
              }
        }
        transition={reduced ? undefined : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        Mulai Ngobrol Sekarang →
      </motion.a>
    </section>
  )
}
