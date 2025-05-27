import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import './Navbar.css';

const CustomNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setExpanded(false);
  };

  return (
    <Navbar expanded={expanded} expand="lg" bg="light" variant="light" fixed="top" className="shadow-sm">
      <Container fluid className='navbar-container'>
        <Navbar.Toggle className='button-toggle' aria-controls="basic-navbar-nav" onClick={handleToggle} />

        <Navbar.Collapse id="basic-navbar-nav" className="custom-navbar-collapse">
          {/* Botón de cerrar */}
          <div className="close-btn" onClick={handleClose}>
            &times;
          </div>

          <Nav className="flex-column">
            <Nav.Link href="#inicio" onClick={handleClose}>Inicio</Nav.Link>

            <NavDropdown title="Productos" id="productos-dropdown" drop="end">
              <NavDropdown.Item href="#todos" onClick={handleClose}>Todos los productos</NavDropdown.Item>
              <NavDropdown.Item href="#zapatillas" onClick={handleClose}>Zapatillas</NavDropdown.Item>
              <NavDropdown.Item href="#zapatos" onClick={handleClose}>Zapatos</NavDropdown.Item>
              <NavDropdown.Item href="#pantuflas" onClick={handleClose}>Pantuflas</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#nosotros" onClick={handleClose}>Nosotros</Nav.Link>
            <Nav.Link href="#faq" onClick={handleClose}>Preguntas frecuentes</Nav.Link>
            <Nav.Link href="#contacto" onClick={handleClose}>Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
);
};

export default CustomNavbar;
