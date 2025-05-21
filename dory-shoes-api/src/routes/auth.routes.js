import { Router } from "express";
import { loginUser, registerUser, updateUser } from "../services/auth.services.js";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/updateUser/:id", updateUser);

export default router;