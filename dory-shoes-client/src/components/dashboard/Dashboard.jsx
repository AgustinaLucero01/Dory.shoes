import React from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import DashboardHome from "./DashboardHome";
import ProductForm from "../productForm/ProductForm";

const Dashboard = ({ user }) => {

  return (
    <div>
      <h1>Bienvenido al Dashboard, User</h1>
      <Routes>
        <Route index element={<DashboardHome user={user}/>}></Route>
        <Route path="crear-producto" element={<ProductForm />} />
        <Route path="editar-producto/:id" element={<ProductForm />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
