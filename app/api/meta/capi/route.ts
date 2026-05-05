import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sendCapiEvent, hashSha256 } from '@/lib/meta/capi'

// Reject Purchase/Reg/IC from client (security — would let attacker fake conversions).
// Landing only fires Lead and ViewContent.
const schema = z.object({
  event: z.enum(['Lead', 'ViewContent']),
  eventId: z.string().uuid(),
  email: z.string().email().optional(),
  customData: z.record(z.string(), z.unknown()).optional(),
})

export async function POST(req: Request): Promise<Response> {
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'invalid_body', details: parsed.error.issues },
      { status: 400 },
    )
  }

  const { event, eventId, email, customData } = parsed.data

  const cookieHeader = req.headers.get('cookie') ?? ''
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(c => {
      const [k, ...v] = c.trim().split('=')
      return [k, v.join('=')]
    }),
  )
  const fbp = cookies['_fbp']
  const fbc = cookies['_fbc']
  const ua = req.headers.get('user-agent') ?? undefined
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const referer = req.headers.get('referer') ?? undefined

  try {
    await sendCapiEvent({
      event,
      eventId,
      eventSourceUrl: referer,
      userData: {
        em: hashSha256(email),
        fbp,
        fbc,
        client_user_agent: ua,
        client_ip_address: ip,
      },
      customData,
    })
  } catch (err) {
    // Silent — return 200. Vercel logs capture the failure for debugging.
    console.error('[meta-capi] send failed:', err)
  }

  return NextResponse.json({ success: true })
}
