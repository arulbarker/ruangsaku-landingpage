// lib/meta/types.ts
// Shared types for Meta Pixel + Conversions API integration

/** Standard Meta event names used in landing. */
export type MetaEventName = 'PageView' | 'ViewContent' | 'Lead'

/** User data parameters for CAPI matching. All PII fields hashed. */
export interface MetaUserData {
  /** Hashed email (SHA256 lowercase trimmed) */
  em?: string
  /** Hashed phone (SHA256, digits only) */
  ph?: string
  /** Hashed external ID — SHA256 of the user UUID */
  external_id?: string
  /** _fbp cookie value, raw */
  fbp?: string
  /** _fbc cookie value, raw */
  fbc?: string
  /** Browser User-Agent header */
  client_user_agent?: string
  /** Client IP from x-forwarded-for first hop */
  client_ip_address?: string
}

/**
 * Custom data per event type (Meta standard fields).
 * Index signature allows future/unknown Meta fields without casting.
 */
export interface MetaCustomData {
  currency?: string
  value?: number
  content_name?: string
  content_category?: string
  content_ids?: string[]
  contents?: Array<{ id: string; quantity: number; item_price: number }>
  order_id?: string
  status?: string
  [key: string]: unknown
}

/** Single CAPI event payload. */
export interface MetaCapiEvent {
  event_name: MetaEventName
  event_time: number
  action_source: 'website'
  /** Page URL. Required for PageView; strongly recommended for all events. */
  event_source_url?: string
  event_id: string
  user_data: MetaUserData
  custom_data?: MetaCustomData
}

/** Full CAPI request body. */
export interface MetaCapiRequest {
  data: MetaCapiEvent[]
  test_event_code?: string
}

/** Response from Graph API /events endpoint. */
export interface MetaCapiResponse {
  events_received: number
  /** Diagnostic messages from the Graph API (typically string warnings). */
  messages?: string[]
  fbtrace_id?: string
}
