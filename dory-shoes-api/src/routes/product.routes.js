import { Router } from "express";

import {
    createProduct,
    deleteProduct,
    getAvailableProducts,
    getProductById,
    updateProduct,
  } from "../services/product.services.js";
  import { verifyToken } from "../services/auth.services.js"

// Rutas para hacer consultas sobre productos
//Falta volver a agregar verifyToken

const router = Router();

router.get("/products", getAvailableProducts);

router.get("/products/:id", getProductById);

router.post("/createProduct", createProduct);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

export default router;