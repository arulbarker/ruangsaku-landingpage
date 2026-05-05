import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/meta/capi', () => ({
  sendCapiEvent: vi.fn().mockResolvedValue({ sent: true, response: { events_received: 1 } }),
  hashSha256: (s: string) => `hashed-${s}`,
}))

import { sendCapiEvent } from '@/lib/meta/capi'
const mockSend = sendCapiEvent as unknown as ReturnType<typeof vi.fn>

async function callRoute(body: unknown, headers: Record<string, string> = {}) {
  const { POST } = await import('../route')
  const req = new Request('http://localhost/api/meta/capi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  })
  return POST(req)
}

describe('POST /api/meta/capi (landing)', () => {
  beforeEach(() => mockSend.mockClear())

  it('400 on invalid event name', async () => {
    const res = await callRoute({ event: 'InvalidEvent', eventId: 'evt-1' })
    expect(res.status).toBe(400)
  })

  it('400 on missing eventId', async () => {
    const res = await callRoute({ event: 'Lead' })
    expect(res.status).toBe(400)
  })

  it('400 on non-uuid eventId', async () => {
    const res = await callRoute({ event: 'Lead', eventId: 'not-a-uuid' })
    expect(res.status).toBe(400)
  })

  it('rejects Purchase event (security)', async () => {
    const res = await callRoute({
      event: 'Purchase',
      eventId: '550e8400-e29b-41d4-a716-446655440000',
    })
    expect(res.status).toBe(400)
  })

  it('rejects CompleteRegistration event (security)', async () => {
    const res = await callRoute({
      event: 'CompleteRegistration',
      eventId: '550e8400-e29b-41d4-a716-446655440000',
    })
    expect(res.status).toBe(400)
  })

  it('forwards Lead to sendCapiEvent with userData from headers/cookies', async () => {
    const res = await callRoute(
      {
        event: 'Lead',
        eventId: '550e8400-e29b-41d4-a716-446655440000',
        customData: { content_name: 'CTA' },
      },
      {
        cookie: '_fbp=fb.1.x.y; _fbc=fb.1.a.b',
        'user-agent': 'TestUA',
        'x-forwarded-for': '1.2.3.4, 5.6.7.8',
        referer: 'https://ruangsaku.com/',
      },
    )
    expect(res.status).toBe(200)
    expect(mockSend).toHaveBeenCalledOnce()
    const arg = mockSend.mock.calls[0][0]
    expect(arg.event).toBe('Lead')
    expect(arg.userData.fbp).toBe('fb.1.x.y')
    expect(arg.userData.fbc).toBe('fb.1.a.b')
    expect(arg.userData.client_user_agent).toBe('TestUA')
    expect(arg.userData.client_ip_address).toBe('1.2.3.4')
    expect(arg.eventSourceUrl).toBe('https://ruangsaku.com/')
  })

  it('hashes email when provided', async () => {
    await callRoute({
      event: 'Lead',
      eventId: '550e8400-e29b-41d4-a716-446655440000',
      email: 'user@example.com',
    })
    const arg = mockSend.mock.calls[0][0]
    expect(arg.userData.em).toBe('hashed-user@example.com')
  })

  it('returns 200 even when sendCapiEvent throws (silent)', async () => {
    mockSend.mockRejectedValueOnce(new Error('graph 500'))
    const res = await callRoute({
      event: 'Lead',
      eventId: '550e8400-e29b-41d4-a716-446655440000',
    })
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
  })

  it('accepts ViewContent event', async () => {
    const res = await callRoute({
      event: 'ViewContent',
      eventId: '550e8400-e29b-41d4-a716-446655440000',
      customData: { content_name: 'pricing_section' },
    })
    expect(res.status).toBe(200)
    expect(mockSend).toHaveBeenCalledOnce()
    expect(mockSend.mock.calls[0][0].event).toBe('ViewContent')
  })
})
