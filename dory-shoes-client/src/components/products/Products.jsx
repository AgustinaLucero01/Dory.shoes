import React,{useEffect,useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductData from '../../data/products.json';
import './Products.css';

function Products() {
  const { categoria } = useParams();
const [products, setProducts] = useState([]);

useEffect(() => {
    fetchProducts();
     
  }, []);

  // Si no hay categoría en la URL, mostramos todos los productos
  const productosFiltrados = categoria
    ? products.filter(
      (producto) =>
        producto.categoria.toLowerCase() === decodeURIComponent(categoria).toLowerCase()
    )
    : products;

  const fetchProducts = async () => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts([...data]))
      .catch((err) => console.log(err));
  };
  return (
    <div className="products-container">
      <div className="container mt-5">
        <h2 className="text-center mb-4">
          {categoria ? decodeURIComponent(categoria) : 'Todos los productos'}
        </h2>
        <div className="row">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <div key={producto.id} className="col-md-3 mb-4">
                <div className="card">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">
                      ${producto.precio.toLocaleString('es-AR')}
                    </p>
                    <Link to={`/product/${producto.id}`} className="btn btn-ver-detalle">
                      Ver detalle
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
