import { useParams } from "react-router-dom";
import { useState } from "react";
import ProductData from "../../data/products.json";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./ProductDetail.css";
import ModalImage from "../ui/ModalImage";

function ProductDetail() {
  const { id } = useParams();
  const Productos = ProductData.find((p) => p.id === parseInt(id));
  
  console.log("ID recibido:", id);
  console.log("Producto encontrado:", Productos);

  if (!Productos) {
    return <div className="product-detail"><h2>Producto no encontrado</h2></div>;
  }

  const [selectedSize, setSelectedSize] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const sizes = Object.keys(Productos.size || {});

  const handleAddToCart = () => {
    if (selectedSize) {
      const existingIndex = cart.findIndex(
        (item) => item.id === Productos.id && item.size === selectedSize
      );

      if (existingIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingIndex].quantity += 1;
        setCart(updatedCart);
      } else {
        const newItem = { ...Productos, size: selectedSize, quantity: 1 };
        setCart([...cart, newItem]);
      }
      alert("Producto agregado al carrito");
    } else {
      alert("Por favor, selecciona un talle");
    }
  };

  const toggleFavorite = () => {
    if (favorites.includes(Productos.id)) {
      setFavorites(favorites.filter((favId) => favId !== Productos.id));
    } else {
      setFavorites([...favorites, Productos.id]);
    }
  };

  return (
    <div className="product-detail">
      <img
        src={Productos.imagen}
        alt={Productos.nombre}
        className="product-image"
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer" }}
      />

      <h2>{Productos.nombre}</h2>
      <p>${Productos.precio}</p>

      <div className="sizes">
        <p>Selecciona un talle:</p>
        <div className="size-options">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={selectedSize === size ? "selected" : ""}
              disabled={Productos.size[size] === 0}
            >
              {Productos.size[size] === 0 ? <s>{size}</s> : size}
            </button>
          ))}
        </div>
      </div>

      <button onClick={() => window.history.back()}>Volver</button>
      <button onClick={handleAddToCart}>Agregar al carrito</button>
      <button onClick={toggleFavorite}>
        {favorites.includes(Productos.id) ? <AiFillHeart /> : <AiOutlineHeart />} Favorito
      </button>

      <ModalImage
        show={showModal}
        onClose={() => setShowModal(false)}
        image={Productos.imagen}
        alt={Productos.nombre}
      />
    </div>
  );
}

export default ProductDetail;
