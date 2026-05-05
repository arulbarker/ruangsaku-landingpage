'use client'

import { useEffect } from 'react'
import { getConsent } from '@/lib/meta/consent'
import { initPixel } from '@/lib/meta/pixel'

export function MetaPixel() {
  useEffect(() => {
    if (getConsent() === 'granted') initPixel()

    const onChange = () => {
      if (getConsent() === 'granted') initPixel()
    }
    window.addEventListener('cookie_consent_change', onChange)
    return () => window.removeEventListener('cookie_consent_change', onChange)
  }, [])

  return null
}
