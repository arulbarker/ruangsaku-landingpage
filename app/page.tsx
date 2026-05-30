import Image from 'next/image'
import { ChapterNav } from '@/components/ui/ChapterNav'
import { NavThemeManager } from '@/components/ui/NavThemeManager'
import { Chapter01Intro } from '@/components/chapters/Chapter01Intro'
import { Chapter02Problem } from '@/components/chapters/Chapter02Problem'
import { Chapter03MeetRindu } from '@/components/chapters/Chapter03MeetRindu'
import { Chapter04Solution } from '@/components/chapters/Chapter04Solution'
import { Chapter05Climax } from '@/components/chapters/Chapter05Climax'
import { ChapterTransition } from '@/components/chapters/ChapterTransition'

const APP_URL = 'https://app.ruangsaku.com'

export default function LandingPage() {
  return (
    <>
      <nav className="v2-nav visible dark">
        <a href="#" className="nav-logo">
          <Image src="/icon.png" alt="RuangSaku" width={32} height={32} />
          RuangSaku
        </a>
        <div className="nav-actions">
          <a href={`${APP_URL}/login`} className="nav-login">Masuk</a>
        </div>
      </nav>

      <ChapterNav />
      <NavThemeManager />

      <main>
        <Chapter01Intro />
        <ChapterTransition fromColor="#1E1535" toColor="#1E1535" />
        <Chapter02Problem />
        <ChapterTransition fromColor="#1E1535" toColor="#5B3FA0" />
        <Chapter03MeetRindu />
        <ChapterTransition fromColor="#7B5FC0" toColor="#FAF7FF" />
        <Chapter04Solution />
        <ChapterTransition fromColor="#F0EAFF" toColor="#1E1535" />
        <Chapter05Climax />
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
