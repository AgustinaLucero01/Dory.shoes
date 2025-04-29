import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import CustomNavbar from './components/customNavbar/CustomNavbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home/Home'; 
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Products from './components/products/Products';



const App = () => {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:categoria" element={<Products />} />
        {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
