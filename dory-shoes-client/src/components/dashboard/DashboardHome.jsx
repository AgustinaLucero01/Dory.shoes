import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Dashboard.css";
import ConfirmModal from "../ui/ConfirmModal";
import ProductsDashboard from "./ProductsDashboard";
import AdminsDashboard from "./AdminsDashboard";

const DashboardHome = ({}) => {
  const user = {
    role: "superAdmin",
  };

  const [totalAmount, setTotalAmount] = useState(0);
  const [sales, setSales] = useState({ cantidad: 0, monto: 0 });
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    onConfirm: null,
  });

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    fetch("http://localhost:3000/sales")
      .then((res) => res.json())
      .then((data) => {
        setSales(data.sales);
        setTotalAmount(data.totalAmount);
      })
      .catch((err) => console.log(err));
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
      {user?.role === "superAdmin" && (
        <AdminsDashboard openConfirmModal={openConfirmModal} />
      )}

      <ProductsDashboard openConfirmModal={openConfirmModal} />
      <ConfirmModal
        show={showModal}
        onHide={closeModal}
        onConfirm={() => {
          modalConfig.onConfirm();
          closeModal();
        }}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
      />
    </Container>
  );
};

export default DashboardHome;
