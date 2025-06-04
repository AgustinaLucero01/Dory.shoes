import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Dashboard.css";
import ConfirmModal from "../ui/ConfirmModal";
import ProductsDashboard from "./ProductsDashboard";
import UsersDashboard from "./UsersDashboard";
import { useAuth } from "../../hooks/useAuth.js";
import { Route, Routes, useLocation } from "react-router-dom";
import { toast, ToastContainer, Bounce } from "react-toastify";

const DashboardHome = () => {
  //Manejo de toasts
  const location = useLocation();
  useEffect(() => {
    if (location.state?.AddedProduct) {
      toast.success(`✅ Producto agregado con éxito`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      window.history.replaceState({}, document.title); // Limpia el state
    }

    if (location.state?.UpdatedProduct) {
      toast.info(`✏️ Producto editado con éxito`, {
        position: "bottom-left",
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

    if (location.state?.showConfirmEdit) {
      toast.success(`✅ Los datos del usuario se modificaron con éxito`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      window.history.replaceState({}, document.title); // Limpia el state
    }
    
  }, [location.state]);

  const { role, token } = useAuth();

  const [totalAmount, setTotalAmount] = useState(0);
  const [sales, setSales] = useState({ cantidad: 0, monto: 0 });
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    onConfirm: null,
  });

  const [activeTab, setActiveTab] = useState("usuarios");

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await fetch("http://localhost:3000/sales", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSales(data.sales);
      setTotalAmount(data.totalAmount);
    } catch (err) {
      console.log(err);
    }
  };

  const openConfirmModal = ({ title, message, onConfirm }) => {
    setModalConfig({ title, message, onConfirm });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalConfig({ title: "", message: "", onConfirm: null });
  };

  return (
    <Container>
      <ToastContainer/>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Ventas Totales</Card.Title>
              <Card.Text>
                Cantidad de compras: <strong>{sales.length}</strong>
                <br />
                Monto total ganado: <strong>${totalAmount}</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {role === "superAdmin" && (
        <Row className="mb-4">
          <Col>
            <div className="tab-selector">
              <div
                className={`tab-option ${
                  activeTab === "usuarios" ? "active" : ""
                }`}
                onClick={() => setActiveTab("usuarios")}
              >
                Usuarios
              </div>
              <div
                className={`tab-option ${
                  activeTab === "productos" ? "active" : ""
                }`}
                onClick={() => setActiveTab("productos")}
              >
                Productos
              </div>
            </div>
          </Col>
        </Row>
      )}

      {role === "superAdmin" ? (
        activeTab === "usuarios" ? (
          <UsersDashboard openConfirmModal={openConfirmModal} />
        ) : (
          <ProductsDashboard openConfirmModal={openConfirmModal} />
        )
      ) : (
        <ProductsDashboard openConfirmModal={openConfirmModal} />
      )}

      <ConfirmModal
        show={showModal}
        onHide={closeModal}
        onConfirm={() => {
          modalConfig.onConfirm();
          closeModal();
        }}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText="Sí, estoy segura/o"
        cancelText="Cancelar"
      />
      
    </Container>
  );
};

export default DashboardHome;
