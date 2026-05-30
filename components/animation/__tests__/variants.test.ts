import { describe, it, expect } from 'vitest'
import {
  fadeInUp,
  stagger,
  wordReveal,
  phoneEntrance,
  avatarEntrance,
  painSlideIn,
  chatBubbleIn,
  kineticWord,
} from '../variants'

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

describe('v2 chapter variants', () => {
  it('avatarEntrance starts scale 0 rotate -180', () => {
    expect(avatarEntrance.hidden).toMatchObject({ opacity: 0, scale: 0, rotate: -180 })
    expect(avatarEntrance.visible).toMatchObject({ opacity: 1, scale: 1, rotate: 0 })
  })
  it('painSlideIn from y:30 scale:0.96', () => {
    expect(painSlideIn.hidden).toMatchObject({ y: 30, scale: 0.96 })
  })
  it('chatBubbleIn from y:14 scale:0.95', () => {
    expect(chatBubbleIn.hidden).toMatchObject({ y: 14, scale: 0.95 })
  })
  it('kineticWord from opacity:0.2 y:12', () => {
    expect(kineticWord.hidden).toMatchObject({ opacity: 0.2, y: 12 })
  })
})
