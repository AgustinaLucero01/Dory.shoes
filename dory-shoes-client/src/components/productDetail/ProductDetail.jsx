import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./ProductDetail.css";
import ModalImage from "../ui/ModalImage";
import ModalProduct from "../ui/ModalProduct";
import { CartContext } from "../Service/cartContext/CartContext";
import { toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Service/auth/usercontext/UserContext";

function ProductDetail() {
  const {
    products,
    setProducts,
    countProduct,
    setCountProduct
  } = useContext(CartContext);

  const { token } = useAuth();

  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState();
  const [selectedSize, setSelectedSize] = useState(null);
  const [favourite, setFavourite] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showModalProduct, setShowModalProduct] = useState(false);

  useEffect(() => {
    fetchProducto();
  }, [id]);

  const fetchProducto = async () => {
    try {
      //Sacar el query del URL cuando agreguemos JWT
      const response = await fetch(
        `http://localhost:3000/products/${id}?userId=2`
      );
      if (!response.ok) {
        navigate("/");
        throw new Error("Producto no encontrado");
      }
      const data = await response.json();
      setProduct(data);
      setFavourite(data.favourite);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Seleccione un talle para continuar", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    if (!token) {
      toast.error("Debe iniciar sesión para comenzar a comprar", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/cart/${product.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: 1,
          size: selectedSize,
        }),
      });

      if (!response.ok) {
        throw new Error("No se pudo agregar el producto al carrito");
      }

      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, data]);
      setCountProduct((prevCount) => prevCount + 1);

      toast.success("✔️ Producto agregado al carrito", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } catch (err) {
      console.error(err.message);
      toast.error("❌ Error al agregar producto al carrito", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const toggleFavorite = () => {
    if (favourite) {
      deleteFavourite();
    } else {
      addFavourite();
    }
  };

  const addFavourite = async () => {
    try {
      const response = await fetch(`http://localhost:3000/addFavourite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 2, // Modificar cuando agreguemos JWT
          productId: product.id,
        }),
      });

      if (!response.ok) throw new Error("Error al agregar favorito");

      const newFavourite = await response.json();
      setFavourite(newFavourite);
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteFavourite = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/deleteFavourite/${favourite.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Error al eliminar favorito");

      setFavourite(null);
    } catch (err) {
      console.log(err.message);
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
        {favourite ? <AiFillHeart /> : <AiOutlineHeart />} Favorito
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
