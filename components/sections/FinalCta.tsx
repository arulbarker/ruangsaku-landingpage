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
const HEADLINE = 'Rindu udah nungguin kamu lho 💜'

function KineticWord({
  word,
  index,
  total,
  progress,
}: {
  word: string
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const start = index / total
  const opacity = useTransform(progress, [start, start + 1 / total * 0.6], [0.2, 1])
  const y = useTransform(progress, [start, start + 1 / total * 0.6], [12, 0])
  return (
    <motion.span style={{ opacity, y, display: 'inline-block', marginRight: '0.25em' }}>
      {word}
    </motion.span>
  )
}

export function FinalCta() {
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
    if (dist < 120) {
      btnX.set(dx * 0.22)
      btnY.set(dy * 0.22)
    } else {
      btnX.set(0)
      btnY.set(0)
    }
  }
  const handleLeave = () => {
    btnX.set(0)
    btnY.set(0)
  }

  const words = HEADLINE.split(' ')

  return (
    <section ref={ref} className="final-cta" onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <h2>
        {reduced
          ? HEADLINE
          : words.map((w, i) => (
              <KineticWord key={i} word={w} index={i} total={words.length} progress={scrollYProgress} />
            ))}
      </h2>
      <p>Yuk mulai atur keuangan hari ini — gratis, gak ribet, tinggal ngobrol aja.</p>
      <motion.a
        ref={btnRef}
        href={`${APP_URL}/register`}
        className="btn-cta btn-accent"
        style={{
          fontSize: 18,
          padding: '16px 40px',
          display: 'inline-block',
          x: reduced ? 0 : btnXSpring,
          y: reduced ? 0 : btnYSpring,
        }}
        onClick={() => void trackLead({ contentName: 'CTA: Final Mulai Ngobrol' })}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.04, boxShadow: '0 14px 40px rgba(255,112,67,0.4)' }}
      >
        Mulai Ngobrol Sekarang
      </motion.a>
    </section>
  )
}
