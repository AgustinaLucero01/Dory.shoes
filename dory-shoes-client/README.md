# 👟 Dory Shoes – E-commerce de Calzado

Dory Shoes es una tienda online de calzado, desarrollada como parte del Trabajo Práctico Integrador (TPI) de la materia **Programación III** de la Tecnicatura Universitaria en Programación. UTN Rosario

## Tecnologías utilizadas

- **Frontend:** React
- **Backend:** Node.js + Express
- **Base de datos:** SQLite
- **Estilos:** CSS / Bootstrap
- **Routing:** React Router
- **Gestión de estado:** Context API
- **Autenticación y permisos:** Middleware en Express + almacenamiento local/token en frontend

## Objetivo del proyecto

Aplicar los conocimientos adquiridos durante la cursada para el desarrollo completo de una aplicación web tipo SPA (Single Page Application), que simule un negocio real.  
Se implementaron funcionalidades como ABM, autenticación con roles, validaciones, rutas protegidas, uso de Context y custom hooks.

## Roles de usuarios

El sistema implementa autenticación con 3 roles de usuarios:

- **Super Admin:** Control total. Crea y gestiona admins.
- **Admin:** Gestión de productos, ventas y usuarios comunes.
- **Usuario común:** Navegación, compras y gestión de su cuenta.

## Funcionalidades principales

- ABM para:
  - Usuarios
  - Productos
  - Carrito de compras
- Registro y login con validaciones y autenticacion
- Validación de formularios con mensajes de error
- Enrutado dinámico con `react-router`
- Protección de rutas por rol
- Uso de Context API
- Desarrollo de al menos un Custom Hook

## Cómo ejecutar el proyecto : 

### Backend (Node + Express)

```bash
cd backend
npm install
npm run dev
npm node dory-shoes-api/src/scripts/populateDB.js
npm express	Servidor web	Framework para construir APIs con Node.js.
npm sequelize	ORM / Base de datos	ORM para trabajar con SQL desde JavaScript.
npm sqlite3	Base de datos	Base de datos embebida usada junto con Sequelize.
npm bcrypt	Seguridad	Para hashear contraseñas de forma segura.
npm jsonwebtoken	Seguridad / Auth	Para crear y verificar tokens JWT (autenticación).
npm morgan	Middleware / Logs	Logger HTTP para desarrollo (muestra las peticiones en consola).
npm node-fetch	Cliente HTTP	Para hacer solicitudes HTTP desde el servidor.
```

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
npm react-dom	Maneja el renderizado en el DOM.
npm react-router-dom	Enrutamiento en apps React (SPA).
npm react-bootstrap	Componentes de Bootstrap en React.
npm bootstrap	Estilos de Bootstrap (CSS y JS).
npm bootstrap-icons	Iconos de Bootstrap en SVG.
npm react-icons	Colección de iconos de múltiples bibliotecas.
npm mdb-react-ui-kit	Componentes Bootstrap con diseño Material.
npm react-toastify	Notificaciones tipo “toast” en React.
npm jwt-decode Decodifica tokens JWT en el navegador.
```

La aplicacion deberia correr en: `http://localhost:5173`  
Y el backend en: `http://localhost:3000`


## 👨‍💻 Integrantes

- Rey Justina
- Lucero Agustina
- Moyano Maria Laura



