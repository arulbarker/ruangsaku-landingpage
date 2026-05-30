'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { useReducedMotionSafe } from '@/components/animation/useReducedMotionSafe'
import { avatarEntrance, chatBubbleIn, stagger } from '@/components/animation/variants'

const MESSAGES = [
  { text: 'Hai! Aku Rindu 💜' },
  { text: 'Aku temen yang bantu kamu atur duit lewat chat — kayak ngobrol biasa aja.' },
  { text: 'Nggak perlu spreadsheet. Nggak perlu input ribet. Tinggal cerita, aku catetin.' },
]

const chatContainer = stagger(0.7)

export function Chapter03MeetRindu() {
  const ref = useRef<HTMLElement>(null)
  const { reduced } = useReducedMotionSafe()
  const [revealedCount, setRevealedCount] = useState(reduced ? MESSAGES.length : 0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const messageProgress = useTransform(scrollYProgress, [0.2, 0.7], [0, MESSAGES.length])
  useMotionValueEvent(messageProgress, 'change', (v) => {
    setRevealedCount(Math.min(MESSAGES.length, Math.max(0, Math.ceil(v))))
  })

  return (
    <section
      ref={ref}
      id="ch-03"
      className="chapter-03"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #1E1535 0%, #5B3FA0 60%, #7B5FC0 100%)',
        color: 'white',
        padding: '120px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div
        className="ch03-grid"
        style={{
          maxWidth: 1100,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'minmax(220px, 320px) 1fr',
          gap: 56,
          alignItems: 'center',
        }}
      >
        <motion.div
          variants={avatarEntrance}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <motion.div
            animate={
              reduced
                ? undefined
                : {
                    boxShadow: [
                      '0 0 60px rgba(255,112,67,0.25)',
                      '0 0 90px rgba(255,112,67,0.4)',
                      '0 0 60px rgba(255,112,67,0.25)',
                    ],
                  }
            }
            transition={reduced ? undefined : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              padding: 6,
              background: 'linear-gradient(135deg, #FF7043, #FF8A65)',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                background: '#1E1535',
              }}
            >
              <Image
                src="/rindu.jpeg"
                alt="Rindu"
                width={188}
                height={188}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                priority
              />
            </div>
          </motion.div>
          <div style={{ fontSize: 12, opacity: 0.7, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            RINDU IS HERE
          </div>
        </motion.div>

        <motion.div
          variants={chatContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          {MESSAGES.map((m, i) => (
            <motion.div
              key={i}
              variants={chatBubbleIn}
              style={{
                background: 'rgba(240, 234, 255, 0.95)',
                color: '#1E1535',
                padding: '16px 20px',
                borderRadius: '20px 20px 20px 6px',
                fontSize: 'clamp(15px, 1.6vw, 18px)',
                lineHeight: 1.55,
                maxWidth: 520,
                opacity: i < revealedCount ? 1 : 0.15,
                transition: 'opacity 500ms ease-out',
              }}
            >
              {m.text}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
