'use client'

import { motion } from 'framer-motion'
import { trackLead } from '@/lib/meta/events'
import { fadeInUp, stagger } from '@/components/animation/variants'
import { useReducedMotionSafe } from '@/components/animation/useReducedMotionSafe'

const APP_URL = 'https://app.ruangsaku.com'

function handleCtaClick(contentName: string) {
  void trackLead({ contentName })
}

const pricingContainer = stagger(0.15)

export function Pricing() {
  const { reduced } = useReducedMotionSafe()

  return (
    <section className="pricing" id="harga">
      <div className="section-header">
        <h2>Gratis selamanya. Pro untuk yang serius.</h2>
        <p>Semua fitur utama gratis. Upgrade ke Pro untuk analisis mendalam dan chat unlimited.</p>
      </div>

      <motion.div
        className="pricing-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={pricingContainer}
      >
        <motion.div
          className="price-card"
          variants={fadeInUp}
          whileHover={{ y: -8, transition: { duration: 0.25, ease: 'easeOut' } }}
        >
          <div className="price-label" style={{ color: 'var(--primary)' }}>Gratis</div>
          <div className="price-amount">Rp 0</div>
          <div className="price-muted">Selamanya, tanpa kartu kredit</div>
          <ul className="price-features">
            <li>Chat dengan Rindu (batasan harian)</li>
            <li>Dashboard lengkap</li>
            <li>Budget tracker</li>
            <li>Catat hutang &amp; tabungan</li>
            <li>Reminder pagi &amp; malam</li>
            <li>Voice message</li>
          </ul>
          <motion.a
            href={`${APP_URL}/register`}
            className="btn-cta btn-outline"
            onClick={() => handleCtaClick('CTA: Pricing Mulai Gratis')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            Mulai Gratis
          </motion.a>
        </motion.div>

        <motion.div
          className="price-card featured"
          variants={fadeInUp}
          animate={reduced ? undefined : { y: [0, -6, 0] }}
          transition={reduced ? undefined : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ y: -10, transition: { duration: 0.25, ease: 'easeOut' } }}
        >
          <div className="price-label">Pro</div>
          <div className="price-amount">
            Rp 29.900<span className="price-period">/bulan</span>
          </div>
          <div className="price-muted">Atau Rp 229.000/tahun (hemat 36%)</div>
          <ul className="price-features">
            <li>Chat Rindu unlimited</li>
            <li>Rindu lebih personal — ingat ceritamu, balas lebih hangat</li>
            <li>Insight kebiasaan &amp; prediksi saldo akhir bulan</li>
            <li>Tren 6 bulan — pola pengeluaran jangka panjang</li>
            <li>Export Excel &amp; PDF laporan keuangan</li>
            <li>Catatan aset investasi tanpa batas</li>
            <li>Notifikasi pagi &amp; malam yang personal</li>
          </ul>
          <motion.a
            href={`${APP_URL}/register`}
            className="btn-cta btn-accent"
            onClick={() => handleCtaClick('CTA: Pricing Upgrade ke Pro')}
            whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(255,112,67,0.35)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            Upgrade ke Pro
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
