import Layout from "../components/Layout/Layout"
import "../styles/Register.css"
import { useState } from "react"
import { auth } from "../config/firebase"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"



const Register = () => {
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)


  const navigate = useNavigate()
  const { register } = useAuth()


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    if (!email || !password) {
      setError("Por favor, completa todos los campos.")
      return
    }

    //intentar guardo o registrar un usuario
    try {
      await register(email, password)
      setMessage("Usuario registrado con exito.")
      setEmail("")
      setPassword("")
      setTimeout(() => {
        setMessage("Redirigiendo al Home")
      }, 2000)
      setTimeout(() => {
        navigate("/")
      }, 3000)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <Layout>
      <section id="register-section">
        <h1>Registrate</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)} />

          <label htmlFor="lastname">Lastname:</label>
          <input type="lastname" name="lastname" id="lastname" onChange={(e) => setLastname(e.target.value)} />

          <label htmlFor="email">Correo electrónico:</label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="password">Contraseña:</label>
          <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />

          <button>Registrarme</button>
        </form>
        <p className="error-message">{error}</p>
        <h5 className="success-message">{message}</h5>
      </section>
    </Layout>
  )
}

export default Register