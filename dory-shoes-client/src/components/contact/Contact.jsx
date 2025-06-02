import React from 'react';

import './contact.css';
const Contact= () => {
  return (
    <section className="contacto-container">
      <h1 className="contacto-titulo">Contacto</h1>
      <p className="contacto-texto">
        ¿Tenés alguna duda, consulta o simplemente querés saludarnos? Estamos para ayudarte.
      </p>
      <p className="contacto-texto">
        Como somos una tienda online, podés comunicarte con nosotras a través de los siguientes medios:
      </p>

      <ul className="contacto-lista">
        <li><strong>Email:</strong> doryshoes@gmail.com</li>
        <li><strong>Instagram:</strong> <a href="https://instagram.com/doryshoes" target="_blank">@doryshoes</a></li>
        <li><strong>WhatsApp:</strong> +54 9 11 2345 6789</li>
      </ul>

      <p className="contacto-texto">
        Respondemos lo más pronto posible 💬
      </p>
    </section>
  );
};

export default Contact;