import { chromium, devices } from 'playwright'

const browser = await chromium.launch()
const context = await browser.newContext({ ...devices['iPhone 14 Pro'] })
const page = await context.newPage()
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
await page.locator('#ch-04').scrollIntoViewIfNeeded()
await page.evaluate(() => window.scrollBy(0, 1200))
await page.waitForTimeout(800)

// Inspect inline phone
const info = await page.evaluate(() => {
  const inlinePhone = document.querySelector('.ch04-inline-phone')
  if (!inlinePhone) return { error: 'no inline phone found' }
  const frame = inlinePhone.querySelector('.phone-frame-v2')
  const screen = inlinePhone.querySelector('.phone-screen-v2')
  const img = inlinePhone.querySelector('img')
  if (!img) return { error: 'no img inside' }
  const frameRect = frame?.getBoundingClientRect()
  const screenRect = screen?.getBoundingClientRect()
  const imgRect = img.getBoundingClientRect()
  const imgStyles = window.getComputedStyle(img)
  return {
    frameSize: frameRect ? `${frameRect.width}x${frameRect.height}` : 'n/a',
    screenSize: screenRect ? `${screenRect.width}x${screenRect.height}` : 'n/a',
    imgRect: `${imgRect.width}x${imgRect.height}`,
    imgComputedStyles: {
      width: imgStyles.width,
      height: imgStyles.height,
      objectFit: imgStyles.objectFit,
      position: imgStyles.position,
      display: imgStyles.display,
    },
    imgAttrs: {
      src: img.src.split('/').slice(-2).join('/'),
      width: img.getAttribute('width'),
      height: img.getAttribute('height'),
      style: img.getAttribute('style'),
    },
    parentTag: img.parentElement?.tagName,
    parentStyles: img.parentElement
      ? {
          position: window.getComputedStyle(img.parentElement).position,
          width: window.getComputedStyle(img.parentElement).width,
          height: window.getComputedStyle(img.parentElement).height,
        }
      : null,
  }
})

console.log(JSON.stringify(info, null, 2))
await browser.close()
