import { Router } from "express";

import {
    createProduct,
    deleteProduct,
    getAvailableProducts,
    getProductById,
    updateProduct,
    getProducts
  } from "../services/product.services.js";
  import { verifyToken, authorizeRole, optionalAuth } from "../services/auth.services.js"

// Rutas para hacer consultas sobre productos
//Falta volver a agregar verifyToken

const router = Router();

router.get("/allProducts", verifyToken, authorizeRole("admin", "superAdmin"), getProducts);

router.get("/products", getAvailableProducts);

router.get("/products/:id", optionalAuth, getProductById);

router.post("/createProduct", verifyToken, authorizeRole("admin", "superAdmin"),  createProduct);

router.put("/products/:id", verifyToken, authorizeRole("admin", "superAdmin"), updateProduct);

router.delete("/products/:id", verifyToken, authorizeRole("admin", "superAdmin"), deleteProduct);

export default router;