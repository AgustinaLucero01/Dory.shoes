import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import {useNavigate} from "react-router-dom";
import { CartContext } from "../Service/CartContext/CartContext.jsx";
import { toast, Bounce } from "react-toastify";
import { useAuth } from "../Service/usercontext/UserContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./cart.css";

const Cart = () => {
  const {
    total,
    setTotal,
    countProduct,
    setCountProduct,
    Allproduct,
    setAllproducts,
  } = useContext(CartContext);

  const [active, setActive] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  const onDeleteProduct = (product) => {
    const result = Allproduct.filter(
      (item) => !(item.id === product.id && item.size === product.size)
    );
    setAllproducts(result);
    setTotal(total - product.price * product.quantity);
    setCountProduct(countProduct - product.quantity);
     toast.success("🗑️ Producto eliminado",{
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
  };


  const onclickCart = () => {
    setAllproducts([]);
    setTotal(0);
    setCountProduct(0);
  }

  const handlenav = () => {
    if (!user) {
      toast.error("⚠️ Debes iniciar sesión para finalizar la compra", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    navigate("/shopping");
  };



  return (
    <div>
      <div className="icon-cart">
        <FaShoppingCart onClick={() => setActive(!active)} className="icon-cart" />

      </div>

      {/*<div className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>*/}
        {Allproduct.length ? (
          <>
            <div className='row-product'>
              {Allproduct.map(product => (
                <div className='cart-product' key={`${product.id}-${product.size}`}> {/* key es para que cada producto se renderice una vez */}
                  <div className='info-cart-product'>
                    <span className='cantidad-producto-carrito'>
                      {product.quantity}
                    </span>
                    <p className='titulo-producto-carrito'>
                      {product.name}
                    </p>
                    <span className='precio-producto-carrito'>
                      ${product.price}
                    </span>
                  </div>
                  <button onClick={() => onDeleteProduct(product)}>Eliminar</button>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <h3>Total:</h3>
              <span>${total}</span>
            </div>
            <button className="btn-clear-all" onClick={onclickCart}>Vaciar carrito</button>
            <button onClick={handlenav}>Finalizar pedido</button>
          </>
        ) : (
          <p>El carrito está vacío</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
