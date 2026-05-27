// File Location: backend/routes/userRoute.js
import express from "express";
import { loginUser, registerUser, logoutUser, getUserProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js"; // Importing your security layer

const userRouter = express.Router();

// 🔓 Public Routes (Accessible without logging in)
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

userRouter.get("/me", authMiddleware, getUserProfile);

export default userRouter;