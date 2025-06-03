import React, { useState, useContext } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import "./Navbar.css";
import ProductSearch from "../productSearch/ProductSearch";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Service/CartContext/CartContext.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import Cart from "../Cart/Cart.jsx";
import { Link } from "react-router-dom";

const CustomNavbar = () => {
  const { id, role, isAuthenticated } = useAuth();
  const { countProduct } = useContext(CartContext);
  // manejamos el estado de "expanded" para definir si la navbar está abierta o no
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  //encodeURIComponent: Convierte los caracteres especiales en una forma segura para la URL.
  const handleSearchRedirect = () => {
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setShowSearch(false);
    }
  };

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setExpanded(false);
    setActive(false);
  };

  const toggleSearch = () => {
    handleClose();
    setShowSearch(!showSearch);
  };

  return (
    <Navbar expanded={expanded} expand="true" fixed="top">
      {/* expand: cuándo está abierto el navbar */}
      <Container fluid>
        {/* aria-controls: indica qué elemento se verá afectado (por id) */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={handleToggle}
        />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="custom-navbar-collapse"
        >
          <div className="close-btn" onClick={handleClose}>
            &times;
          </div>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" onClick={handleClose}>
              Inicio
            </Nav.Link>

            <NavDropdown title="Productos" id="productos-dropdown">
              <NavDropdown.Item as={Link} to="/products" onClick={handleClose}>
                Todos los productos
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/categoria/botas"
                onClick={handleClose}
              >
                Botas
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/categoria/zapatillas"
                onClick={handleClose}
              >
                Zapatillas
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/categoria/zapatos"
                onClick={handleClose}
              >
                Zapatos
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/categoria/pantuflas"
                onClick={handleClose}
              >
                Pantuflas{" "}
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/about" onClick={handleClose}>
              Nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="/faq" onClick={handleClose}>
              Preguntas frecuentes
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={handleClose}>
              Contacto
            </Nav.Link>
            {isAuthenticated && (role === "admin" || role === "superAdmin") && (
              <Nav.Link as={Link} to="/dashboard" onClick={handleClose}>
                Dashboard
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>

        <Navbar.Brand as={Link} to="/" onClick={handleClose}>
          <img
            src="/images/DoryShoes-Logo.jpg"
            className="d-inline-block align-top"
            alt="Logo de Dory Shoes"
          />
        </Navbar.Brand>
        {showSearch && (
          <div className="search-container">
            <ProductSearch
              search={searchTerm}
              onSearch={setSearchTerm}
              onSubmit={handleSearchRedirect}
            />
          </div>
        )}

        <div className="header-icons">
          <FaSearch className="icon" onClick={toggleSearch} />
          <FaUser
            className="icon"
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (isAuthenticated) {
                handleClose();
                navigate(`/editProfile/${id}`);
              } else {
                handleClose();
                navigate("/login");
              }
            }}
          />
          {isAuthenticated && (
            <FaShoppingCart
              className="icon"
              onClick={() => setActive(!active)}
            />
          )}
          {isAuthenticated && (
            <div className="count-product">
              <span id="count-product">{Number(countProduct) || 0}</span>
            </div>
          )}
          {active && <Cart isActive={active} onActive={setActive} />}
        </div>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
