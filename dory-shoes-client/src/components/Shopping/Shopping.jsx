//Sacar el envío o contactar al dueño
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Shopping.css";
import { CartContext } from "../Service/cartContext/CartContext";
import PurchaseSuccessModal from "../ui/PurchaseSuccessModal";


const Shopping = () => {
  const navigate = useNavigate();
  //traemos el estado el carrito
  const { products } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const total = products.reduce((acc, product) => {
  const price = parseFloat(product.productSize.product.price);
  const quantity = parseInt(product.quantity);
  return acc + price * quantity;
}, 0);

  const handleBack = () => {
    navigate("/");
  };

   const handleContinue = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

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
          {products.length ? (
            products.map((product, index) => (
              <div className="inf-summary" key={index}>
                <div className="image-summary">
                  <img
                    src={product.productSize.product.imageUrl}
                    alt={product.productSize.product.name}
                    style={{ width: "100px" }}
                  />
                </div>
                <div className="inf-summary-text">
                  <h2>{product.productSize.product.name}</h2>
                  <span>Talle: {product.productSize.size}</span>
                  <p>Precio unitario: ${product.productSize.product.price}</p>
                  <p>Cantidad: {product.quantity}</p>
                  <p>
                    Total: $
                    {parseInt(product.productSize.product.price) *
                      parseInt(product.quantity)}
                  </p>
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
       {/* MODAL */}
      <PurchaseSuccessModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
   
  );
};
export default Shopping;
