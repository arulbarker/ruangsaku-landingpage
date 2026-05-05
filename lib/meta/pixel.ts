import type { MetaEventName, MetaCustomData } from './types'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
  }
}

/**
 * Initialize Meta Pixel. Idempotent.
 * Must be called only after consent granted.
 * Reads NEXT_PUBLIC_META_PIXEL_ID from env.
 */
export function initPixel(): void {
  if (typeof window === 'undefined') return
  if (typeof window.fbq === 'function') return // already loaded

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  if (!pixelId) return

  ;(function (f, b, e, v) {
    if (f.fbq) return
    const n: {
      (...args: unknown[]): void
      callMethod?: (...args: unknown[]) => void
      queue: unknown[][]
      push?: (...args: unknown[]) => void
      loaded?: boolean
      version?: string
    } = function (...args: unknown[]) {
      if (n.callMethod) n.callMethod(...args)
      else n.queue.push(args)
    } as unknown as typeof n
    n.queue = []
    n.loaded = true
    n.version = '2.0'
    n.push = n
    f.fbq = n as unknown as Window['fbq']
    if (!f._fbq) f._fbq = n
    const t = b.createElement(e) as HTMLScriptElement
    t.async = true
    t.src = v
    const s = b.getElementsByTagName(e)[0]
    if (s?.parentNode) {
      s.parentNode.insertBefore(t, s)
    } else {
      b.head.appendChild(t)
    }
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')

  const fbq = window.fbq as ((...args: unknown[]) => void) | undefined
  fbq?.('init', pixelId)
  fbq?.('track', 'PageView')
}

interface PixelEventOptions {
  eventID: string
}

/**
 * Fire a tracked event. No-op if fbq not loaded (adblocker safe).
 */
export function firePixelEvent(
  name: MetaEventName,
  data: MetaCustomData = {},
  opts: PixelEventOptions,
): void {
  if (typeof window === 'undefined') return
  if (typeof window.fbq !== 'function') return
  try {
    window.fbq('track', name, data, opts)
  } catch {
    // Silent — pixel script error should not break user flow
  }
}

/**
 * Read _fbp and _fbc cookies from document.cookie.
 * Used to enrich CAPI requests with browser-side click attribution data.
 */
export function getFbpFbc(): { fbp: string | undefined; fbc: string | undefined } {
  if (typeof document === 'undefined') return { fbp: undefined, fbc: undefined }
  const cookies = document.cookie.split(';').map(c => c.trim())
  const find = (name: string) => {
    const found = cookies.find(c => c.startsWith(`${name}=`))
    return found ? found.slice(name.length + 1) : undefined
  }
  return { fbp: find('_fbp'), fbc: find('_fbc') }
}
