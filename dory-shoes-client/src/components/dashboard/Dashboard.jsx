import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./Dashboard.css";

import ProductForm from "../productForm/ProductForm";
import DashboardHome from "./DashboardHome";

const Dashboard = ({}) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Routes>
        <Route index element={<DashboardHome />}></Route>
        <Route path="crear-producto" element={<ProductForm />} />
        <Route path="editar-producto/:id" element={<ProductForm />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
