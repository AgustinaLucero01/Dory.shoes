import React from "react";
import { Form } from "react-bootstrap";

const BookSearch = ({ search, onSearch }) => {
  const handleProductSearch = (e) => {
    onSearch(e.target.value);
  };
  return (
    <div>
      <Form.Group className="mb-3 form-search" controlId="searchBook">
        <Form.Control
          type="text"
          placeholder="Buscar"
          onChange={handleProductSearch}
          value={search}
        />
      </Form.Group>
    </div>
  );
};

export default BookSearch;
