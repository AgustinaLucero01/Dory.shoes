import express from "express";

import { PORT } from "./config.js";
import bookRoutes from "./routes/book.routes.js";
import { sequelize } from "./db.js";
import "./models/Books.js";

const app = express();

try {
  app.use(express.json()); // permite que Express entienda el cuerpo (body) de las peticiones JSON
  // express.json() debe estar ANTES de las rutas

  //Para evitar problemas de CORS (Cross-Origin Resource Sharing)
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    //next: pasa al siguiente middleware, sin terminar la ejecución del ciclo request-response
    //Este código es RIESGOSO
    next();
  });

  app.use(bookRoutes);
  await sequelize.authenticate();
  await sequelize.sync(); // crea las tablas si no existen

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
} catch (error) {
  console.log(`Ocurrió un error en la inicialización.`, error);
}
