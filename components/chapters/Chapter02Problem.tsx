'use client'

import { motion } from 'framer-motion'
import { painSlideIn, stagger } from '@/components/animation/variants'

const PAINS = [
  { emo: '🍔', text: 'Boros makanan online. Tagihan akhir bulan bikin shock.' },
  { emo: '💡', text: 'Lupa tagihan listrik. Bayar denda jadi rutin.' },
  { emo: '💸', text: 'Hutang ke teman numpuk. Awkward nagih, gak enak ditagih.' },
  { emo: '📉', text: 'Tabungan stuck di nominal yang sama dari tahun lalu.' },
]

const containerVariants = stagger(0.18)

export function Chapter02Problem() {
  return (
    <section
      id="ch-02"
      className="chapter-02"
      style={{
        minHeight: '100vh',
        background: '#1E1535',
        color: '#F5F0EA',
        padding: '120px 24px',
        position: 'relative',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(194,65,12,0.08), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            lineHeight: 1.15,
            marginBottom: 64,
            textAlign: 'center',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          Mungkin kamu pernah ngerasa...
        </h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
          style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
        >
          {PAINS.map((p, i) => (
            <motion.div
              key={i}
              variants={painSlideIn}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                padding: '24px 28px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 16,
                backdropFilter: 'blur(6px)',
              }}
            >
              <span style={{ fontSize: 36, lineHeight: 1 }} aria-hidden="true">
                {p.emo}
              </span>
              <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.5, margin: 0 }}>
                {p.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <p
          style={{
            marginTop: 64,
            textAlign: 'center',
            fontSize: 'clamp(20px, 3vw, 32px)',
            fontWeight: 600,
            opacity: 0.9,
            fontStyle: 'italic',
          }}
        >
          Familiar banget kan?
        </p>
      </div>
    </section>
  )
}
