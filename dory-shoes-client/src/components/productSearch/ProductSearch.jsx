import React from "react";
import { Form } from "react-bootstrap";

const ProductSearch = ({ search, onSearch, onSubmit }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();        
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3 form-search" controlId="searchProduct">
        <Form.Control
          type="text"
          placeholder="Buscar"
          value={search}
          onChange={handleChange}
        />
      </Form.Group>
    </Form>
  );
};

export default ProductSearch;
