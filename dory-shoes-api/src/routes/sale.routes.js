import { Router } from "express";

import {
  createSale,
  showAllSales
} from "../services/sale.services.js";
import { verifyToken, authorizeRole } from "../services/auth.services.js";

const router = Router();

router.post("/newSale", verifyToken, createSale);

router.get("/sales", verifyToken, authorizeRole("admin", "superAdmin"), showAllSales);

export default router;