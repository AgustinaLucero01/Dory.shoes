import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import "./ProductForm.css";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  //Si recibimos un id por parámetro, estamos editando un producto
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "botas",
    sizes: {
      35: 0,
      36: 0,
      37: 0,
      38: 0,
      39: 0,
      40: 0,
    },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const CATEGORIES = ["botas", "zapatillas", "zapatos", "pantuflas"];

  useEffect(() => {
    if (isEdit) {
      fetch(`http://localhost:3000/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const sizesObj = {
            35: 0,
            36: 0,
            37: 0,
            38: 0,
            39: 0,
            40: 0,
          };

          data.productSizes.forEach(({ size, stock }) => {
            sizesObj[size] = stock;
          });

          setFormData({
            name: data.name,
            description: data.description,
            price: data.price,
            imageUrl: data.imageUrl,
            category: data.category,
            sizes: sizesObj,
          });
        })
        .catch((err) => setError(`Error al cargar el producto: ${err}`));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("size_")) {
      const size = name.split("_")[1];
      setFormData((prev) => ({
        ...prev,
        sizes: {
          ...prev.sizes,
          [size]: parseInt(value, 10),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `/products/${id}` : "/createProduct";
    try {
      const response = await fetch(`http://localhost:3000${url}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(isEdit ? "Producto actualizado." : "Producto creado.");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setError(result.message || "Ocurrió un error.");
      }
    } catch (err) {
      setError("Error al enviar el formulario.");
    }
  };

  return (
    <Container className="form-container">
      <Card>
        <Card.Body>
          <Card.Title className="mb-4 text-center">
            {isEdit ? "Actualizar producto" : "Crear producto"}
          </Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>URL de imagen</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <h5 className="mt-4">Talles y stock</h5>
            <Row>
              {Object.entries(formData.sizes).map(([size, stock]) => (
                <Col xs={6} md={4} lg={3} className="mb-2" key={size}>
                  <div className="d-flex align-items-center">
                    <span className="me-2">Talle {size}:</span>
                    <Form.Control
                      type="number"
                      name={`size_${size}`}
                      value={stock}
                      onChange={handleChange}
                      min="0"
                      style={{ width: "80px" }}
                    />
                  </div>
                </Col>
              ))}
            </Row>

            <div className="d-flex justify-content-around mt-4">
              <Button
                variant="secondary"
                onClick={() => navigate("/dashboard")}
              >
                Volver
              </Button>
              <Button variant="secondary" type="submit">
                {isEdit ? "Actualizar" : "Crear"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductForm;
