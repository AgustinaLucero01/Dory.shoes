import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./Dashboard.css";

import ProductForm from "../productForm/ProductForm";
import DashboardHome from "./DashboardHome";
import Register from "../Register/Register";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = ({}) => {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.AddedProduct) {
      toast.success(`✅ Producto agregado con éxito`, {
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
      window.history.replaceState({}, document.title); // Limpia el state
    }

    if (location.state?.UpdatedProduct) {
      toast.info(`✏️ Producto editado con éxito`, {
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
      window.history.replaceState({}, document.title);
    }

    if (location.state?.showConfirmNewAdmin) {
      toast.success(`✅ Se agregó un nuevo admin con éxito`, {
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
      window.history.replaceState({}, document.title); // Limpia el state
    }
    
  }, [location.state]);

  return (
    <div className="dashboard-container">
      <ToastContainer />
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
