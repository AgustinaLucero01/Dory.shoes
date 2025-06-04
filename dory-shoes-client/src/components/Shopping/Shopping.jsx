import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Shopping.css";
import { CartContext } from "../Service/CartContext/CartContext";
import PurchaseSuccessModal from "../ui/PurchaseSuccessModal";
import { useAuth } from "../../hooks/useAuth.js";
import { useEffect } from "react";

const Shopping = () => {
  const navigate = useNavigate();

  const { id, token } = useAuth();
  //traemos el estado el carrito
  const { products, fetchCart } =
    useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState();

  const total = products.reduce((acc, product) => {
    const price = parseFloat(product.productSize.product.price);
    const quantity = parseInt(product.quantity);
    return acc + price * quantity;
  }, 0);

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/getUser/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        navigate("/");
        throw new Error("Usuario no encontrado");
      }
      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleContinue = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:3000/newSale`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: id,
        amount: total,
        products,
      }),
    });
    if (response.ok) {
      fetchCart();
      setShowModal(true);
      navigate("/");
    }
  };

  return (
    <div className="shopping-container">
      <div className="shopping">
        <form onSubmit={handleContinue} className="form-container">
          <h4>Confirma tus datos de compra</h4>
          <br />
          <div className="form-group">
            <label>Nombre:</label>
            <input type="text" value={user?.name || ""} readOnly />
          </div>
          <div className="form-group">
            <label>Número de teléfono:</label>
            <input type="text" value={user?.phone || ""} readOnly />
          </div>
          <div className="form-group">
            <label>Código Postal:</label>
            <input type="text" value={user?.zipCode || ""} readOnly />
          </div>
          <div className="form-group">
            <label>Dirección:</label>
            <input type="text" value={user?.address || ""} readOnly />
          </div>

          <p className="form-note">
            Si algún dato está incorrecto, modifícalo desde tu perfil.
          </p>

          <div className="form-button">
            <button type="submit">Continuar</button>
          </div>
        </form>

        <div className="purchase-summary">
          <h1>Resumen de compra</h1>
          {products.length ? (
            products.map((product, index) => (
              <div className="inf-summary" key={index}>
                <div className="image-summary">
                  <img
                    src={product.productSize.product.imageUrl}
                    alt={product.productSize.product.name}
                    style={{ width: "120px", maxHeight:"150px" }}
                  />
                </div>
                <div className="inf-summary-text">
                  <h2>{product.productSize.product.name}</h2>
                  <p>Talle: {product.productSize.size}</p>
                  <p>Precio unitario: ${product.productSize.product.price}</p>
                  <p>Cantidad: {product.quantity}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No hay productos en el carrito</p>
          )}

          <span className="cart-total"> <b>Total:</b>${total}</span>
          <div className="btn-summary">
            <button onClick={handleBack}>Seguir comprando</button>
          </div>
        </div>
      </div>
      {/* MODAL */}
      <PurchaseSuccessModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};
export default Shopping;
