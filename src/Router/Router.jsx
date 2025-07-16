import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../views/Home"
import Dashboard from "../views/Dashboard"
import Register from "../views/Register"
import Login from "../Views/Login"

// Crear un componente que valide que vista quiere ver el usuario

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*"  element={<img src="https://st4.depositphotos.com/5686152/27322/v/450/depositphotos_273220330-stock-illustration-sorry-page-found-404-error.jpg" style={{ display: "block", margin: "0 auto" }}
      alt="404 - Página no encontrada"
    />
  }
/>
      </Routes>
    </BrowserRouter>
  )
}

export { Router }