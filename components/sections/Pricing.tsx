'use client'

import { trackLead } from '@/lib/meta/events'

const APP_URL = 'https://app.ruangsaku.com'

function handleCtaClick(contentName: string) {
  void trackLead({ contentName })
}

export function Pricing() {
  return (
    <section className="pricing" id="harga">
      <div className="section-header">
        <h2>Gratis selamanya. Pro untuk yang serius.</h2>
        <p>Semua fitur utama gratis. Upgrade ke Pro untuk analisis mendalam dan chat unlimited.</p>
      </div>
      <div className="pricing-grid">
        <div className="price-card">
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
          <a
            href={`${APP_URL}/register`}
            className="btn-cta btn-outline"
            onClick={() => handleCtaClick('CTA: Pricing Mulai Gratis')}
          >
            Mulai Gratis
          </a>
        </div>
        <div className="price-card featured">
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
          <a
            href={`${APP_URL}/register`}
            className="btn-cta btn-accent"
            onClick={() => handleCtaClick('CTA: Pricing Upgrade ke Pro')}
          >
            Upgrade ke Pro
          </a>
        </div>
      </div>
    </section>
  )
}
