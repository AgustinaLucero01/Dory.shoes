import React from 'react';

import './about.css';

const About = () => {
  return (
    <div className="nosotros-container">
      <h1 className="nosotros-titulo">Sobre Dory Shoes</h1>
      <p className="nosotros-texto">
        En <strong>Dory Shoes</strong> creemos que cada mujer merece caminar con estilo, comodidad y confianza. 
        Somos una zapatería 100% online especializada en calzado femenino, pensada para acompañarte en todos tus pasos, sin importar el momento o la ocasión.
      </p>
      <p className="nosotros-texto">
        No contamos con local físico, lo que nos permite enfocarnos en ofrecerte una experiencia de compra práctica, directa y segura a través de nuestra plataforma web. 
        Nuestro objetivo es acercarte modelos exclusivos, cómodos y modernos, con envíos a todo el país.
      </p>
      <p className="nosotros-texto">
        Gracias por elegirnos. En Dory Shoes caminamos con vos. 💖
      </p>
    </div>
  );
};

export default About;