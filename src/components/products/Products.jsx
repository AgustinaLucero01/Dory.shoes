import React from 'react';
import { useParams, Link } from 'react-router-dom';  
import ProductData from '../../data/products.json'; 

function Products() {
  const { categoria } = useParams();  
  
  // Filtrar los productos por la categoría
  const productosFiltrados = ProductData.filter((producto) =>
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
              console.log(producto.imagen);
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
                  <Link to={`/product/${producto.id}`} className="btn btn-primary">
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
