import type { Metadata } from 'next'
import { MetaPixel } from '@/components/MetaPixel'
import { CookieConsent } from '@/components/CookieConsent'
import './globals.css'

export const metadata: Metadata = {
  title: 'RuangSaku — Teman AI Keuanganmu',
  description:
    'Ngobrol soal uang sesantai curhat ke teman. Rindu bantu kamu catat pengeluaran, pantau tabungan, dan kelola hutang — cukup lewat chat.',
  metadataBase: new URL('https://ruangsaku.com'),
  openGraph: {
    title: 'RuangSaku — Teman AI Keuanganmu',
    description:
      'Kenalan sama Rindu — teman AI yang bantu kamu atur keuangan lewat chat. Gratis!',
    url: 'https://ruangsaku.com',
    siteName: 'RuangSaku',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RuangSaku — Teman AI Keuanganmu',
    description: 'Ngobrol soal uang sesantai curhat ke teman.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>
        <MetaPixel />
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
