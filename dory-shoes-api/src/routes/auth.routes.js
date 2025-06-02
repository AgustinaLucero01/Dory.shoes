import { Router } from "express";
import { loginUser, registerUser, updateUser, getAllAdmins, getUserById, deleteUser, getAllUsers, verifyToken, authorizeRole } from "../services/auth.services.js";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/updateUser", verifyToken, updateUser);

router.get("/getAdmins", verifyToken, authorizeRole("admin", "superAdmin"), getAllAdmins);

router.get("/getUser", verifyToken, getUserById);

router.put("/deleteUser/:id", verifyToken, deleteUser);

//Ruta creada para verificar la creación de usuarios
router.get("/getAllUsers", getAllUsers)

export default router;