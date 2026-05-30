'use client'

import { useEffect } from 'react'

const DARK_CHAPTERS = ['ch-01', 'ch-02', 'ch-05']

export function NavThemeManager() {
  useEffect(() => {
    const navEl = document.querySelector('nav.v2-nav')
    if (!navEl) return

    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .reduce<IntersectionObserverEntry | null>(
            (acc, e) =>
              acc === null || e.boundingClientRect.top < acc.boundingClientRect.top ? e : acc,
            null
          )
        if (!top) return
        const id = top.target.id
        if (DARK_CHAPTERS.includes(id)) {
          navEl.classList.add('dark')
        } else {
          navEl.classList.remove('dark')
        }
      },
      { rootMargin: '-15% 0px -70% 0px' }
    )

    document.querySelectorAll('section[id^="ch-"]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return null
}
