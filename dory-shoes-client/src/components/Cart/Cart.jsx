import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Service/cartContext/CartContext.jsx";
import { toast, Bounce } from "react-toastify";
import { useAuth } from "../Service/auth/usercontext/UserContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./cart.css";

const Cart = (isActive) => {
  const { countProduct, products, setProducts, setCountProduct, cartId } = useContext(CartContext);

  const [total, setTotal] = useState();
  const [active, setActive] = useState(isActive);

  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
  const totalCalculado = products?.reduce((acc, product) => {
    const precio = product.productSize.product.price;
    const cantidad = product.quantity;
    return acc + precio * cantidad;
  }, 0);
  setTotal(totalCalculado);
}, [products]);

  const onDeleteProduct = async (productId) => {
    const response = await fetch(`http://localhost:3000/cart`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartProductId: productId,
      }),
    });
    if (response.ok) {
      toast.success("🗑️ Producto eliminado", {
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

      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
    }
  };

  const onclickCart = async() => {
    setProducts([]);
    setTotal(0);
    setCountProduct(0);

    const response = await fetch(`http://localhost:3000/allCart`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId,
      }),
    });

    if (response.ok){
      console.log("Carrito vaciado")
    }

  };

  const handlenav = () => {
    if (!token) {
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
    <div className={`container-cart-products ${active ? "" : "hidden-cart"}`}>
      {products?.length ? (
        <>
          <div className="row-product">
            {products.map((product) => (
              <div className="cart-product" key={product.id}>
                {" "}
                {/* key es para que cada producto se renderice una vez */}
                <div className="info-cart-product">
                  <span className="cantidad-producto-carrito">
                    {product.quantity}
                  </span>
                  <p className="titulo-producto-carrito">
                    {product.productSize.product.name}({product.productSize.size})
                  </p>
                  <span className="precio-producto-carrito">
                    ${product.productSize.product.price}
                  </span>
                </div>
                <button onClick={() => onDeleteProduct(product.id)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total:</h3>
            <span>${total}</span>
          </div>
          <button className="btn-clear-all" onClick={onclickCart}>
            Vaciar carrito
          </button>
          <button onClick={handlenav}>Finalizar pedido</button>
        </>
      ) : (
        <p>El carrito está vacío</p>
      )}
    </div>
  );
};

export default Cart;
