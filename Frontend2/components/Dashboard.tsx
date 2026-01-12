import React from "react";
import "../styles/dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h2 className="brand">Kripto-Z</h2>
          <p className="level">Level 5 • Streak 🔥 3 Hari</p>
        </div>
        <div className="avatar">👤</div>
      </header>

      {/* Total Asset */}
      <section className="card total-asset">
        <h4>Total Aset Virtual</h4>
        <div className="asset-main">
          <h1>$16,700.44</h1>
          <span className="profit">+$6,700.44 (67.00%)</span>
        </div>

        <div className="asset-detail">
          <div>
            <p>Uang Virtual (Cash)</p>
            <strong>$10,000.00</strong>
          </div>
          <div>
            <p>Nilai Aset Kripto</p>
            <strong>$6,700.44</strong>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="card">
        <h3>Portofolio Kamu</h3>

        <div className="portfolio-item">
          <div className="coin">
            <span className="icon btc">₿</span>
            <div>
              <strong>Bitcoin</strong>
              <p>0.0500 BTC</p>
            </div>
          </div>
          <div className="price">
            <strong>$3,335.81</strong>
            <span className="loss">-$66,716.12</span>
          </div>
        </div>

        <div className="portfolio-item">
          <div className="coin">
            <span className="icon eth">◆</span>
            <div>
              <strong>Ethereum</strong>
              <p>1.0000 ETH</p>
            </div>
          </div>
          <div className="price">
            <strong>$3,364.64</strong>
            <span className="neutral">$3,364.64</span>
          </div>
        </div>
      </section>

      {/* Market */}
      <section className="card">
        <div className="market-header">
          <h3>Pasar Kripto</h3>
          <button>⭐ Semua Aset</button>
        </div>

        <div className="market-item">
          <div className="coin">
            <span className="star">⭐</span>
            <span className="icon btc">₿</span>
            <strong>BTC</strong>
          </div>
          <span className="market-price">$66,716.12</span>
          <span className="down">-2.04%</span>
        </div>

        <div className="market-item">
          <div className="coin">
            <span className="star">⭐</span>
            <span className="icon eth">◆</span>
            <strong>ETH</strong>
          </div>
          <span className="market-price">$3,364.64</span>
          <span className="down">-0.15%</span>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <span className="active">🏠 Beranda</span>
        <span>📊 Simulasi</span>
        <span>📘 Belajar</span>
        <span>👥 Komunitas</span>
        <span>🤖 AI Mentor</span>
      </nav>
    </div>
  );
};

export default Dashboard;
