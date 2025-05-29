import React, { useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import "./Shopping.css";
import {CartContext} from "../Service/CartContext/CartContext.jsx"; 

const Shopping = () => {
  const navigate = useNavigate();
  //traemos el estado el carrito
  const { Allproduct, total } = useContext(CartContext);

const handleBack = () => {
  navigate("/")
}

  return (
  <div className="shopping-container">
    <div className="options">
      <div className="contact">
        <p>contactate con el cliente</p>
      </div>
      <div className="envio">
        <p>Envio a domicilio</p>
      </div>
    </div>
    <div className="shopping">
      <div className="form-container">
        <div class="form-group">
          <label>Nombre:</label>
          <input type="text" />
        </div>
        <div class="form-group">
          <label>Apellido:</label>
          <input type="text" />
        </div>
        <div class="form-group">
          <label>Numero de telefono:</label>
          <input type="text" />
        </div>
        <div class="form-group">
          <label>Codigo Postal:</label>
          <input type="text" />
        </div>
        <div class="form-group">
          <label>Direccion:</label>
          <input type="text" />
        </div>  
        <div className="form-button">
          <button type="submit">continuar</button>
        </div> 
      </div>

      <div className="purchase-summary">
        <h1>Resumen de compra</h1>
        {Allproduct.length ? (
          Allproduct.map((product, index) => (
            <div className="inf-summary" key={index}>
              <div className="image-summary">
                <img src={product.imagen} alt={product.nombre} style={{ width: "100px" }} />
              </div>
              <div className="inf-summary-text">
                <h2>{product.nombre}</h2>
                <span>Talle: {product.size}</span>
                <p>Precio unitario: ${product.precio}</p>
                <p>Cantidad: {product.quantity}</p>
                <p>Total: ${product.precio * product.quantity}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos en el carrito</p>
        )}

        <span>Total: ${total}</span>
        <div className="btn-summary">
          <button onClick={handleBack}>Seguir comprando</button>
        </div>
      </div>
     </div>
    </div>
  );
};
export default Shopping;