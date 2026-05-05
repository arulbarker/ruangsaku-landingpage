'use client'

export const CONSENT_KEY = 'cookie_consent'
export type ConsentValue = 'granted' | 'denied'

export function getConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(CONSENT_KEY) as ConsentValue | null
}

export function setConsent(value: ConsentValue): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CONSENT_KEY, value)
  window.dispatchEvent(new Event('cookie_consent_change'))
}
