import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Alert,
} from "react-bootstrap";
import "./Dashboard.css";
import ProductSearch from "../productSearch/ProductSearch";

const DashboardHome = ({ user }) => {
  const navigate = useNavigate();

  const [sales, setSales] = useState({ cantidad: 0, monto: 0 });
  const [products, setProducts] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSales();
    fetchProducts();
    if (user?.rol === "superAdmin") {
      fetchAdmins();
    }
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

  const fetchProducts = async () => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts([...data]))
      .catch((err) => console.log(err));
  };

  //Agregar ruta para ver todos los usuarios con rol Admin
  const fetchAdmins = async () => {
    fetch("http://localhost:3000/admins")
      .then((res) => res.json())
      .then((data) => setAdmins([...data]))
      .catch((err) => console.log(err));
  };

  const eliminateProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        fetchProducts();
      } else {
        console.error("Error al eliminar el producto");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const eliminateAdmin = async (id) => {
    fetch(`http://localhost:3000/users/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductForm = (id) => {
    navigate(id ? `./editar-producto/${id}` : `./crear-producto`);
  };
  return (
    <Container className="dashboard-container">
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

      <Row className="mb-4">
        <Col>
          <h3>Productos disponibles</h3>
          <Button
            variant="success"
            className="add-button"
            onClick={() => handleProductForm(null)}
          >
            Agregar producto
          </Button>
          <Row className="mb-4">
            <Col md={6} lg={4}>
              <ProductSearch search={searchTerm} onSearch={setSearchTerm} />
            </Col>
          </Row>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-80"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>
                    <Button
                      variant="primary"
                      className="edit-button me-2"
                      onClick={() => handleProductForm(product.id)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      className="edit-button"
                      onClick={() => eliminateProduct(product.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {user?.rol === "superAdmin" && (
        <Row className="mb-4">
          <Col>
            <h3>Administradores</h3>
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
                      <td>{admin.nombre}</td>
                      <td>{admin.email}</td>
                      <td>
                        <Button
                          variant="primary"
                          href={`/editar-admin/${admin.id}`}
                          className="me-2"
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => eliminateAdmin(admin.id)}
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
      )}
    </Container>
  );
};

export default DashboardHome;
