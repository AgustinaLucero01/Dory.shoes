import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import "./Dashboard.css";
import {toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEdit } from "react-icons/md";
import { BsFillTrash3Fill } from "react-icons/bs";

import ProductSearch from "../productSearch/ProductSearch";
import { useAuth } from "../../hooks/useAuth.js";

const ProductsDashboard = ({ openConfirmModal }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const {token} = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    fetch("http://localhost:3000/allProducts", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProducts([...data]))
      .catch((err) => console.log(err));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductForm = (id) => {
    navigate(id ? `./editar-producto/${id}` : `./crear-producto`);
  };

  const handleEliminateProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        fetchProducts();
        toast.success(`👢 Producto eliminado con exito`, {
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
      } else {
        console.error("Error al eliminar el producto");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleShowDeleteModal = (id) => {
    openConfirmModal({
      title: "Eliminar producto",
      message: "¿Estás segura/o de que querés eliminar este producto?",
      onConfirm: () => handleEliminateProduct(id),
    });
  };

  return (
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
                    className="product-img"
                  />
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>
                  <Button
                    className="edit-button me-2"
                    onClick={() => handleProductForm(product.id)}
                  >
                    <MdEdit />
                  </Button>
                  <Button
                    className="edit-button"
                    onClick={() => handleShowDeleteModal(product.id)}
                  >
                    <BsFillTrash3Fill />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default ProductsDashboard;
