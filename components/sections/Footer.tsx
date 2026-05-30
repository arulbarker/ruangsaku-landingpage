const APP_URL = 'https://app.ruangsaku.com'

export function Footer() {
  return (
    <footer>
      <p>
        © 2026 RuangSaku.{' '}
        <a href={`${APP_URL}/privacy`}>Kebijakan Privasi</a> ·{' '}
        <a href={`${APP_URL}/terms`}>Syarat &amp; Ketentuan</a>
      </p>
    </footer>
  )
}
