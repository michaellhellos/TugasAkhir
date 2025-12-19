import "../styles/login.css"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    // sementara tanpa validasi (TA aman)
    navigate("/dashboard")
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="logo">Kripto-Z</h1>
        <p className="subtitle">Login User / Admin</p>

        <div className="form-group">
          <label>Username / Email</label>
          <input type="email" placeholder="admin@gmail.com" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" />
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Masuk ⚡
        </button>

        <p className="register-text">
          Belum punya akun? <span>Daftar dulu</span>
        </p>
      </div>
    </div>
  )
}

export default Login
