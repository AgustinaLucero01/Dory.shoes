import { Router } from "express";
import { addFavourite, deleteFavourite, showAllUserFavourites } from "../services/favourite.services.js";
import {verifyToken} from "../services/auth.services.js"

const router = Router();

router.post("/addFavourite", verifyToken, addFavourite);

router.delete("/deleteFavourite/:id", deleteFavourite);

router.get("/showFavourites", verifyToken, showAllUserFavourites);

export default router;