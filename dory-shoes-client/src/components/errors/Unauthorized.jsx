import React from 'react';
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "30vh", textAlign: "center", marginTop: "40vh" }}
    >
      <h1 style={{ fontSize: "6rem", fontWeight: "bold" }}>401</h1>
      <h3>No tiene autorización</h3>
      <p>No tiene las credenciales para ingresar a esta página.</p>
      <Button variant="primary" onClick={() => navigate("/")}>
        Volver al inicio
      </Button>
    </Container>
  );
}

export default Unauthorized