import { useEffect, useState } from "react"
import "./Main.css"

const Main = () => {
  const [productos, setProductos] = useState([])
  const [error, setError] = useState(null)
  //simulacion de usuari conectado
  const [user, setUser] = useState(false)

  const fetchingProducts = async () => { //TRAER PRODUCTOS, ES UNA FUNCION ASYNC OSEA QUE NO TENGO APURO EN TRAER LOS PRODUCTOS, QUIERE DECIR QUE ME TRAIGA LSO PRODUCTOS CUANDO ESTEN
    /* try {
       const respuesta = await fetch("https://fakestoreapi.com/products")
       const data = await respuesta.json()
       setProductos(data)
     } catch (error) {
       setError("No pude recuperar los productos :(")
     } */

    const productosLocalStorage = JSON.parse(localStorage.getItem("productos"))
    setProductos(productosLocalStorage)
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
                  user && <div className="actualizar-button">
                    <button>Actualizar</button>
                    <button>Borrar</button>
                  </div>

                }
                <button>Comprar</button>
              </div>
            )
          })
        }
      </section>
    </main>
  )
}

export default Main