import { NavLink } from "react-router-dom";
import "./bottomnav.css";

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        🏠
        <p>Beranda</p>
      </NavLink>

      <NavLink
        to="/simulasi"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        📈
        <p>Simulasi</p>
      </NavLink>

      <NavLink to="/belajar">
        📘
        <p>Belajar</p>
      </NavLink>

      <NavLink to="/komunitas">
        👥
        <p>Komunitas</p>
      </NavLink>

      <NavLink to="/ai-mentor">
        🤖
        <p>AI Mentor</p>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
