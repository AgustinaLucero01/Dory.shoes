import { Router } from "express";
import { addFavourite, deleteFavourite, showAllUserFavourites } from "../services/favourites.services.js";

const router = Router();

router.post("/addFavourite", addFavourite);

router.delete("/deleteFavourite", deleteFavourite);

router.get("/showFavourites", showAllUserFavourites);

export default router;