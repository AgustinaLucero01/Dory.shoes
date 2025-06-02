import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "30vh", textAlign: "center", marginTop: "40vh" }}
    >
      <h1 style={{ fontSize: "6rem", fontWeight: "bold" }}>404</h1>
      <h3>Página no encontrada</h3>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Button variant="primary" onClick={() => navigate("/")}>
        Volver al inicio
      </Button>
    </Container>
  );
};

export default NotFound;
