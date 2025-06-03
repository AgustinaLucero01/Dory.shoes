import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table, Alert } from "react-bootstrap";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, Bounce } from "react-toastify";
import ProductSearch from "../productSearch/ProductSearch";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Service/auth/usercontext/UserContext";
import { MdEdit } from "react-icons/md";
import { BsFillTrash3Fill } from "react-icons/bs";

const UsersDashboard = ({ openConfirmModal }) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/getAllUsers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers([...data]);
    } catch (err) {
      console.log(err);
    }
  };

  const eliminateAdmin = async (id) => {
    try {
      await fetch(`http://localhost:3000/deleteUser/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      fetchUsers();
      toast.success(`👤 Administrador eliminado con éxito`, {
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

  const handleEditUser = (id) => {
    navigate(`./editar-usuario/${id}`, { state: { from: "/dashboard" } });
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Row className="mb-4">
      <Col>
        <h3>Usuarios</h3>
        <Row className="mb-4">
          <Col md={6} lg={4}>
            <ProductSearch search={searchTerm} onSearch={setSearchTerm} />
          </Col>
        </Row>
        {filteredUsers.length === 0 ? (
          <Alert variant="info">No hay administradores registrados.</Alert>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.active ? "Activo" : "Inactivo"}</td>
                  <td className="d-flex gap-2 flex-wrap">
                    <Button className="user-button" onClick={() => handleEditUser(user.id)}>                     
                      <MdEdit/>
                    </Button>
                    <Button className="user-button" onClick={() => handleShowDeleteModal(user.id)}>
                      <BsFillTrash3Fill/>
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

export default UsersDashboard;
