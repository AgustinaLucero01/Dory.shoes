// src/components/layout/Layout.jsx
import CustomNavbar from "../customNavbar/CustomNavbar";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <CustomNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
