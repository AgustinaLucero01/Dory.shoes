import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import ProductData from "../../data/products.json";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./ProductDetail.css";
import ModalImage from "../ui/ModalImage";
import ModalProduct from "../ui/ModalProduct";
import { CartContext } from "../Service/CartContext/CartContext";
import { toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductDetail() {
  const {
    Allproduct,
    setAllproducts,
    total,
    setTotal,
    countProduct,
    setCountProduct,
  } = useContext(CartContext);

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
      const existingIndex = Allproduct.findIndex(
        (item) => item.id === product.id && item.size === selectedSize
      );
      if (existingIndex !== -1) {
        // Si ya existe un producto con ese ID y talle, sumamos cantidad
        const updatedCart = [...Allproduct];
        updatedCart[existingIndex].quantity += 1;
        setAllproducts(updatedCart);
      } else {
        // Si no existe ese producto+talle, lo agregamos nuevo
        const newItem = { ...product, size: selectedSize, quantity: 1 };
        setAllproducts([...Allproduct, newItem]);
      }
      setTotal(total + Number(product.price));
      setCountProduct(countProduct + 1);
      // alert("Producto agregado al carrito");
      toast.success("✔️ producto agregado al carriro", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
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
      <ToastContainer />
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
