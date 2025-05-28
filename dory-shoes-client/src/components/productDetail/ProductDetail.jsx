import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductData from "../../data/products.json";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./ProductDetail.css";
import ModalImage from "../ui/ModalImage";
import ModalProduct from "../ui/ModalProduct";
function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState();
  const [selectedSize, setSelectedSize] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalProduct, setShowModalProduct] = useState(false);

  useEffect(() => {
    fetchProducto();
  }, [id]);

  const fetchProducto = async () => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`);
      if (!response.ok) {
        navigate("/");
        throw new Error("Producto no encontrado");
      }
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      const existingIndex = cart.findIndex(
        (item) => item.id === product.id && item.size === selectedSize
      );

      if (existingIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingIndex].quantity += 1;
        setCart(updatedCart);
      } else {
        const newItem = { ...product, size: selectedSize, quantity: 1 };
        setCart([...cart, newItem]);
      }
      alert("Producto agregado al carrito");
    } else {
      alert("Por favor, selecciona un talle");
    }
  };

  const toggleFavorite = () => {
    if (favorites.includes(product.id)) {
      setFavorites(favorites.filter((favId) => favId !== product.id));
    } else {
      setFavorites([...favorites, product.id]);
    }
  };

  return (
    <div className="product-detail">
      <img
        src={product?.imageUrl}
        alt={product?.name}
        className="product-image"
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer" }}
      />

      <h2>{product?.name}</h2>
      <p>${product?.price}</p>

      <div className="sizes">
        <p>Selecciona un talle:</p>
        <div className="size-options">
          {product?.productSizes.map((sizeObj) => (
            <button
              key={sizeObj.size}
              onClick={() => setSelectedSize(sizeObj.size)}
              className={selectedSize === sizeObj.size ? "selected" : ""}
              disabled={sizeObj.stock === 0}
            >
              {sizeObj.stock === 0 ? <s>{sizeObj.size}</s> : sizeObj.size}
            </button>
          ))}
        </div>
        <button
          className="no-size-button"
          onClick={() => setShowModalProduct(true)}
        >
          Tabla de talles
        </button>
      </div>

      <button onClick={() => window.history.back()}>Volver</button>
      <button onClick={handleAddToCart}>Agregar al carrito</button>
      <button onClick={toggleFavorite}>
        {favorites.includes(product?.id) ? <AiFillHeart /> : <AiOutlineHeart />}{" "}
        Favorito
      </button>

      <ModalImage
        show={showModal}
        onClose={() => setShowModal(false)}
        image={product?.imageUrl}
        alt={product?.name}
      />
      <ModalProduct
        show={showModalProduct}
        onHide={() => setShowModalProduct(false)}
      />
    </div>
  );
}

export default ProductDetail;
