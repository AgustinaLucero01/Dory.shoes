import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";

const Home = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.message) {
      const type = location.state?.type || "info";
      toast[type](location.state.message);
    }
    if (location.state?.showWelcomeToast) {
      toast(
        `👢 Bienvenido/a a la tienda, ${
          location.state?.userName || "invitado"
        }`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        }
      );
      window.history.replaceState({}, document.title);
    }
    if (location.state?.showConfirmEdit) {
      toast["info"](`Usuario modificado con éxito`, {
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
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const categorias = [
    { nombre: "Zapatillas", imagen: "/images/Zapatillas/zapatilla4.jpg" },
    { nombre: "Botas", imagen: "/images/Botas/bota2.jpg" },
    { nombre: "Zapatos", imagen: "/images/Zapatos/zapato3.jpg" },
    { nombre: "Pantuflas", imagen: "/images/Pantuflas/pantu2.jpg" },
  ];

  return (
    <div className="home-container">
      <ToastContainer />
      {/*<div className="barra-envios">Envíos express por Oca a todo el país </div>
      {/* Carrusel Bootstrap */}
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">
          {[...Array(9)].map((_, i) => (
            <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
              <img
                src={`/images/Carrusel/foto${i + 1}.jpg`}
                className="d-block w-100 imagen-carrusel"
                alt={`Producto ${i + 1}`}
              />
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      <div className="linea-gris"></div>

      <div className="categorias-grid">
        {categorias.map((cat, i) => (
          <Link to={`/categoria/${cat.nombre.toLowerCase()}`} key={i}>
            <div className="categoria-contenedor">
              <img
                src={cat.imagen}
                alt={cat.nombre}
                className="imagen-categoria"
              />
              <h2 className="titulo-categoria">{cat.nombre}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
