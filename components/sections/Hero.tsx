'use client'

import Image from 'next/image'
import { trackLead } from '@/lib/meta/events'

const APP_URL = 'https://app.ruangsaku.com'

function handleCtaClick(contentName: string) {
  void trackLead({ contentName })
}

export function Hero() {
  return (
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
            <a href={`${APP_URL}/register`} className="btn-cta btn-accent" onClick={() => handleCtaClick('CTA: Hero Daftar Gratis')}>
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
  )
}
