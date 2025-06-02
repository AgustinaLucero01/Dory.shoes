import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductData from "../../data/products.json";
import "./Products.css";
import { useLocation } from "react-router-dom";

function Products() {
  const { categoria } = useParams();
  const [products, setProducts] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search"); // esto te da el string original, ya decodificado

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtra los productos por la categoría
  const productosFiltrados = products.filter((producto) => {
    const coincideCategoria = categoria
      ? producto.category.toLowerCase() === categoria.toLowerCase()
      : true;

    const coincideBusqueda = search
      ? producto.name.toLowerCase().includes(search)
      : true;

    return coincideCategoria && coincideBusqueda;
  });

  const fetchProducts = async () => {
      await fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts([...data]))
      .catch((err) => console.log(err));
  };

  function capitalizeFirstLetter(string) {
  if (!string) return ""; // Por si el string está vacío o es null
  return string.charAt(0).toUpperCase() + string.slice(1);
}

  return (
    <div className="products-container">
      <div className="container mt-5">
        {search && <h2 className="text-center mb-4">Resultado de la búsqueda</h2>}
        {!search && <h2 className="text-center mb-4">{categoria ? capitalizeFirstLetter(categoria) : "Todos los productos"}</h2>}
        <div className="row">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <div key={producto.id} className="col-md-3 mb-4">
                <div className="card">
                  <img
                    src={producto.imageUrl}
                    alt={producto.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{producto.name}</h5>
                    <p className="card-text">
                      ${producto.price.toLocaleString("es-AR")}
                    </p>
                    {/* Enlace al detalle del producto */}
                    <Link
                      to={`/product/${producto.id}`}
                      className="btn btn-ver-detalle"
                    >
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
