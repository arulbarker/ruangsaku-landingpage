import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { hashSha256, buildCapiPayload, sendCapiEvent } from '../capi'

describe('hashSha256', () => {
  it('hashes lowercase trimmed string', () => {
    const expected = '973dfe463ec85785f5f95af5ba3906eedb2d931c24e69824a89ea65dba4e813b'
    expect(hashSha256('  Test@Example.com  ')).toBe(expected)
  })

  it('returns undefined for empty/null/undefined', () => {
    expect(hashSha256('')).toBeUndefined()
    expect(hashSha256('   ')).toBeUndefined()
    expect(hashSha256(null)).toBeUndefined()
    expect(hashSha256(undefined)).toBeUndefined()
  })
})

describe('buildCapiPayload', () => {
  const fixedNow = 1714896000000
  const oldDateNow = Date.now

  beforeEach(() => {
    Date.now = () => fixedNow
  })

  afterEach(() => {
    Date.now = oldDateNow
  })

  it('builds Lead event shape with seconds time', () => {
    const payload = buildCapiPayload({
      event: 'Lead',
      eventId: 'evt-1',
      userData: { fbp: 'fb.1.x.y' },
    })
    expect(payload.data[0].event_name).toBe('Lead')
    expect(payload.data[0].event_time).toBe(1714896000)
    expect(payload.data[0].action_source).toBe('website')
    expect(payload.data[0].user_data).toEqual({ fbp: 'fb.1.x.y' })
  })

  it('omits undefined user_data fields', () => {
    const payload = buildCapiPayload({
      event: 'Lead',
      eventId: 'evt-1',
      userData: { fbp: 'fb.1.x.y', em: undefined, external_id: undefined },
    })
    expect(payload.data[0].user_data).toEqual({ fbp: 'fb.1.x.y' })
  })

  it('includes test_event_code when provided', () => {
    const payload = buildCapiPayload({
      event: 'PageView',
      eventId: 'evt-1',
      userData: {},
      testEventCode: 'TEST123',
    })
    expect(payload.test_event_code).toBe('TEST123')
  })

  it('omits custom_data when not provided', () => {
    const payload = buildCapiPayload({
      event: 'PageView',
      eventId: 'evt-1',
      userData: { fbp: 'x' },
    })
    expect(payload.data[0]).not.toHaveProperty('custom_data')
  })
})

describe('sendCapiEvent', () => {
  const originalEnv = process.env
  const originalFetch = global.fetch

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_META_PIXEL_ID: '1234567890',
      META_CAPI_ACCESS_TOKEN: 'test-token',
      META_CAPI_ENABLED: 'true',
    }
  })

  afterEach(() => {
    process.env = originalEnv
    global.fetch = originalFetch
  })

  it('posts to Graph API with correct URL and body', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ events_received: 1 }),
    })
    global.fetch = mockFetch as unknown as typeof fetch

    await sendCapiEvent({ event: 'Lead', eventId: 'evt-1', userData: {} })

    const [url, init] = mockFetch.mock.calls[0]
    expect(url).toBe('https://graph.facebook.com/v21.0/1234567890/events?access_token=test-token')
    expect(init.method).toBe('POST')
    const body = JSON.parse(init.body as string)
    expect(body.data[0].event_name).toBe('Lead')
  })

  it('throws on 4xx response', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      text: async () => 'bad request',
    }) as unknown as typeof fetch

    await expect(sendCapiEvent({ event: 'Lead', eventId: 'evt-1', userData: {} })).rejects.toThrow(
      /CAPI request failed: 400/,
    )
  })

  it('skips when disabled', async () => {
    process.env.META_CAPI_ENABLED = 'false'
    const mockFetch = vi.fn()
    global.fetch = mockFetch as unknown as typeof fetch

    const result = await sendCapiEvent({ event: 'Lead', eventId: 'evt-1', userData: {} })
    expect(mockFetch).not.toHaveBeenCalled()
    expect(result).toEqual({ skipped: true, reason: 'disabled' })
  })

  it('skips when token missing', async () => {
    delete process.env.META_CAPI_ACCESS_TOKEN
    const mockFetch = vi.fn()
    global.fetch = mockFetch as unknown as typeof fetch

    const result = await sendCapiEvent({ event: 'Lead', eventId: 'evt-1', userData: {} })
    expect(mockFetch).not.toHaveBeenCalled()
    expect(result).toEqual({ skipped: true, reason: 'no_token' })
  })
})
