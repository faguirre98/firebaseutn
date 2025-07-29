import Layout from "../components/Layout/Layout"
import "../styles/Register.css"
import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../config/firebase"
import { useNavigate } from "react-router-dom"



const Register = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)


  const navigate = useNavigate()


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
      await createUserWithEmailAndPassword(auth, email, password)
      setMessage("Usuario registrado con exito.")
      setEmail("")
      setPassword("")
      setTimeout(()=> {
        setMessage("Redirigiendo al Home")
      }, 2000)
      setTimeout(()=> {
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