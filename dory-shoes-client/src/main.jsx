import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importar tus contextos
import CartProvider from './components/Service/CartContext/CartContext';
import { UserProvider } from './components/Service/usercontext/UserContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
