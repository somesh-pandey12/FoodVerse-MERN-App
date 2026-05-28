// File Location: backend/routes/userRoute.js

import express from "express";
// ✅ Import statements ko bilkul matched name "getUserProfile" diya hai
import { 
    loginUser, 
    registerUser, 
    googleAuth, 
    logoutUser, 
    getUserProfile 
} from "../controllers/userController.js"; 
import authMiddleware from "../middleware/auth.js"; // Tumhari structural middleware file

const userRouter = express.Router();

// 📬 Authentication Routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/google-login", googleAuth);
userRouter.post("/logout", logoutUser);

// 👤 Protected Profiles Access Node 
userRouter.get("/me", authMiddleware, getUserProfile); // Fixed hook placement here

export default userRouter;