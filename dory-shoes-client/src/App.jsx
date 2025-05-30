import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Layout
import Layout from "./components/layout/Layout";

// Páginas
import Home from "./components/home/Home";
import Products from "./components/products/Products";
import ProductDetail from "./components/productDetail/ProductDetail";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import NotFound from "./components/errors/NotFound";
import EditProfile from "./components/editProfile/EditProfile"

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas que usan el Layout común */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categoria/:categoria" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/register" element={<Register role={"user"} isEdit={false} />} />
          <Route path="/editProfile/:id" element={<EditProfile/>} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        
        {/* Rutas sin layout */}
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
};

export default App;
