'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { trackLead } from '@/lib/meta/events'
import { useReducedMotionSafe } from '@/components/animation/useReducedMotionSafe'

const APP_URL = 'https://app.ruangsaku.com'

function handleCtaClick(contentName: string) {
  void trackLead({ contentName })
}

const SUB_TEXT =
  'Kenalan sama Rindu — teman AI yang bantu kamu catat pengeluaran, pantau tabungan, sampai ingetin hutang. Tinggal chat aja, kayak ngobrol biasa.'

const CHAT_SCRIPT = [
  { role: 'ai', text: 'Pagi kak! ☀️ Kemarin cuma habis 45rb lho, hemat banget sih. Hari ini mau catat apa?' },
  { role: 'user', text: 'Makan siang 35rb warteg' },
  { role: 'ai', text: 'Warteg lagi ya 😋 Siap, udah kecatat! Sisa budget hari ini masih Rp 65rb — santai kok, aman~' },
  { role: 'user', text: 'Tabungan umroh udah berapa ya' },
  { role: 'ai', text: 'Udah Rp 8.2jt nih dari target 25jt (33%)! Kalau rutin 1jt/bulan, sekitar 17 bulan lagi nyampe. Semangat ya kak! 💪✨' },
] as const

const HEADLINE_VARIANTS = {
  visible: { transition: { staggerChildren: 0.05 } },
}
const WORD_VARIANTS = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const },
  },
}

function RevealWord({
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
  const opacity = useTransform(progress, [start, start + 1 / total * 0.7], [0.2, 1])
  return (
    <motion.span style={{ opacity, display: 'inline-block', marginRight: '0.25em' }}>
      {word}
    </motion.span>
  )
}

function ChatLoop({ reduced }: { reduced: boolean }) {
  const [step, setStep] = useState(reduced ? CHAT_SCRIPT.length - 1 : 0)

  useEffect(() => {
    if (reduced) return
    const t = setInterval(() => {
      setStep((s) => (s + 1) % CHAT_SCRIPT.length)
    }, 2800)
    return () => clearInterval(t)
  }, [reduced])

  const visible = reduced ? CHAT_SCRIPT : CHAT_SCRIPT.slice(0, step + 1)

  return (
    <div className="chat-body">
      <AnimatePresence mode="popLayout">
        {visible.map((msg, i) => (
          <motion.div
            key={`m-${i}`}
            className={`bubble bubble-${msg.role}`}
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            layout
          >
            {msg.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export function Hero() {
  const { reduced } = useReducedMotionSafe()
  const subRef = useRef<HTMLParagraphElement>(null)

  const { scrollY } = useScroll()
  const blobY = useTransform(scrollY, [0, 600], [0, 90])

  const { scrollYProgress: subProgress } = useScroll({
    target: subRef,
    offset: ['start end', 'end start'],
  })

  const subWords = SUB_TEXT.split(' ')

  return (
    <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
      {!reduced && (
        <motion.div
          aria-hidden="true"
          style={{
            y: blobY,
            position: 'absolute',
            top: '15%',
            right: '-120px',
            width: 420,
            height: 420,
            background: 'radial-gradient(circle, rgba(255,112,67,0.18), transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 0,
            filter: 'blur(8px)',
          }}
        />
      )}

      <div className="hero-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-text">
          <div className="hero-badge">
            <span>💬</span> Teman AI keuanganmu
          </div>

          <motion.h1 initial="hidden" animate="visible" variants={HEADLINE_VARIANTS}>
            {'Ngobrol soal uang,'.split(' ').map((w, i) => (
              <motion.span
                key={`a-${i}`}
                variants={WORD_VARIANTS}
                style={{ display: 'inline-block', marginRight: '0.25em' }}
              >
                {w}
              </motion.span>
            ))}
            <br />
            {'sesantai curhat ke teman.'.split(' ').map((w, i) => (
              <motion.span
                key={`b-${i}`}
                variants={WORD_VARIANTS}
                className="highlight"
                style={{ display: 'inline-block', marginRight: '0.25em' }}
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>

          {reduced ? (
            <p>{SUB_TEXT}</p>
          ) : (
            <p ref={subRef}>
              {subWords.map((w, i) => (
                <RevealWord key={i} word={w} index={i} total={subWords.length} progress={subProgress} />
              ))}
            </p>
          )}

          <div className="hero-actions">
            <motion.a
              href={`${APP_URL}/register`}
              className="btn-cta btn-accent"
              onClick={() => handleCtaClick('CTA: Hero Daftar Gratis')}
              whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(255,112,67,0.3)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              Coba Gratis Sekarang
            </motion.a>
            <motion.a
              href="#fitur"
              className="btn-cta btn-outline"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              Lihat Fitur
            </motion.a>
          </div>
        </div>

        <div className="hero-chat">
          <div className="chat-window">
            <div className="chat-header">
              <div className="chat-avatar">
                <Image src="/rindu.jpeg" alt="Rindu" width={44} height={44} />
              </div>
              <div>
                <div className="chat-name">Rindu</div>
                <div className="chat-status">Selalu siap bantu</div>
              </div>
            </div>
            <ChatLoop reduced={reduced} />
          </div>
        </div>
      </div>
    </section>
  )
}
