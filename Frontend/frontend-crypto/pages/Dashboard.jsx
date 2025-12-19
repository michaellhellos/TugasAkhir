import "../styles/dashboard.css"
import BottomNav from "../components/BottomNav"

const Dashboard = () => {
  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <header className="top-bar">
        <div>
          <h1 className="brand">Kripto-Z</h1>
          <p className="level">Level 5 · Streak 🔥 3 Hari</p>
        </div>
        <div className="avatar">👤</div>
      </header>

      {/* TOTAL ASET */}
      <section className="card asset-card">
        <p className="card-title">Total Aset Virtual</p>

        <div className="asset-value">
          <h2>$17,391.53</h2>
          <span className="profit">+$7,391.53 (73.92%)</span>
        </div>

        <div className="asset-detail">
          <div>
            <p>Uang Virtual (Cash)</p>
            <strong>$10,000.00</strong>
          </div>
          <div>
            <p>Nilai Aset Kripto</p>
            <strong>$7,391.53</strong>
          </div>
        </div>
      </section>

      {/* PORTOFOLIO */}
      <section className="card">
        <h3 className="section-title">Portofolio Kamu</h3>

        <div className="portfolio-item">
          <div className="coin">
            <span className="coin-icon btc">₿</span>
            <div>
              <h4>Bitcoin</h4>
              <p>0.0500 BTC</p>
            </div>
          </div>
          <div className="coin-value">
            <strong>$3,513.96</strong>
            <span className="green">+$70,279.23</span>
          </div>
        </div>

        <div className="portfolio-item">
          <div className="coin">
            <span className="coin-icon eth">◆</span>
            <div>
              <h4>Ethereum</h4>
              <p>1.0000 ETH</p>
            </div>
          </div>
          <div className="coin-value">
            <strong>$3,877.57</strong>
            <span className="green">$3,877.57</span>
          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  )
}

export default Dashboard
