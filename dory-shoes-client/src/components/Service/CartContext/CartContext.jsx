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

  //Leer carrito desde backend al cargar la app usando fech:
// useEffect(() => {
//   const fetchCart = async () => {
//     const response = await fetch("https://localhost:3000/cart");
//     const data = await response.json();
//     setAllproducts(data.products);
//     setTotal(data.total);
//     setCountProduct(data.count);
//   };
//   fetchCart();
// }, []);

//Cada vez que los datos cambian, se hace una peticion PUT para guardar el carrito en la base de datos.
// useEffect(() => {
//   const saveCart = async () => {
//     await fetch("https://localhost:3000/cart", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ products: Allproduct, total, count: countProduct }),
//     });
//   };
//   saveCart();
// }, [Allproduct, total, countProduct]);




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
