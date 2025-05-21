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

router.get("/cart", showAllProductsFromCart);

router.post("/cart/:productId", addProductToCart);

router.delete("/cart", dropProductFromCart);

router.put("/cart", modifyQuantity);

export default router;
