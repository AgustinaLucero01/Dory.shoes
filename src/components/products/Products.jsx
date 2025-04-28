import React from 'react';
import { useParams, Link } from 'react-router-dom';  // useParams para obtener el filtro de la URL
import productsData from '../data/products.json';

function Products() {
  const { categoria } = useParams();  // Obtenemos el parámetro de la URL (categoria)
  
  // Filtrar los productos por la categoría
  const productosFiltrados = productsData.filter((producto) =>
    producto.categoria.toLowerCase() === categoria.toLowerCase()
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Productos de {categoria}</h2>
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
                  <p className="card-text">${producto.precio.toLocaleString('es-AR')}</p>
                  {/* Enlace al detalle del producto */}
                  <Link to={`/producto/${producto.id}`} className="btn btn-primary">
                    Ver detalle
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles en esta categoría.</p>
        )}
      </div>
    </div>
  );
}

export default Products;
