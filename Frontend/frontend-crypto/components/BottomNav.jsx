import "./bottomnav.css"

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <span className="active">🏠<p>Beranda</p></span>
      <span>📈<p>Simulasi</p></span>
      <span>📘<p>Belajar</p></span>
      <span>👥<p>Komunitas</p></span>
      <span>🤖<p>AI Mentor</p></span>
    </nav>
  )
}

export default BottomNav
