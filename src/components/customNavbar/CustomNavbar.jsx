import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import "./Navbar.css";

const CustomNavbar = () => {
  // manejamos el estado de "expanded" para definir si la navbar está abierta o no
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setExpanded(false);
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
            <Nav.Link href="#inicio" onClick={handleClose}>
              Inicio
            </Nav.Link>
            <NavDropdown title="Productos" id="productos-dropdown">
              <NavDropdown.Item href="#todos" onClick={handleClose}>
                Todos los productos
              </NavDropdown.Item>
              <NavDropdown.Item href="#botas" onClick={handleClose}>
                Botas
              </NavDropdown.Item>
              <NavDropdown.Item href="#zapatillas" onClick={handleClose}>
                Zapatillas
              </NavDropdown.Item>
              <NavDropdown.Item href="#zapatos" onClick={handleClose}>
                Zapatos
              </NavDropdown.Item>
              <NavDropdown.Item href="#pantuflas" onClick={handleClose}>
                Pantuflas
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#nosotros" onClick={handleClose}>
              Nosotros
            </Nav.Link>
            <Nav.Link href="#faq" onClick={handleClose}>
              Preguntas frecuentes
            </Nav.Link>
            <Nav.Link href="#contacto" onClick={handleClose}>
              Contacto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Navbar.Brand href="#home">
          <img
            src="../../../images/DoryShoes-Logo.jpg"
            className="d-inline-block align-top"
            alt="Logo de Dory Shoes"
          />
        </Navbar.Brand>
        <div className="header-icons">
          <FaSearch className="icon"/>
          <FaUser className="icon" />
          <FaShoppingCart className="icon"/>
        </div>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
