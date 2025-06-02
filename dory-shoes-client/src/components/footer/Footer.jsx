import React from 'react';
import './footer.css';  // Importar el archivo CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <div className="social-links">
          <a
            href="https://www.instagram.com/dory.shoes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark"
          >
            <i className="bi bi-instagram fs-4"></i>
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark"
          >
            <i className="bi bi-facebook fs-4"></i>
          </a>
        </div>
        <div>© 2025 Dory Shoes - Todos los derechos reservados.</div>
      </div>
    </footer>
  );
};

export default Footer;


