'use client'

import Image from 'next/image'
import { useRef, useState, type MouseEvent } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  type MotionValue,
} from 'framer-motion'
import { PhoneFrame } from '@/components/ui/PhoneFrame'
import { PhoneScreen } from '@/components/ui/PhoneScreen'
import { useReducedMotionSafe } from '@/components/animation/useReducedMotionSafe'
import { trackLead } from '@/lib/meta/events'

const APP_URL = 'https://app.ruangsaku.com'

interface CaptionData {
  step: string
  title: string
  body: string
  imgSrc: string
  imgAlt: string
}

const CAPTIONS: CaptionData[] = [
  {
    step: '01',
    title: 'Saldo & Kekayaan',
    body:
      'Total semua aset, dompet, dan tabungan di satu tempat. Update otomatis tiap kamu chat ke Rindu.',
    imgSrc: '/dashboard-1.png',
    imgAlt: 'Dashboard saldo dan total kekayaan',
  },
  {
    step: '02',
    title: 'Kategori & Tren',
    body:
      'Tahu duitmu lari ke mana — makan, transport, langganan. Pola pengeluaranmu jelas, nggak misterius lagi.',
    imgSrc: '/dashboard-2.png',
    imgAlt: 'Breakdown kategori pengeluaran',
  },
  {
    step: '03',
    title: 'Insight Personal',
    body:
      'Rindu inget kebiasaanmu. Tiap minggu kasih saran konkret — bukan generic tips, tapi insight khusus kamu.',
    imgSrc: '/dashboard-3.png',
    imgAlt: 'Tren pengeluaran dan insight personal',
  },
]

function CaptionBodyReveal({ body, reduced }: { body: string; reduced: boolean }) {
  const paraStyle = {
    fontSize: 'clamp(15px, 1.7vw, 18px)',
    color: '#6B5E7B',
    lineHeight: 1.7,
    margin: 0,
    maxWidth: 520,
  } as const

  if (reduced) {
    return <p style={paraStyle}>{body}</p>
  }

  const words = body.split(' ')
  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.4 }}
      variants={{ visible: { transition: { staggerChildren: 0.025 } } }}
      style={paraStyle}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0.25, y: 4 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {w}
        </motion.span>
      ))}
    </motion.p>
  )
}

function CaptionBlock({
  index,
  caption,
  activeIdx,
  reduced,
}: {
  index: number
  caption: CaptionData
  activeIdx: MotionValue<number>
  reduced: boolean
}) {
  const opacity = useTransform(activeIdx, [index - 1, index, index + 1], [0.35, 1, 0.35])
  const wght = useTransform(activeIdx, [index - 0.5, index, index + 0.5], [600, 700, 600])
  const wghtString = useTransform(wght, (v) => `"wght" ${Math.round(v)}`)

  return (
    <motion.div
      className="ch04-caption-block"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '40px 0',
        opacity: reduced ? 1 : opacity,
      }}
    >
      <span
        style={{
          background: 'rgba(91, 63, 160, 0.1)',
          color: '#5B3FA0',
          fontSize: 13,
          fontWeight: 700,
          padding: '4px 12px',
          borderRadius: 6,
          marginBottom: 14,
          display: 'inline-block',
          width: 'fit-content',
        }}
      >
        {caption.step}
      </span>
      <motion.h3
        style={{
          fontSize: 'clamp(24px, 3.6vw, 40px)',
          color: '#1E1535',
          margin: '0 0 14px',
          lineHeight: 1.15,
          fontVariationSettings: reduced ? undefined : wghtString,
        }}
      >
        {caption.title}
      </motion.h3>
      <CaptionBodyReveal body={caption.body} reduced={reduced} />

      {/* Mobile-only inline phone: 1 phone per caption block — animasi reveal saat scroll masuk viewport + idle float + tap feedback */}
      <motion.div
        className="ch04-inline-phone"
        initial={reduced ? false : { opacity: 0, y: 28, scale: 0.94 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        whileTap={reduced ? undefined : { scale: 0.97 }}
      >
        <PhoneFrame style={{ width: 220, height: 440 }}>
          <Image
            src={caption.imgSrc}
            alt={caption.imgAlt}
            width={430}
            height={900}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </PhoneFrame>
      </motion.div>
    </motion.div>
  )
}

export function Chapter04Solution() {
  const ref = useRef<HTMLElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const { reduced } = useReducedMotionSafe()
  const [currentIdx, setCurrentIdx] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const activeIdx = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0, 1, 2])
  const activeIdxRounded = useTransform(activeIdx, (v) => Math.round(v))
  useMotionValueEvent(activeIdxRounded, 'change', (v) => setCurrentIdx(v))

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 150,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 20,
  })

  const handleMouseMove = (e: MouseEvent) => {
    if (reduced || !phoneRef.current) return
    const r = phoneRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - r.left) / r.width - 0.5)
    mouseY.set((e.clientY - r.top) / r.height - 0.5)
  }
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      ref={ref}
      id="ch-04"
      className="chapter-04"
      style={{
        background: 'linear-gradient(180deg, #FAF7FF 0%, #F0EAFF 100%)',
        padding: '80px 24px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto 60px', textAlign: 'center' }}>
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            lineHeight: 1.15,
            marginBottom: 14,
            color: '#1E1535',
          }}
        >
          Hidupmu jadi keliatan jelas.
        </h2>
        <p style={{ fontSize: 16, color: '#6B5E7B', lineHeight: 1.6 }}>
          Saldo real-time. Tren pengeluaran. Insight personal. Semua otomatis update tiap kamu chat.
        </p>
      </div>

      <div
        className="ch04-grid"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 440px) 1fr',
          gap: 80,
          alignItems: 'start',
        }}
      >
        <div
          className="ch04-phone-pin"
          style={{
            position: 'sticky',
            top: 100,
            height: 'fit-content',
            display: 'flex',
            justifyContent: 'center',
            perspective: 900,
          }}
        >
          <motion.div
            ref={phoneRef}
            animate={
              reduced
                ? undefined
                : {
                    boxShadow: [
                      '0 30px 60px rgba(91,63,160,0.2)',
                      '0 30px 80px rgba(255,112,67,0.25)',
                      '0 30px 60px rgba(91,63,160,0.2)',
                    ],
                  }
            }
            transition={reduced ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={
              reduced
                ? { transformStyle: 'preserve-3d' }
                : { rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }
            }
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <PhoneFrame style={{ width: 320, height: 640 }}>
              {CAPTIONS.map((cap, i) => (
                <PhoneScreen key={i} active={i === currentIdx}>
                  <Image
                    src={cap.imgSrc}
                    alt={cap.imgAlt}
                    width={430}
                    height={900}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    priority={i === 0}
                  />
                </PhoneScreen>
              ))}
            </PhoneFrame>
          </motion.div>
        </div>

        <div>
          {CAPTIONS.map((cap, i) => (
            <CaptionBlock
              key={i}
              index={i}
              caption={cap}
              activeIdx={activeIdxRounded}
              reduced={reduced}
            />
          ))}
        </div>
      </div>

      <div
        className="ch04-pricing"
        style={{ maxWidth: 1000, margin: '80px auto 0', padding: '0 24px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h3 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: '#1E1535', marginBottom: 8 }}>
            Mulai dari nol. Naik kapanpun siap.
          </h3>
          <p style={{ fontSize: 14, color: '#6B5E7B' }}>Gratis selamanya. Pro untuk yang serius.</p>
        </div>
        <div
          className="ch04-pricing-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}
        >
          <div
            style={{
              background: 'white',
              padding: 28,
              borderRadius: 16,
              border: '1px solid rgba(91,63,160,0.1)',
              boxShadow: '0 4px 20px rgba(91,63,160,0.06)',
            }}
          >
            <div style={{ color: '#5B3FA0', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>
              Gratis
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#1E1535', marginBottom: 4 }}>
              Rp 0
            </div>
            <div style={{ fontSize: 12, color: '#6B5E7B', marginBottom: 20 }}>
              Selamanya, tanpa kartu kredit
            </div>
            <motion.a
              href={`${APP_URL}/register`}
              className="btn-cta btn-outline"
              onClick={() => void trackLead({ contentName: 'CTA: Ch04 Pricing Mulai Gratis' })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ display: 'inline-block' }}
            >
              Mulai Gratis
            </motion.a>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #5B3FA0, #7B5FC0)',
              color: 'white',
              padding: 28,
              borderRadius: 16,
              boxShadow: '0 10px 40px rgba(91,63,160,0.25)',
            }}
          >
            <div style={{ color: '#FF8A65', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>
              Pro
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 4 }}>
              Rp 29.900
              <span style={{ fontSize: 14, fontWeight: 400, opacity: 0.8 }}>/bulan</span>
            </div>
            <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 20 }}>
              Atau Rp 229.000/tahun (hemat 36%)
            </div>
            <motion.a
              href={`${APP_URL}/register`}
              className="btn-cta btn-accent"
              onClick={() => void trackLead({ contentName: 'CTA: Ch04 Pricing Upgrade Pro' })}
              whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(255,112,67,0.35)' }}
              whileTap={{ scale: 0.98 }}
              style={{ display: 'inline-block' }}
            >
              Upgrade ke Pro
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
