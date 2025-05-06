import { useParams } from "react-router-dom";
import { useState } from "react";
import ProductData from '../../data/products.json';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function ProductDetail() {
  const { id } = useParams(); 
  const product = ProductData.find((p) => p.id === parseInt(id)); 
  const [selectedSize, setSelectedSize] = useState(null); 
  const [favorites, setFavorites] = useState([]); 
  const [cart, setCart] = useState([]); 

 
  const sizes = Object.keys(product.stock || {}); 

  // Función para agregar al carrito
  const handleAddToCart = () => {
    if (selectedSize) {
      const existingIndex = cart.findIndex(
        (item) => item.id === product.id && item.stock === selectedSize
      );

      if (existingIndex !== -1) {
        // Si ya existe el producto en el carrito, actualizar la cantidad
        const updatedCart = [...cart];
        updatedCart[existingIndex].quantity += 1;
        setCart(updatedCart);
      } else {
        // Si no existe, agregar el nuevo producto al carrito
        const newItem = { ...product, size: selectedSize, quantity: 1 };
        setCart([...cart, newItem]);
      }
      console.log("Producto agregado al carrito:", product);

      alert("Producto agregado al carrito");
    } else {
      alert("Por favor, selecciona un talle");
    }
  };

  // Función para manejar favoritos
  const toggleFavorite = () => {
    if (favorites.includes(product.id)) {
      setFavorites(favorites.filter((favId) => favId !== product.id));
    } else {
      setFavorites([...favorites, product.id]);
    }
  };

  return (
    <div className="product-detail">
      <img src={product.imagen} alt={product.nombre} /> 
      <h2>{product.nombre}</h2>
      <p>${product.precio}</p>

      {/* Selección de talle */}
      <div className="sizes">
        <p>Selecciona un talle:</p>
        <div className="size-options">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={selectedSize === size ? "selected" : ""}
              disabled={product.stock && product.stock[size] === 0} 
            >
              {product.stock[size] === 0 ? <s>{size}</s> : size}
            </button>
          ))}
        </div>
      </div>

    
      <button onClick={handleAddToCart}>Agregar al carrito</button>

     
      <button onClick={toggleFavorite}>
        {favorites.includes(product.id) ? <AiFillHeart /> : <AiOutlineHeart />} Favorito
      </button>
    </div>
  );
}

export default ProductDetail;
