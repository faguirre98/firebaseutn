import { useEffect, useState } from "react"
import "./Main.css"
import { db } from "../../config/firebase"
import { collection, getDocs } from "firebase/firestore"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"


const Main = () => {
  const [productos, setProductos] = useState([])
  const [error, setError] = useState(null)
  // simulación de usuario conectado
  const [user, setUser] = useState(true)

  const fetchingProducts = async () => {
    // try {
    //   // caso de éxito
    //   const respuesta = await fetch("https://fakestoreapi.com/products")
    //   const data = await respuesta.json()
    //   setProductos(data)
    // } catch (error) {
    //   // capturando todos los erres o los casos de no éxito que tengamos
    //   setError("No pude recuperar los productos :(")
    // }

    const productosRef = collection(db, "productos")

    const snapshot = await getDocs(productosRef)
    const docs = snapshot.docs.map((doc) => doc.data())
    setProductos(docs)
  }

  useEffect(() => {
    fetchingProducts()
  }, [])

  return (
    <main>
      <section className="banner">
        <h1>Bienvenidos a la feria de Fabri</h1>
        <h2>Los mejores productos y precios de la ciudad</h2>
      </section>
      <section className="productList">
        {
          error && <p>{error}</p>
        }
        {
          productos.length === 0 && !error && <p>No hay productos disponibles</p>
        }
        {
          // callback es una funcion que se ejecuta despues de que pasa algo
          productos.map((producto) => {
            return (
              <div className="product">
                <h2>{producto.name}</h2>
                <p>${producto.price}</p>
                <p>{producto.description}</p>
                {
                  user && <>
                    <div>
                      {producto.createdAt && <p>Producto creado: {new Date(producto.createdAt).toLocaleString()}</p>}
                      {producto.createdAt !== producto.updatedAt && <p><strong>Ultima actualización:</strong> {new Date(producto.updatedAt).toLocaleString()}</p>}
                    </div>
                    <div className="user-buttons">
                      <Link to={`/editar-producto/${producto.id}`} className="buttonEdit">Editar producto</Link>
                      <button onClick={() => handleDeleteProduct(producto.id)} className="buttonDelete">Borrar</button>
                    </div>
                  </>
                }
                <button className="buttonBuy">Comprar</button>
              </div>
            )
          })
        }
      </section>
    </main>
  )
}

export default Main