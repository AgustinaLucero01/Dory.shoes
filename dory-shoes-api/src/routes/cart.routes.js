import { Router } from "express";

import {
  showAllProductsFromCart,
  addProductToCart,
  dropProductFromCart,
  modifyQuantity,
  getCartDetails,
  dropAllProductsFromCart,
} from "../services/cart.services.js";
import { verifyToken } from "../services/auth.services.js";

// Rutas relacionadas con el carrito
// - La creación está dentro del registro de usuario
// - El vacío del carrito está dentro de la creación de una venta (Sale)

const router = Router();

router.get("/cartProducts", verifyToken, showAllProductsFromCart);

router.get("/cart", verifyToken, getCartDetails);

router.post("/cart/:productId", verifyToken, addProductToCart);

router.delete("/cart", verifyToken, dropProductFromCart);

router.delete("/allCart", verifyToken, dropAllProductsFromCart)

router.put("/cart",verifyToken, modifyQuantity);

export default router;
