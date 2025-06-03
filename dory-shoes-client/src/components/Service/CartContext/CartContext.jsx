import React from "react";
import { createContext, useState, useEffect } from "react";
import {useAuth} from "../../../hooks/useAuth";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const {token} = useAuth();
  const [countProduct, setCountProduct] = useState();
  const [products, setProducts] = useState([]);
  const [cartId, setCartId] = useState();

  
  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);
  //Leer carrito desde backend al cargar la app usando fetch
  const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:3000/cart", {
          headers: {
          Authorization: `Bearer ${token}`},
        },
        );
        const data = await response.json();
        setProducts(data.cartProducts);
        setCountProduct(data.totalProducts);
        setCartId(data.id);
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      }
    };
  return (
    <CartContext.Provider
      value={{
        countProduct,
        products,
        cartId,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
