'use client'

import { motion } from 'framer-motion'
import { fadeInUp, stagger } from '@/components/animation/variants'

const FEATURES = [
  { icon: '📝', title: 'Catat Pengeluaran', body: '"Beli kopi 25rb" — done! Rindu langsung tau kategorinya dan catat ke dompet yang bener.' },
  { icon: '🎯', title: 'Pantau Tabungan', body: '"Nabung 500rb buat umroh" — Rindu pantau terus progressnya dan kasih semangat tiap milestone.' },
  { icon: '💸', title: 'Kelola Hutang', body: '"Budi hutang 200rb" — Rindu yang ingetin, siapa hutang berapa dan kapan deadline-nya.' },
  { icon: '📊', title: 'Dashboard Pintar', body: 'Saldo semua dompet, tren pengeluaran, budget — semuanya update sendiri, gak perlu input manual.' },
  { icon: '🔔', title: 'Reminder Otomatis', body: 'Pagi Rindu kasih tau sisa budget, malem recap pengeluaran. Tagihan? Diingetin 3 hari sebelumnya.' },
]

const featureContainer = stagger(0.1)

export function Features() {
  return (
    <section className="features" id="fitur">
      <div className="section-header">
        <h2>
          Semua lewat chat.
          <br />
          Satu teman, semua urusan uang.
        </h2>
        <p>Gak perlu buka spreadsheet atau app ribet. Tinggal bilang ke Rindu, dia yang urus.</p>
      </div>

      <motion.div
        className="chat-features"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={featureContainer}
      >
        {FEATURES.map((f, i) => (
          <motion.div
            key={i}
            className="chat-feature"
            variants={fadeInUp}
            whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
          >
            {i % 2 === 1 && (
              <div className="connector">
                <div className="connector-dot" />
              </div>
            )}
            <div className="feature-bubble">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
            {i % 2 === 0 && (
              <div className="connector">
                <div className="connector-dot" />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
