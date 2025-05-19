import { Router } from "express";

import {
  showAllProductsFromCart,
  addProductToCart,
  dropProductFromCart,
  modifyQuantity,
} from "../services/cart.services.js";
import { verifyToken } from "../services/auth.services.js";

// Rutas relacionadas con el carrito
// - La creación está dentro del registro de usuario
// - El vacío del carrito está dentro de la creación de una venta (Sale)

const router = Router();

router.post("/cart", verifyToken, showAllProductsFromCart);

router.post("/cart/:id", verifyToken, addProductToCart);

router.delete("/cart/:id", verifyToken, dropProductFromCart);

router.put("/cart/:id", verifyToken, modifyQuantity);

export default router; // importar en index.js y app.use()
