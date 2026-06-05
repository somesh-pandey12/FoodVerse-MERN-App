// File Location: backend/server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

// Router Imports
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// ==========================================
// 📁 __dirname FIX FOR ES MODULES
// ==========================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// 🌍 CORS CONFIGURATION (MUST BE FIRST)
// ==========================================
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"] 
}));

// ==========================================
// 🛡️ GLOBAL MIDDLEWARES
// ==========================================
app.use(express.json());
app.use(cookieParser());

// Google OAuth Fix
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    next();
});

// ==========================================
// 🗄️ DATABASE CONNECTION
// ==========================================
connectDB();

// ==========================================
// 📁 STATIC FILES
// ==========================================
app.use("/images", express.static(path.join(__dirname, "uploads")));

// ==========================================
// 🌐 API ROUTES
// ==========================================
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// ==========================================
// 🏠 HOME ROUTE
// ==========================================
app.get("/", (req, res) => {
    res.send("🚀 API Working smoothly with Razorpay Configured!");
});

// ==========================================
// ❌ GLOBAL ERROR HANDLER
// ==========================================
app.use((err, req, res, next) => {
    console.error("🔥 SERVER ERROR:", err);
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

// ==========================================
// 🚀 START SERVER
// ==========================================
app.listen(port, "0.0.0.0", () => {
    console.log("======================================");
    console.log(`🚀 Backend Running On Port ${port}`);
    console.log(`🌐 http://localhost:${port}`);
    console.log("======================================");
});