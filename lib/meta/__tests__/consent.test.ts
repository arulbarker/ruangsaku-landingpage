/** @vitest-environment jsdom */
import { describe, it, expect, beforeEach } from 'vitest'
import { getConsent, setConsent, CONSENT_KEY } from '../consent'

describe('consent', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns null when no consent stored', () => {
    expect(getConsent()).toBeNull()
  })

  it('stores and retrieves granted', () => {
    setConsent('granted')
    expect(getConsent()).toBe('granted')
    expect(localStorage.getItem(CONSENT_KEY)).toBe('granted')
  })

  it('stores and retrieves denied', () => {
    setConsent('denied')
    expect(getConsent()).toBe('denied')
  })

  it('dispatches cookie_consent_change event on setConsent', () => {
    let fired = false
    window.addEventListener('cookie_consent_change', () => {
      fired = true
    })
    setConsent('granted')
    expect(fired).toBe(true)
  })
})
