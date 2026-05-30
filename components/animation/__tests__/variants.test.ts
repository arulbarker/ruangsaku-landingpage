import { describe, it, expect } from 'vitest'
import { fadeInUp, stagger, wordReveal, phoneEntrance } from '../variants'

describe('animation variants', () => {
  it('fadeInUp moves from y:24 + opacity:0 to y:0 + opacity:1', () => {
    expect(fadeInUp.hidden).toEqual({ opacity: 0, y: 24 })
    expect(fadeInUp.visible).toMatchObject({ opacity: 1, y: 0 })
  })

  it('stagger() returns variants with staggerChildren at given delay', () => {
    const v = stagger(0.08)
    expect(v.visible).toEqual({ transition: { staggerChildren: 0.08 } })
  })

  it('wordReveal animates opacity from 0.18 to 1', () => {
    expect(wordReveal.hidden).toMatchObject({ opacity: 0.18 })
    expect(wordReveal.visible).toMatchObject({ opacity: 1 })
  })

  it('phoneEntrance animates from y:40 + scale:0.96 to neutral', () => {
    expect(phoneEntrance.hidden).toMatchObject({ opacity: 0, y: 40, scale: 0.96 })
    expect(phoneEntrance.visible).toMatchObject({ opacity: 1, y: 0, scale: 1 })
  })
})
