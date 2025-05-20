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

const router = Router();

router.get("/products", verifyToken, getAvailableProducts);

router.get("/products/:id", verifyToken, getProductById);

router.post("/createProduct", verifyToken, createProduct);

router.put("/products/:id", verifyToken, updateProduct);

router.delete("/products/:id", verifyToken, deleteProduct);

export default router;