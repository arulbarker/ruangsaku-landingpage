/** @vitest-environment jsdom */
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CookieConsent } from '../CookieConsent'

describe('<CookieConsent />', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders banner when no consent stored', () => {
    render(<CookieConsent />)
    expect(screen.getByText(/Izinkan/i)).toBeInTheDocument()
    expect(screen.getByText(/Lewati/i)).toBeInTheDocument()
  })

  it('does not render when consent already granted', () => {
    localStorage.setItem('cookie_consent', 'granted')
    const { container } = render(<CookieConsent />)
    expect(container.querySelector('[data-testid="cookie-banner"]')).toBeNull()
  })

  it('does not render when consent denied', () => {
    localStorage.setItem('cookie_consent', 'denied')
    const { container } = render(<CookieConsent />)
    expect(container.querySelector('[data-testid="cookie-banner"]')).toBeNull()
  })

  it('stores granted on Izinkan click', () => {
    render(<CookieConsent />)
    fireEvent.click(screen.getByText(/Izinkan/i))
    expect(localStorage.getItem('cookie_consent')).toBe('granted')
  })

  it('stores denied on Lewati click', () => {
    render(<CookieConsent />)
    fireEvent.click(screen.getByText(/Lewati/i))
    expect(localStorage.getItem('cookie_consent')).toBe('denied')
  })

  it('mentions privacy link', () => {
    render(<CookieConsent />)
    const link = screen.getByText(/Privasi/i)
    expect(link.getAttribute('href')).toBe('/privacy')
  })
})
