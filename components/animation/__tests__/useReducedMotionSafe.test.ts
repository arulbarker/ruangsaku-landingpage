import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import * as fm from 'framer-motion'
import { useReducedMotionSafe } from '../useReducedMotionSafe'

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof fm>('framer-motion')
  return { ...actual, useReducedMotion: vi.fn() }
})

describe('useReducedMotionSafe', () => {
  beforeEach(() => vi.mocked(fm.useReducedMotion).mockReset())

  it('returns reduced=false + identity helpers when motion enabled', () => {
    vi.mocked(fm.useReducedMotion).mockReturnValue(false)
    const { result } = renderHook(() => useReducedMotionSafe())
    expect(result.current.reduced).toBe(false)
    expect(result.current.duration(0.5)).toBe(0.5)
    const full = { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    expect(result.current.variants(full)).toBe(full)
  })

  it('returns reduced=true + zero duration + fallback variants when reduced', () => {
    vi.mocked(fm.useReducedMotion).mockReturnValue(true)
    const { result } = renderHook(() => useReducedMotionSafe())
    expect(result.current.reduced).toBe(true)
    expect(result.current.duration(0.5)).toBe(0)
    const full = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }
    const reduced = result.current.variants(full)
    expect(reduced).not.toBe(full)
    expect(reduced.visible).toMatchObject({ opacity: 1 })
  })
})
