'use client'

import { trackLead } from '@/lib/meta/events'

const APP_URL = 'https://app.ruangsaku.com'

function handleCtaClick(contentName: string) {
  void trackLead({ contentName })
}

export function FinalCta() {
  return (
    <section className="final-cta">
      <h2>Rindu udah nungguin kamu lho 💜</h2>
      <p>Yuk mulai atur keuangan hari ini — gratis, gak ribet, tinggal ngobrol aja.</p>
      <a
        href={`${APP_URL}/register`}
        className="btn-cta btn-accent"
        style={{ fontSize: 18, padding: '16px 40px' }}
        onClick={() => handleCtaClick('CTA: Final Mulai Ngobrol')}
      >
        Mulai Ngobrol Sekarang
      </a>
    </section>
  )
}
