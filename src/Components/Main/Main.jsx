import { useEffect, useState } from "react"
import "./Main.css"
import { db, auth } from "../../config/firebase"
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore"
import { Link } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"

const Main = () => {
  const [productos, setProductos] = useState([])
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null) // estado real del usuario

  const fetchingProducts = async () => {
    try {
      const productosRef = collection(db, "productos")
      const snapshot = await getDocs(productosRef)
      const docs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setProductos(docs)
    } catch (error) {
      setError("Error al cargar productos.")
      console.error(error)
    }
  }

  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "productos", id))
      setProductos(prev => prev.filter(producto => producto.id !== id))
    } catch (error) {
      console.error("Error al borrar el producto:", error)
      setError("No se pudo borrar el producto.")
    }
  }

  useEffect(() => {
    fetchingProducts()

    // Escuchar estado de autenticación real
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

  return (
    <main>
      <section className="banner">
        <h1>Bienvenidos a la feria de Fabri</h1>
        <h2>Los mejores productos y precios de la ciudad</h2>
      </section>
      <section className="productList">
        {error && <p>{error}</p>}
        {productos.length === 0 && !error && <p>No hay productos disponibles</p>}
        {productos.map((producto) => (
          <div className="product" key={producto.id}>
            <h2>{producto.name}</h2>
            <p><strong>SKU:{producto.sku}</strong></p>
            <p>${producto.price}</p>
            <p>{producto.description}</p>

            {user && (
              <>
                <div>
                  {producto.createdAt && (
                    <p>Producto creado: {new Date(producto.createdAt).toLocaleString()}</p>
                  )}
                  {producto.createdAt !== producto.updatedAt && (
                    <p><strong>Última actualización:</strong> {new Date(producto.updatedAt).toLocaleString()}</p>
                  )}
                </div>

                <div className="user-buttons">
                  <Link to={`/editar-producto/${producto.id}`} className="buttonEdit">Editar producto</Link>
                  <button onClick={() => handleDeleteProduct(producto.id)} className="buttonDelete">Borrar</button>
                </div>
              </>
            )}

            <button className="buttonBuy">Comprar</button>
          </div>
        ))}
      </section>
    </main>
  )
}

export default Main