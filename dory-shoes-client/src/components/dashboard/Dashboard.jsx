import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./Dashboard.css";
import ProductForm from "../productForm/ProductForm";
import DashboardHome from "./DashboardHome";
import Register from "../Register/Register";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = ({}) => {

  return (
    <div className="dashboard-container">
      
      <Container className="d-flex justify-content-center my-4">
        <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
          Dashboard del vendedor
        </h1>
      </Container>
      <Routes>
        <Route index element={<DashboardHome />}></Route>
        <Route path="crear-producto" element={<ProductForm />} />
        <Route path="editar-producto/:id" element={<ProductForm />} />
        <Route path="editar-usuario/:userId" element={<Register isEdit={true} />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
