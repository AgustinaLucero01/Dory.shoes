import React from 'react';
import { useState } from 'react';
import CustomNavbar from '../customNavbar/CustomNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { FaUser, FaShoppingCart, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';  // Link para la navegación

function Home() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Selecciona una categoría</h2>
      <div className="row text-center">
        <div className="col-md-3 position-relative">
          <Link to="/productos/botas" style={{ textDecoration: 'none' }}>
            <img
              src="/imagenes/botas.jpg"  // Asegúrate de tener una imagen para cada categoría
              alt="Botas"
              className="img-fluid"
              style={{ width: '100%', cursor: 'pointer' }}
            />
            <div className="category-text">Botas</div>
          </Link>
        </div>
        <div className="col-md-3 position-relative">
          <Link to="/productos/zapatos" style={{ textDecoration: 'none' }}>
            <img
              src="/imagenes/zapatos.jpg"  // Asegúrate de tener la imagen de zapatos
              alt="Zapatos"
              className="img-fluid"
              style={{ width: '100%', cursor: 'pointer' }}
            />
            <div className="category-text">Zapatos</div>
          </Link>
        </div>
        <div className="col-md-3 position-relative">
          <Link to="/productos/zapatillas" style={{ textDecoration: 'none' }}>
            <img
              src="/imagenes/zapatillas.jpg"  // Asegúrate de tener la imagen de zapatillas
              alt="Zapatillas"
              className="img-fluid"
              style={{ width: '100%', cursor: 'pointer' }}
            />
            <div className="category-text">Zapatillas</div>
          </Link>
        </div>
        <div className="col-md-3 position-relative">
          <Link to="/productos/pantuflas" style={{ textDecoration: 'none' }}>
            <img
              src="/imagenes/pantuflas.jpg"  // Asegúrate de tener la imagen de pantuflas
              alt="Pantuflas"
              className="img-fluid"
              style={{ width: '100%', cursor: 'pointer' }}
            />
            <div className="category-text">Pantuflas</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

