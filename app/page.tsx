import Image from 'next/image'
import { ChapterNav } from '@/components/ui/ChapterNav'
import { Chapter01Intro } from '@/components/chapters/Chapter01Intro'

const APP_URL = 'https://app.ruangsaku.com'

export default function LandingPage() {
  return (
    <>
      <nav className="v2-nav visible">
        <a href="#" className="nav-logo">
          <Image src="/icon.png" alt="RuangSaku" width={32} height={32} />
          RuangSaku
        </a>
        <div className="nav-actions">
          <a href={`${APP_URL}/login`} className="nav-login">Masuk</a>
        </div>
      </nav>

      <ChapterNav />

      <main>
        <Chapter01Intro />
        <section id="ch-02" style={{ minHeight: '100vh', background: '#2A1F4E', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2>Chapter 02 placeholder</h2>
        </section>
        <section id="ch-03" style={{ minHeight: '100vh', background: '#5B3FA0', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2>Chapter 03 placeholder</h2>
        </section>
        <section id="ch-04" style={{ minHeight: '100vh', background: '#FAF7FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2>Chapter 04 placeholder</h2>
        </section>
        <section id="ch-05" style={{ minHeight: '100vh', background: '#1E1535', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2>Chapter 05 placeholder</h2>
        </section>
      </main>

      <footer className="v2-footer">
        <p>
          © 2026 RuangSaku.{' '}
          <a href={`${APP_URL}/privacy`}>Kebijakan Privasi</a> ·{' '}
          <a href={`${APP_URL}/terms`}>Syarat &amp; Ketentuan</a>
        </p>
      </footer>
    </>
  )
}
