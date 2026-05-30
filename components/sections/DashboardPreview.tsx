import Image from 'next/image'

export function DashboardPreview() {
  return (
    <section className="dashboard-preview" id="dashboard">
      <div className="section-header">
        <h2>
          Dashboard yang hidup,
          <br />
          bukan sekadar angka.
        </h2>
        <p>
          Setiap chat ke Rindu update dashboard otomatis. Saldo, kekayaan, hutang,
          tabungan, tren pengeluaran — semua di satu layar, real-time.
        </p>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="phone-frame">
            <div className="phone-notch" />
            <Image
              src="/dashboard-1.png"
              alt="Dashboard saldo dan total kekayaan"
              width={1920}
              height={899}
              className="phone-screen"
              priority
            />
          </div>
          <div className="dashboard-caption">
            <span className="caption-tag">Ringkasan</span>
            <h3>Saldo & Kekayaan</h3>
            <p>Total semua dompet, breakdown kas + tabungan + aset + piutang − hutang.</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="phone-frame">
            <div className="phone-notch" />
            <Image
              src="/dashboard-2.png"
              alt="Breakdown kekayaan, saldo dompet, dan kategori pengeluaran"
              width={430}
              height={900}
              className="phone-screen"
            />
          </div>
          <div className="dashboard-caption">
            <span className="caption-tag">Breakdown</span>
            <h3>Dompet & Kategori</h3>
            <p>Total kekayaan per kategori, saldo tiap dompet, & top kategori pengeluaran bulan ini.</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="phone-frame">
            <div className="phone-notch" />
            <Image
              src="/dashboard-3.png"
              alt="Tren pengeluaran dan transaksi terakhir"
              width={1920}
              height={899}
              className="phone-screen"
            />
          </div>
          <div className="dashboard-caption">
            <span className="caption-tag">Insight</span>
            <h3>Tren & Riwayat</h3>
            <p>Grafik harian/6 bulan + 7 hari terakhir, lengkap dengan todo rutin.</p>
          </div>
        </div>
      </div>

      <div className="dashboard-footnote">
        <span>📊</span>
        <span>Update otomatis setiap kali kamu ngobrol — tanpa input manual.</span>
      </div>
    </section>
  )
}
