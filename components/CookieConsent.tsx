'use client'

import { useEffect, useState } from 'react'
import { getConsent, setConsent } from '@/lib/meta/consent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (getConsent() === null) setVisible(true)
  }, [])

  function handleGrant() {
    setConsent('granted')
    setVisible(false)
  }

  function handleDeny() {
    setConsent('denied')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      data-testid="cookie-banner"
      style={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: 480,
        width: 'calc(100% - 32px)',
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: 'var(--surface, #FFFFFF)',
          borderRadius: 14,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        }}
      >
        <span style={{ fontSize: 20, flexShrink: 0 }} aria-hidden="true">
          🍪
        </span>
        <p
          style={{
            flex: 1,
            fontSize: 12,
            color: 'var(--text, #1E1535)',
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          Kami pakai analitik dan iklan personalisasi untuk tingkatkan RuangSaku.{' '}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--primary, #5B3FA0)', textDecoration: 'underline' }}
          >
            Privasi
          </a>
        </p>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <button
            type="button"
            onClick={handleDeny}
            style={{
              fontSize: 12,
              color: 'var(--text-muted, #6B5E7B)',
              background: 'none',
              border: 'none',
              padding: '4px 8px',
              cursor: 'pointer',
            }}
          >
            Lewati
          </button>
          <button
            type="button"
            onClick={handleGrant}
            style={{
              fontSize: 12,
              fontWeight: 500,
              padding: '6px 14px',
              borderRadius: 8,
              color: '#fff',
              background: 'var(--primary, #5B3FA0)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Izinkan
          </button>
        </div>
      </div>
    </div>
  )
}
