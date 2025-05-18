import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CustomNavbar from './components/customNavbar/CustomNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from './components/home/Home';


import Footer from './components/footer/Footer';
import Products from "./components/products/Products";
import ProductDetail from "./components/productDetail/ProductDetail";
/*import Login from './components/login/Login';
import Registro from './components/registro/Registro';*/

const App = () => {
  return (
    <Router>
       <div className="app-container d-flex flex-column min-vh-100">

       
        <CustomNavbar />

        
        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<Home />} />
           
           
            <Route path="/categoria/:categoria" element={<Products />} />
           
           
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>

       
        <Footer />

      </div>
    </Router>
  );
};

export default App;
