import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import {useNavigate} from "react-router-dom";
import { CartContext } from "../Service/CartContext/CartContext";
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

  const onDeleteProduct = (product) => {
    const result = Allproduct.filter(
      (item) => !(item.id === product.id && item.size === product.size)
    );
    setAllproducts(result);
    setTotal(total - product.precio * product.quantity);
    setCountProduct(countProduct - product.quantity);
  };


  const onclickCart = () => {
    setAllproducts([]);
    setTotal(0);
    setCountProduct(0);
  }

  const handlenav = () => {
    navigate("/shopping");
  }



  return (
    <div>
      <div className="icon-cart">
        <FaShoppingCart onClick={() => setActive(!active)} className="icon-cart" />

      </div>

      <div className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
        {Allproduct.length ? (
          <>
            <div className='row-product'>
              {Allproduct.map(product => (
                <div className='cart-product' key={product.id}> {/* key es para que cada producto se renderice una vez */}
                  <div className='info-cart-product'>
                    <span className='cantidad-producto-carrito'>
                      {product.quantity}
                    </span>
                    <p className='titulo-producto-carrito'>
                      {product.nombre}
                    </p>
                    <span className='precio-producto-carrito'>
                      ${product.precio}
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
