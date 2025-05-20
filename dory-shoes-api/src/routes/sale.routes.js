import { Router } from "express";

import {
  createSale,
  showAllSales
} from "../services/sale.services.js";
import { verifyToken } from "../services/auth.services.js";

const router = Router();

router.post("/newSale", verifyToken, createSale);

router.get("/sales", verifyToken, showAllSales);

export default router; // importar en index.js y app.use()
