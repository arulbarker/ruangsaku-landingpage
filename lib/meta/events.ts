'use client'

import { firePixelEvent } from './pixel'
import type { MetaCustomData } from './types'

interface TrackLeadInput {
  contentName: string
  contentCategory?: string
  email?: string
}

/**
 * Fire Lead event via Pixel + CAPI in parallel with same event_id for dedup.
 * Fire-and-forget — fetch errors are silenced (server-side capture in API route).
 */
export async function trackLead(input: TrackLeadInput): Promise<void> {
  const eventId = crypto.randomUUID()
  const customData: MetaCustomData = {
    content_name: input.contentName,
    content_category: input.contentCategory ?? 'signup_intent',
  }

  firePixelEvent('Lead', customData, { eventID: eventId })

  try {
    await fetch('/api/meta/capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'Lead',
        eventId,
        customData,
        ...(input.email ? { email: input.email } : {}),
      }),
    })
  } catch {
    // Silent — server-side endpoint already captures errors via Sentry
  }
}
