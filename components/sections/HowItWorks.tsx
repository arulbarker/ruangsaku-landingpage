'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useReducedMotionSafe } from '@/components/animation/useReducedMotionSafe'

const STEPS = [
  { num: '1', title: 'Daftar Gratis', body: 'Buat akun dengan email. Pilih bank/e-wallet yang kamu pakai, selesai.' },
  { num: '2', title: 'Kenalan sama Rindu', body: 'Pilih gaya ngobrol Rindu — santai, formal, atau motivator. Dia adaptasi ke kamu.' },
  { num: '3', title: 'Mulai Ngobrol', body: 'Catat pengeluaran, cek saldo, atur tabungan — semua cukup bilang ke Rindu.' },
]

function StepItem({
  step,
  threshold,
  progress,
  reduced,
}: {
  step: { num: string; title: string; body: string }
  threshold: number
  progress: MotionValue<number>
  reduced: boolean
}) {
  const scale = useTransform(progress, [threshold - 0.12, threshold + 0.05], [1, 1.15])
  const color = useTransform(progress, [threshold - 0.12, threshold + 0.05], ['#6B5E7B', '#5B3FA0'])
  return (
    <div className="step">
      <motion.div
        className="step-number"
        style={reduced ? undefined : { scale, color }}
      >
        {step.num}
      </motion.div>
      <h3>{step.title}</h3>
      <p>{step.body}</p>
    </div>
  )
}

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null)
  const { reduced } = useReducedMotionSafe()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end center'],
  })
  const progressFill = useTransform(scrollYProgress, [0.2, 0.85], [0, 1])

  return (
    <section ref={ref} className="how-it-works" id="cara-kerja">
      <div className="section-header">
        <h2>Mulai dalam 2 menit</h2>
        <p>Gak perlu setup ribet. Langsung ngobrol.</p>
      </div>

      <div className="steps-wrap">
        <div className="progress-line" aria-hidden="true">
          <motion.div
            className="progress-fill"
            style={reduced ? { scaleX: 1 } : { scaleX: progressFill }}
          />
        </div>
        <div className="steps">
          {STEPS.map((s, i) => (
            <StepItem
              key={s.num}
              step={s}
              threshold={(i + 1) / (STEPS.length + 1)}
              progress={scrollYProgress}
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
