import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table, Alert } from "react-bootstrap";
import "./Dashboard.css";

const AdminsDashboard = ({ openConfirmModal }) => {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    fetch("http://localhost:3000/getAdmins")
      .then((res) => res.json())
      .then((data) => setAdmins([...data]))
      .catch((err) => console.log(err));
  };

  const eliminateAdmin = async (id) => {
  try {
    await fetch(`http://localhost:3000/deleteUser/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchAdmins();
  } catch (err) {
    console.error(err);
  }
};

  const handleShowDeleteModal = (id) => {
    openConfirmModal({
      title: "Eliminar administrador",
      message: "¿Estás segura/o de que querés eliminar este administrador?",
      onConfirm: () => eliminateAdmin(id),
    });
  };
  return (
    <Row className="mb-4">
      <Col>
        <h3>Administradores</h3>
        <Button
          variant="success"
          className="add-button"
          onClick={() => handleProductForm(null)}
        >
          Agregar administrador
        </Button>
        {admins.length === 0 ? (
          <Alert variant="info">No hay administradores registrados.</Alert>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleShowDeleteModal(admin.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default AdminsDashboard;
