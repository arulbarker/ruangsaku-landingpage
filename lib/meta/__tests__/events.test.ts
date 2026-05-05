/** @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('trackLead', () => {
  beforeEach(() => {
    delete (window as { fbq?: unknown }).fbq
    vi.resetAllMocks()
  })

  it('fires Pixel + POST to /api/meta/capi with same eventId', async () => {
    const fbqMock = vi.fn()
    ;(window as { fbq?: unknown }).fbq = fbqMock
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) })
    vi.stubGlobal('fetch', fetchMock)
    vi.stubGlobal('crypto', { randomUUID: () => 'fixed-uuid-1' })

    const { trackLead } = await import('../events')
    await trackLead({ contentName: 'CTA: Daftar' })

    expect(fbqMock).toHaveBeenCalledWith(
      'track',
      'Lead',
      expect.objectContaining({ content_name: 'CTA: Daftar', content_category: 'signup_intent' }),
      { eventID: 'fixed-uuid-1' },
    )
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/meta/capi',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string)
    expect(body).toMatchObject({
      event: 'Lead',
      eventId: 'fixed-uuid-1',
      customData: expect.objectContaining({ content_name: 'CTA: Daftar' }),
    })
  })

  it('does not throw if fetch rejects (network/abort)', async () => {
    ;(window as { fbq?: unknown }).fbq = vi.fn()
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network')))
    vi.stubGlobal('crypto', { randomUUID: () => 'fixed-uuid-2' })

    const { trackLead } = await import('../events')
    await expect(trackLead({ contentName: 'X' })).resolves.toBeUndefined()
  })

  it('includes email in body when provided', async () => {
    ;(window as { fbq?: unknown }).fbq = vi.fn()
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) })
    vi.stubGlobal('fetch', fetchMock)
    vi.stubGlobal('crypto', { randomUUID: () => 'evt-3' })

    const { trackLead } = await import('../events')
    await trackLead({ contentName: 'Newsletter', email: 'user@example.com' })

    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string)
    expect(body.email).toBe('user@example.com')
  })
})
