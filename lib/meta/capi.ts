import 'server-only'
import { createHash } from 'node:crypto'
import type {
  MetaEventName,
  MetaUserData,
  MetaCustomData,
  MetaCapiRequest,
  MetaCapiEvent,
  MetaCapiResponse,
} from './types'

/**
 * SHA256 hash of trimmed lowercase value.
 * Returns undefined for empty/whitespace/nullish inputs.
 * Meta CAPI requires this format for em/ph/external_id matching.
 *
 * NOTE: For phone numbers, strip all non-digit characters BEFORE calling
 * this function. Meta CAPI expects `ph` as digits-only hash.
 */
export function hashSha256(value: string | undefined | null): string | undefined {
  if (!value) return undefined
  const normalized = value.trim().toLowerCase()
  if (!normalized) return undefined
  return createHash('sha256').update(normalized).digest('hex')
}

export interface BuildCapiPayloadInput {
  event: MetaEventName
  eventId: string
  eventSourceUrl?: string
  userData: MetaUserData
  customData?: MetaCustomData
  testEventCode?: string
}

/**
 * Build a CAPI request body for a single event.
 * Strips undefined keys from user_data and custom_data.
 * Converts Date.now() ms to seconds (Meta CAPI uses seconds).
 */
export function buildCapiPayload(input: BuildCapiPayloadInput): MetaCapiRequest {
  const userData = stripUndefined(input.userData as Record<string, unknown>) as MetaUserData
  const customData = input.customData
    ? (stripUndefined(input.customData) as MetaCustomData)
    : undefined

  const event: MetaCapiEvent = {
    event_name: input.event,
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_id: input.eventId,
    user_data: userData,
    ...(input.eventSourceUrl ? { event_source_url: input.eventSourceUrl } : {}),
    // Omit custom_data if all fields were undefined (stripped to empty object).
    ...(customData && Object.keys(customData).length > 0 ? { custom_data: customData } : {}),
  }

  return {
    data: [event],
    ...(input.testEventCode ? { test_event_code: input.testEventCode } : {}),
  }
}

function stripUndefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const result = {} as Partial<T>
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) result[key as keyof T] = value as T[keyof T]
  }
  return result
}

const META_GRAPH_API_VERSION = 'v21.0'

export type SendCapiResult =
  | { sent: true; response: MetaCapiResponse }
  | { skipped: true; reason: 'disabled' | 'no_token' | 'no_pixel_id' }

interface SendCapiEventInput {
  event: MetaEventName
  eventId: string
  eventSourceUrl?: string
  userData: MetaUserData
  customData?: MetaCustomData
}

/**
 * Send a single event to Meta Conversions API.
 * Skips silently when META_CAPI_ENABLED='false', token missing, or pixel ID missing.
 * Throws on network/HTTP error — caller wraps with try/catch.
 */
export async function sendCapiEvent(input: SendCapiEventInput): Promise<SendCapiResult> {
  if (process.env.META_CAPI_ENABLED === 'false') {
    return { skipped: true, reason: 'disabled' }
  }

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  if (!pixelId) {
    return { skipped: true, reason: 'no_pixel_id' }
  }

  const token = process.env.META_CAPI_ACCESS_TOKEN
  if (!token) {
    return { skipped: true, reason: 'no_token' }
  }

  const testEventCode = process.env.META_CAPI_TEST_EVENT_CODE || undefined

  const body = buildCapiPayload({
    event: input.event,
    eventId: input.eventId,
    eventSourceUrl: input.eventSourceUrl,
    userData: input.userData,
    customData: input.customData,
    testEventCode,
  })

  const url = `https://graph.facebook.com/${META_GRAPH_API_VERSION}/${pixelId}/events?access_token=${token}`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '<unable to read body>')
    throw new Error(`CAPI request failed: ${res.status} ${text}`)
  }

  const json = (await res.json()) as MetaCapiResponse
  return { sent: true, response: json }
}
