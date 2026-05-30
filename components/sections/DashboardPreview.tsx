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

interface CaptionData {
  step: string
  tag: string
  title: string
  body: string
  imgSrc: string
  imgAlt: string
}

const CAPTIONS: CaptionData[] = [
  {
    step: '01',
    tag: 'Ringkasan',
    title: 'Saldo & Kekayaan',
    body:
      'Total semua dompet, breakdown kas + tabungan + aset + piutang dikurangi hutang. Update otomatis tiap kamu chat ke Rindu.',
    imgSrc: '/dashboard-1.png',
    imgAlt: 'Dashboard saldo dan total kekayaan',
  },
  {
    step: '02',
    tag: 'Breakdown',
    title: 'Dompet & Kategori',
    body:
      'Tahu duitmu lari ke mana — makan, transport, langganan — top kategori pengeluaran bulan ini, semua tercatat otomatis.',
    imgSrc: '/dashboard-2.png',
    imgAlt: 'Breakdown kekayaan, saldo dompet, dan kategori pengeluaran',
  },
  {
    step: '03',
    tag: 'Insight',
    title: 'Tren & Riwayat',
    body:
      'Grafik harian dan 6 bulan ke belakang. Catatan rapi 30 hari terakhir, lengkap dengan todo rutin untuk Pro.',
    imgSrc: '/dashboard-3.png',
    imgAlt: 'Tren pengeluaran dan transaksi terakhir',
  },
]

function CaptionBody({ body, reduced }: { body: string; reduced: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })

  if (reduced) return <p>{body}</p>

  const words = body.split(' ')
  return (
    <p ref={ref}>
      {words.map((w, i) => (
        <RevealWord key={i} word={w} index={i} total={words.length} progress={scrollYProgress} />
      ))}
    </p>
  )
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
  const opacity = useTransform(progress, [start, start + 1 / total * 0.8], [0.25, 1])
  return (
    <motion.span style={{ opacity, display: 'inline-block', marginRight: '0.25em' }}>
      {word}
    </motion.span>
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
  const safeOpacity = reduced ? 1 : opacity
  return (
    <motion.div className="caption-block" style={{ opacity: safeOpacity }}>
      <span className="step-badge">{caption.step}</span>
      <span className="caption-tag-v2">{caption.tag}</span>
      <h3>{caption.title}</h3>
      <CaptionBody body={caption.body} reduced={reduced} />
    </motion.div>
  )
}

export function DashboardPreview() {
  const ref = useRef<HTMLElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const { reduced } = useReducedMotionSafe()
  const [currentIdx, setCurrentIdx] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const activeIdx = useTransform(scrollYProgress, [0.25, 0.45, 0.65], [0, 1, 2])
  const activeIdxRounded = useTransform(activeIdx, (v) => Math.round(v))

  useMotionValueEvent(activeIdxRounded, 'change', (v) => setCurrentIdx(v))

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 })

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
    <section ref={ref} className="dashboard-preview-v2" id="dashboard">
      <div className="section-header">
        <h2>
          Dashboard yang hidup,
          <br />
          bukan sekadar angka.
        </h2>
        <p>
          Setiap chat ke Rindu update dashboard otomatis. Saldo, kekayaan, hutang,
          tabungan, tren pengeluaran — semua di satu layar, real-time.
        </p>
      </div>

      <div className="dashboard-v2-inner">
        <div className="phone-pin-col">
          <motion.div
            ref={phoneRef}
            className="phone-tilt-wrap"
            style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <PhoneFrame>
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

        <div className="caption-col">
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

      <div className="dashboard-footnote">
        <span>📊</span>
        <span>Update otomatis setiap kali kamu ngobrol — tanpa input manual.</span>
      </div>
    </section>
  )
}
