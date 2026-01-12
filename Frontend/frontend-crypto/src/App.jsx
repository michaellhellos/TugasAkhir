import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Simulasi from "../pages/Simulasi"
import Belajar from "../pages/Belajar"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/simulasi" element={<Simulasi />} />
        <Route path="/belajar" element={<Belajar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
