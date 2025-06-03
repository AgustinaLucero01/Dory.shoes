import React from "react";
import { createContext, useState, useEffect } from "react";
import { useAuth } from "../auth/usercontext/UserContext";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const {token} = useAuth();
  const [countProduct, setCountProduct] = useState();
  const [products, setProducts] = useState([]);
  const [cartId, setCartId] = useState();

  //Leer carrito desde backend al cargar la app usando fetch
  useEffect(() => {
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
    if (token) {
      fetchCart();
    }
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        countProduct,
        products,
        setProducts,
        setCountProduct,
        cartId
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
