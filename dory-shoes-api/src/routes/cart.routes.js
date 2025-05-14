import { Router } from "express";

import {
    createCart,
    emptyCart,
    getAllProducts,
    getProductById,
    updateProduct,
  } from "../services/product.services.js";
  import { verifyToken } from "../services/auth.services.js"

// Rutas para hacer consultas sobre productos

const router = Router();

router.get("/products", verifyToken, getAllProducts);

router.get("/products/:id", verifyToken, getProductById);

router.post("/createProduct", verifyToken, createProduct);

router.put("/products/:id", verifyToken, updateProduct);

router.delete("/products/:id", verifyToken, deleteProduct);

export default router; // importar en index.js y app.use()