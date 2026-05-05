/** @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'

vi.mock('@/lib/meta/pixel', () => ({
  initPixel: vi.fn(),
}))

import { initPixel } from '@/lib/meta/pixel'
const mockInit = initPixel as unknown as ReturnType<typeof vi.fn>

describe('<MetaPixel />', () => {
  beforeEach(() => {
    localStorage.clear()
    mockInit.mockClear()
  })

  it('does not init when consent missing', async () => {
    const { MetaPixel } = await import('../MetaPixel')
    render(<MetaPixel />)
    expect(mockInit).not.toHaveBeenCalled()
  })

  it('inits when consent already granted', async () => {
    localStorage.setItem('cookie_consent', 'granted')
    const { MetaPixel } = await import('../MetaPixel')
    render(<MetaPixel />)
    expect(mockInit).toHaveBeenCalled()
  })

  it('inits on cookie_consent_change to granted', async () => {
    const { MetaPixel } = await import('../MetaPixel')
    render(<MetaPixel />)
    expect(mockInit).not.toHaveBeenCalled()

    localStorage.setItem('cookie_consent', 'granted')
    window.dispatchEvent(new Event('cookie_consent_change'))
    expect(mockInit).toHaveBeenCalled()
  })

  it('does not init on cookie_consent_change when denied', async () => {
    const { MetaPixel } = await import('../MetaPixel')
    render(<MetaPixel />)
    localStorage.setItem('cookie_consent', 'denied')
    window.dispatchEvent(new Event('cookie_consent_change'))
    expect(mockInit).not.toHaveBeenCalled()
  })
})
