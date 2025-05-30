import React from "react";
import { createContext, useState,useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [total, setTotal] = useState(()=> {
    const savedTotal = localStorage.getItem('cartTotal');
    return savedTotal ? Number(JSON.parse(savedTotal)) : 0;

});

  const [countProduct, setCountProduct] = useState(() =>{
    const saved= localStorage.getItem('countProduct');
    return saved ? Number(JSON.parse(saved)) : 0 ;
  });


  const [Allproduct, setAllproducts] = useState(()=>{
    const saved = localStorage.getItem('cartProducts');
    return saved ? JSON.parse(saved) : []
  });


  {/* useEffect para guardar los datos en el localStorage cuando cambien*/}
  {/* useEffect es una función que se ejecuta cuando se ejecuta la función anterior*/}
  useEffect(()=>{
    localStorage.setItem('cartTotal', JSON.stringify(total));
    localStorage.setItem('countProduct', JSON.stringify(countProduct));
    localStorage.setItem('cartProducts', JSON.stringify(Allproduct));
  },[total, countProduct, Allproduct])


   {/* value es el valor que se pasa a todos los componentes hijos */} 
  return (
    <CartContext.Provider
      value={{
        total,
        setTotal,
        countProduct,
        setCountProduct,
        Allproduct,
        setAllproducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
