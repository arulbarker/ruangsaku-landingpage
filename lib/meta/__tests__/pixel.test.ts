/** @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('pixel', () => {
  beforeEach(() => {
    delete (window as { fbq?: unknown }).fbq
    delete (window as { _fbq?: unknown })._fbq
    vi.resetModules()
  })

  describe('initPixel', () => {
    it('does nothing if no pixel ID in env', async () => {
      vi.stubEnv('NEXT_PUBLIC_META_PIXEL_ID', '')
      const { initPixel } = await import('../pixel')
      initPixel()
      expect((window as { fbq?: unknown }).fbq).toBeUndefined()
    })

    it('initializes fbq queue when pixel ID present', async () => {
      vi.stubEnv('NEXT_PUBLIC_META_PIXEL_ID', '1234567890')
      const { initPixel } = await import('../pixel')
      initPixel()
      expect(typeof (window as { fbq?: unknown }).fbq).toBe('function')
    })

    it('is idempotent', async () => {
      vi.stubEnv('NEXT_PUBLIC_META_PIXEL_ID', '1234567890')
      const { initPixel } = await import('../pixel')
      initPixel()
      const firstFbq = (window as { fbq?: unknown }).fbq
      initPixel()
      expect((window as { fbq?: unknown }).fbq).toBe(firstFbq)
    })
  })

  describe('firePixelEvent', () => {
    it('calls fbq with track + name + data + eventID', async () => {
      const fbqMock = vi.fn()
      ;(window as { fbq?: unknown }).fbq = fbqMock
      const { firePixelEvent } = await import('../pixel')
      firePixelEvent('Lead', { content_name: 'CTA' }, { eventID: 'evt-1' })
      expect(fbqMock).toHaveBeenCalledWith('track', 'Lead', { content_name: 'CTA' }, { eventID: 'evt-1' })
    })

    it('no-ops when fbq not loaded (adblocker)', async () => {
      delete (window as { fbq?: unknown }).fbq
      const { firePixelEvent } = await import('../pixel')
      expect(() => firePixelEvent('Lead', {}, { eventID: 'evt-1' })).not.toThrow()
    })

    it('catches errors from fbq throws', async () => {
      ;(window as { fbq?: unknown }).fbq = vi.fn(() => {
        throw new Error('boom')
      })
      const { firePixelEvent } = await import('../pixel')
      expect(() => firePixelEvent('Lead', {}, { eventID: 'evt-1' })).not.toThrow()
    })
  })

  describe('getFbpFbc', () => {
    it('reads _fbp and _fbc from cookies', async () => {
      Object.defineProperty(document, 'cookie', {
        configurable: true,
        get: () => '_fbp=fb.1.123.456; _fbc=fb.1.aaa.bbb',
      })
      const { getFbpFbc } = await import('../pixel')
      expect(getFbpFbc()).toEqual({ fbp: 'fb.1.123.456', fbc: 'fb.1.aaa.bbb' })
    })

    it('returns undefined for missing cookies', async () => {
      Object.defineProperty(document, 'cookie', {
        configurable: true,
        get: () => 'other=value',
      })
      const { getFbpFbc } = await import('../pixel')
      expect(getFbpFbc()).toEqual({ fbp: undefined, fbc: undefined })
    })
  })
})
