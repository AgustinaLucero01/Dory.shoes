import { Router } from "express";

import {
  createSale,
  showAllSales
} from "../services/sale.services.js";
import { verifyToken } from "../services/auth.services.js";

const router = Router();

router.post("/newSale", verifyToken, createSale);

router.get("/sales", showAllSales);

export default router;