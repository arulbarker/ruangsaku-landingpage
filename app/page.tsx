'use client'

import Image from 'next/image'
import { useEffect } from 'react'

const APP_URL = 'https://app.ruangsaku.com'

export default function LandingPage() {
  useEffect(() => {
    // Nav scroll effect
    const handleScroll = () => {
      document.querySelector('nav')?.classList.toggle('scrolled', window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)

    // Scroll reveal for features
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.2 }
    )
    document.querySelectorAll('.chat-feature').forEach((el) => observer.observe(el))
    document.querySelectorAll('.dashboard-card').forEach((el) => observer.observe(el))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* NAV */}
      <nav>
        <a href="#" className="nav-logo">
          <Image src="/icon.png" alt="RuangSaku" width={36} height={36} style={{ borderRadius: 10 }} />
          RuangSaku
        </a>
        <div className="nav-links">
          <a href="#fitur">Fitur</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#cara-kerja">Cara Kerja</a>
          <a href="#harga">Harga</a>
          <a href={`${APP_URL}/login`} className="btn-cta btn-primary" style={{ padding: '10px 24px', fontSize: 14 }}>
            Masuk
          </a>
        </div>
        <button className="nav-mobile-btn" aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-badge">
              <span>💬</span> Teman AI keuanganmu
            </div>
            <h1>
              Ngobrol soal uang,
              <br />
              <span className="highlight">sesantai curhat ke teman.</span>
            </h1>
            <p>
              Kenalan sama Rindu — teman AI yang bantu kamu catat pengeluaran, pantau
              tabungan, sampai ingetin hutang. Tinggal chat aja, kayak ngobrol biasa.
            </p>
            <div className="hero-actions">
              <a href={`${APP_URL}/register`} className="btn-cta btn-accent">
                Coba Gratis Sekarang
              </a>
              <a href="#fitur" className="btn-cta btn-outline">
                Lihat Fitur
              </a>
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
              <div className="chat-body">
                <div className="typing-dots">
                  <span /><span /><span />
                </div>
                <div className="bubble bubble-ai">
                  Pagi kak! ☀️ Kemarin cuma habis 45rb lho, hemat banget sih. Hari ini mau catat apa?
                </div>
                <div className="bubble bubble-user">Makan siang 35rb warteg</div>
                <div className="bubble bubble-ai">
                  Warteg lagi ya 😋 Siap, udah kecatat! Sisa budget hari ini masih Rp 65rb — santai kok, aman~
                </div>
                <div className="bubble bubble-user">Tabungan umroh udah berapa ya</div>
                <div className="bubble bubble-ai">
                  Udah Rp 8.2jt nih dari target 25jt (33%)! Kalau rutin 1jt/bulan, sekitar 17 bulan lagi nyampe.
                  Semangat ya kak, demi umroh! 💪✨
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="fitur">
        <div className="section-header">
          <h2>
            Semua lewat chat.
            <br />
            Satu teman, semua urusan uang.
          </h2>
          <p>Gak perlu buka spreadsheet atau app ribet. Tinggal bilang ke Rindu, dia yang urus.</p>
        </div>

        <div className="chat-features">
          <div className="chat-feature">
            <div className="feature-bubble">
              <div className="feature-icon">📝</div>
              <h3>Catat Pengeluaran</h3>
              <p>&quot;Beli kopi 25rb&quot; — done! Rindu langsung tau kategorinya dan catat ke dompet yang bener.</p>
            </div>
            <div className="connector"><div className="connector-dot" /></div>
          </div>
          <div className="chat-feature">
            <div className="connector"><div className="connector-dot" /></div>
            <div className="feature-bubble">
              <div className="feature-icon">🎯</div>
              <h3>Pantau Tabungan</h3>
              <p>&quot;Nabung 500rb buat umroh&quot; — Rindu pantau terus progressnya dan kasih semangat tiap milestone.</p>
            </div>
          </div>
          <div className="chat-feature">
            <div className="feature-bubble">
              <div className="feature-icon">💸</div>
              <h3>Kelola Hutang</h3>
              <p>&quot;Budi hutang 200rb&quot; — Rindu yang ingetin, siapa hutang berapa dan kapan deadline-nya.</p>
            </div>
            <div className="connector"><div className="connector-dot" /></div>
          </div>
          <div className="chat-feature">
            <div className="connector"><div className="connector-dot" /></div>
            <div className="feature-bubble">
              <div className="feature-icon">📊</div>
              <h3>Dashboard Pintar</h3>
              <p>Saldo semua dompet, tren pengeluaran, budget — semuanya update sendiri, gak perlu input manual.</p>
            </div>
          </div>
          <div className="chat-feature">
            <div className="feature-bubble">
              <div className="feature-icon">🔔</div>
              <h3>Reminder Otomatis</h3>
              <p>Pagi Rindu kasih tau sisa budget, malem recap pengeluaran. Tagihan? Diingetin 3 hari sebelumnya.</p>
            </div>
            <div className="connector"><div className="connector-dot" /></div>
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="dashboard-preview" id="dashboard">
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

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <div className="phone-frame">
              <div className="phone-notch" />
              <Image
                src="/dashboard-1.png"
                alt="Dashboard saldo dan total kekayaan"
                width={1920}
                height={899}
                className="phone-screen"
                priority
              />
            </div>
            <div className="dashboard-caption">
              <span className="caption-tag">Ringkasan</span>
              <h3>Saldo & Kekayaan</h3>
              <p>Total semua dompet, breakdown kas + tabungan + aset + piutang − hutang.</p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="phone-frame">
              <div className="phone-notch" />
              <Image
                src="/dashboard-2.png"
                alt="Breakdown kekayaan, saldo dompet, dan kategori pengeluaran"
                width={430}
                height={900}
                className="phone-screen"
              />
            </div>
            <div className="dashboard-caption">
              <span className="caption-tag">Breakdown</span>
              <h3>Dompet & Kategori</h3>
              <p>Total kekayaan per kategori, saldo tiap dompet, & top kategori pengeluaran bulan ini.</p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="phone-frame">
              <div className="phone-notch" />
              <Image
                src="/dashboard-3.png"
                alt="Tren pengeluaran dan transaksi terakhir"
                width={1920}
                height={899}
                className="phone-screen"
              />
            </div>
            <div className="dashboard-caption">
              <span className="caption-tag">Insight</span>
              <h3>Tren & Riwayat</h3>
              <p>Grafik harian/6 bulan + 7 hari terakhir, lengkap dengan todo rutin.</p>
            </div>
          </div>
        </div>

        <div className="dashboard-footnote">
          <span>📊</span>
          <span>Update otomatis setiap kali kamu ngobrol — tanpa input manual.</span>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works" id="cara-kerja">
        <div className="section-header">
          <h2>Mulai dalam 2 menit</h2>
          <p>Gak perlu setup ribet. Langsung ngobrol.</p>
        </div>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Daftar Gratis</h3>
            <p>Buat akun dengan email. Pilih bank/e-wallet yang kamu pakai, selesai.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Kenalan sama Rindu</h3>
            <p>Pilih gaya ngobrol Rindu — santai, formal, atau motivator. Dia adaptasi ke kamu.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Mulai Ngobrol</h3>
            <p>Catat pengeluaran, cek saldo, atur tabungan — semua cukup bilang ke Rindu.</p>
          </div>
        </div>
      </section>

      {/* PRICING */}
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
            <a href={`${APP_URL}/register`} className="btn-cta btn-outline">
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
            <a href={`${APP_URL}/register`} className="btn-cta btn-accent">
              Upgrade ke Pro
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <h2>Rindu udah nungguin kamu lho 💜</h2>
        <p>Yuk mulai atur keuangan hari ini — gratis, gak ribet, tinggal ngobrol aja.</p>
        <a
          href={`${APP_URL}/register`}
          className="btn-cta btn-accent"
          style={{ fontSize: 18, padding: '16px 40px' }}
        >
          Mulai Ngobrol Sekarang
        </a>
      </section>

      {/* FOOTER */}
      <footer>
        <p>
          © 2026 RuangSaku.{' '}
          <a href={`${APP_URL}/privacy`}>Kebijakan Privasi</a> ·{' '}
          <a href={`${APP_URL}/terms`}>Syarat &amp; Ketentuan</a>
        </p>
      </footer>
    </>
  )
}
