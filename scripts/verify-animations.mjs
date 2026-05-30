// Verify animations: capture phone reveal mid-animation + idle float
import { chromium, devices } from 'playwright'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'screenshots-debug', 'animations')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch()
const context = await browser.newContext({ ...devices['iPhone 14 Pro'] })
const page = await context.newPage()
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
await page.waitForTimeout(1000)

await page.locator('#ch-04').scrollIntoViewIfNeeded()
await page.waitForTimeout(500)

// Inspect first inline phone state at scroll-in moment
for (let i = 0; i < 3; i++) {
  await page.evaluate(() => window.scrollBy(0, 400))
  await page.waitForTimeout(150)  // catch mid-animation
  await page.screenshot({ path: path.join(outDir, `phone-reveal-mid-${i}.png`) })
}

// Idle state — wait for float animation peak
await page.waitForTimeout(1500)
await page.screenshot({ path: path.join(outDir, 'phone-idle-1.png') })
await page.waitForTimeout(2000)
await page.screenshot({ path: path.join(outDir, 'phone-idle-2.png') })

// Inspect computed styles for confirmation
const animState = await page.evaluate(() => {
  const phones = document.querySelectorAll('.ch04-inline-phone .phone-frame-v2')
  return Array.from(phones).map((p, i) => {
    const cs = window.getComputedStyle(p)
    const rect = p.getBoundingClientRect()
    return {
      idx: i,
      animationName: cs.animationName,
      animationDuration: cs.animationDuration,
      boxShadow: cs.boxShadow.substring(0, 80) + '...',
      visible: rect.top < window.innerHeight && rect.bottom > 0,
      transform: cs.transform,
    }
  })
})

console.log(JSON.stringify(animState, null, 2))
await browser.close()
console.log(`\nScreenshots: ${outDir}`)
