import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Dashboard.css";
import ConfirmModal from "../ui/ConfirmModal";
import ProductsDashboard from "./ProductsDashboard";
import UsersDashboard from "./UsersDashboard";
import { useAuth } from "../../hooks/useAuth.js";

const DashboardHome = () => {
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
