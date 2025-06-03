import { Router } from "express";
import { loginUser, registerUser, updateUser, getUserById, deleteUser, getAllUsers, verifyToken, authorizeRole } from "../services/auth.services.js";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/updateUser", verifyToken, updateUser);

router.get("/getUser/:id", verifyToken, getUserById);

router.put("/deleteUser/:id", verifyToken, deleteUser);

router.get("/getAllUsers", verifyToken, authorizeRole("superAdmin"), getAllUsers)

export default router;