import { Router } from "express";

import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
  } from "../services/product.services.js";

// Rutas para hacer consultas sobre productos

const router = Router();

router.get("/products", getAllProducts);

router.get("/products/:id", getProductById);

router.post("/createProduct", createProduct);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

export default router; // importar en index.js y app.use()