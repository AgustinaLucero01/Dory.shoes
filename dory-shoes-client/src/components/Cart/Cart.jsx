import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./Cart.css";

const Cart = ({Allproduct = [],setAllproduct, Total,CountProduct,setCountProduct,setTotal}) => {
  const [active, setActive] = useState(false);
  
  const onDeleteProduct = (product) =>{
    const result =Allproduct.filter(item => item.id !== product.id);
     setAllproduct(result);
     setTotal(Total - product.precio * product.quantity);
     setCountProduct(CountProduct - product.quantity);
  };


  const onclickCart = () =>{
    setAllproduct([]);
    setTotal(0);
    setCountProduct(0);
  }

  

  return (
    <div>
      <div className="icon-cart">
        <FaShoppingCart onClick={() => setActive(!active)} className="icon" />
        <div className="count">
          <span id="count-product">{CountProduct}</span>
        </div>
      </div>

      <div className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
        {Allproduct.length ? (
          <>
            <div className='row-product'>
              {Allproduct.map(product => (
                <div className='cart-product' key={product.id}>
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
                   <button onClick={() => onDeleteProduct(product.id)}>Eliminar</button> 
                </div>
              ))}
            </div>
            <div className="cart-total">
              <h3>Total:</h3>
              <span>${Total}</span>
            </div>
            <button className="btn-clear-all" onClick={onclickCart}>Vaciar carrito</button>
          </>
        ) : (
          <p>El carrito está vacío</p>
        )}
      </div> 
    </div>
  );
};

export default Cart;
