'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
import { DashboardPreview } from '@/components/sections/DashboardPreview'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Pricing } from '@/components/sections/Pricing'
import { FinalCta } from '@/components/sections/FinalCta'
import { Footer } from '@/components/sections/Footer'

const APP_URL = 'https://app.ruangsaku.com'

export default function LandingPage() {
  useEffect(() => {
    const handleScroll = () => {
      document.querySelector('nav')?.classList.toggle('scrolled', window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
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

      <Hero />
      <Features />
      <DashboardPreview />
      <HowItWorks />
      <Pricing />
      <FinalCta />
      <Footer />
    </>
  )
}
