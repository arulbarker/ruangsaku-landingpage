'use client'

import { useEffect, useState } from 'react'

const CHAPTERS = [
  { id: 'ch-01', label: 'Intro' },
  { id: 'ch-02', label: 'Masalah' },
  { id: 'ch-03', label: 'Kenalan' },
  { id: 'ch-04', label: 'Solusi' },
  { id: 'ch-05', label: 'Yuk!' },
] as const

export function ChapterNav() {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return
        const top = visible.reduce((acc, e) =>
          e.boundingClientRect.top < acc.boundingClientRect.top ? e : acc
        )
        const idx = CHAPTERS.findIndex((c) => c.id === top.target.id)
        if (idx >= 0) setActiveIdx(idx)
      },
      { threshold: 0.3, rootMargin: '-20% 0px -20% 0px' }
    )
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="chapter-nav" aria-label="Chapter navigation">
      <ul>
        {CHAPTERS.map((c, i) => (
          <li key={c.id}>
            <button
              onClick={() => handleClick(c.id)}
              aria-label={`Go to ${c.label}`}
              aria-current={i === activeIdx ? 'true' : undefined}
              className={i === activeIdx ? 'active' : ''}
            >
              <span className="dot" />
              <span className="label">{c.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
