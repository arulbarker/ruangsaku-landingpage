export function Features() {
  return (
    <section className="features" id="fitur">
      <div className="section-header">
        <h2>
          Semua lewat chat.
          <br />
          Satu teman, semua urusan uang.
        </h2>
        <p>Gak perlu buka spreadsheet atau app ribet. Tinggal bilang ke Rindu, dia yang urus.</p>
      </div>

      <div className="chat-features">
        <div className="chat-feature">
          <div className="feature-bubble">
            <div className="feature-icon">📝</div>
            <h3>Catat Pengeluaran</h3>
            <p>&quot;Beli kopi 25rb&quot; — done! Rindu langsung tau kategorinya dan catat ke dompet yang bener.</p>
          </div>
          <div className="connector"><div className="connector-dot" /></div>
        </div>
        <div className="chat-feature">
          <div className="connector"><div className="connector-dot" /></div>
          <div className="feature-bubble">
            <div className="feature-icon">🎯</div>
            <h3>Pantau Tabungan</h3>
            <p>&quot;Nabung 500rb buat umroh&quot; — Rindu pantau terus progressnya dan kasih semangat tiap milestone.</p>
          </div>
        </div>
        <div className="chat-feature">
          <div className="feature-bubble">
            <div className="feature-icon">💸</div>
            <h3>Kelola Hutang</h3>
            <p>&quot;Budi hutang 200rb&quot; — Rindu yang ingetin, siapa hutang berapa dan kapan deadline-nya.</p>
          </div>
          <div className="connector"><div className="connector-dot" /></div>
        </div>
        <div className="chat-feature">
          <div className="connector"><div className="connector-dot" /></div>
          <div className="feature-bubble">
            <div className="feature-icon">📊</div>
            <h3>Dashboard Pintar</h3>
            <p>Saldo semua dompet, tren pengeluaran, budget — semuanya update sendiri, gak perlu input manual.</p>
          </div>
        </div>
        <div className="chat-feature">
          <div className="feature-bubble">
            <div className="feature-icon">🔔</div>
            <h3>Reminder Otomatis</h3>
            <p>Pagi Rindu kasih tau sisa budget, malem recap pengeluaran. Tagihan? Diingetin 3 hari sebelumnya.</p>
          </div>
          <div className="connector"><div className="connector-dot" /></div>
        </div>
      </div>
    </section>
  )
}
