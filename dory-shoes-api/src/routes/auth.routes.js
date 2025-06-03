import { Router } from "express";
import { loginUser, registerUser, updateUser, getUserById, deleteUser, getAllUsers, verifyToken, authorizeRole, dropUsers } from "../services/auth.services.js";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/updateUser",  updateUser);

router.get("/getUser/:id", verifyToken, getUserById);

router.put("/deleteUser/:id", verifyToken, deleteUser);

router.get("/getAllUsers", verifyToken, authorizeRole("superAdmin"), getAllUsers)

router.delete("/dropAllUsers", dropUsers);

export default router;