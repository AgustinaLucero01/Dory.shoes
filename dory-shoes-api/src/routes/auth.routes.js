import { Router } from "express";
import { loginUser, registerUser, updateUser, getAllAdmins, getUserByPk, deleteUser, getAllUsers } from "../services/auth.services.js";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/updateUser/:id", updateUser);

router.get("/getAdmins", getAllAdmins);

router.get("/getUser/:id", getUserByPk);

router.put("/deleteUser/:id", deleteUser);

router.get("/getAllUsers", getAllUsers)

export default router;