// Quick mobile screenshot script — captures each Ch 04 caption block at iPhone 14 viewport
import { chromium, devices } from 'playwright'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'screenshots-debug')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

const URL = process.env.URL || 'http://localhost:3000'

const browser = await chromium.launch()
const context = await browser.newContext({
  ...devices['iPhone 14 Pro'],
})
const page = await context.newPage()

console.log(`Navigating to ${URL}...`)
await page.goto(URL, { waitUntil: 'networkidle' })
await page.waitForTimeout(2000)

// Full page screenshot
await page.screenshot({ path: path.join(outDir, 'mobile-fullpage.png'), fullPage: true })
console.log('✓ Full page screenshot saved')

// Scroll to Ch 04 specifically
const ch4 = await page.locator('#ch-04')
await ch4.scrollIntoViewIfNeeded()
await page.waitForTimeout(800)

// Capture viewport at Ch 04 start
await page.screenshot({ path: path.join(outDir, 'mobile-ch04-top.png') })
console.log('✓ Ch 04 top screenshot saved')

// Scroll through Ch 04
for (let i = 0; i < 4; i++) {
  await page.evaluate(() => window.scrollBy(0, 500))
  await page.waitForTimeout(600)
  await page.screenshot({ path: path.join(outDir, `mobile-ch04-scroll-${i + 1}.png`) })
  console.log(`✓ Ch 04 scroll ${i + 1} saved`)
}

await browser.close()
console.log(`\nScreenshots in: ${outDir}`)
