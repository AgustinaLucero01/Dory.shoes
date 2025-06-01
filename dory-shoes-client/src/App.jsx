import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Layout
import Layout from "./components/layout/Layout";

// Páginas
import Home from "./components/home/Home";
import Products from "./components/products/Products";
import ProductDetail from "./components/productDetail/ProductDetail";
import Register from "./components/register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import NotFound from "./components/errors/NotFound";
import EditProfile from "./components/editProfile/EditProfile";
import Faq from "./components/faq/Faq";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Cart from "./components/cart/Cart";
import Protected from "./components/protected/Protected";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Unauthorized from "./components/errors/Unauthorized";
import Shopping from "./components/Shopping/Shopping";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categoria/:categoria" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route
          path="/register"
          element={<Register role={"user"} isEdit={false} />}
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />}></Route>
        <Route path="/faq" element={<Faq />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Protected />}>
          <Route path="/editProfile/:id" element={<EditProfile />} />
          <Route path="/shopping" element={<Shopping/>}></Route>
        </Route>

        <Route element={<PrivateRoute allowedRoles={["admin", "superAdmin"]} />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>
      </Route>

      

      
    </Routes>
  );
};

export default App;
