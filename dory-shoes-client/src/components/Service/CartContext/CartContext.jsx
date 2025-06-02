import React from "react";
import { createContext, useState, useEffect } from "react";
import { useAuth } from "../auth/usercontext/UserContext";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const {token} = useAuth();
  const [countProduct, setCountProduct] = useState();
  const [products, setProducts] = useState([]);
  const [cartId, setCartId] = useState();
  //Leer carrito desde backend al cargar la app usando fech:
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:3000/cart", {
          headers: {
          Authorization: `Bearer ${token}`},
        },
        ); // sin https si es local
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
  }, []);

  {
    /* useEffect para guardar los datos en el localStorage cuando cambien*/
  }
  {
    /* useEffect es una función que se ejecuta cuando se ejecuta la función anterior*/
  }
  // useEffect(()=>{
  //   localStorage.setItem('countProduct', JSON.stringify(countProduct));
  //   localStorage.setItem('cartProducts', JSON.stringify(products));
  // },[countProduct, products])

  {
    /* value es el valor que se pasa a todos los componentes hijos */
  }
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
