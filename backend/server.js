// File Location: backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(); // 👈 Environment variables initialized right at the start

import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

// Router Imports
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js"; // 📦 Sync with Razorpay logic

const app = express();
const port = process.env.PORT || 8000;

// __dirname setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// 🛡️ MIDDLEWARES (SABSE UPAR)
// ==========================================

// 1. ✅ Enable JSON Body Parser
app.use(express.json());

// 2. ✅ Enable Cookie Parser
app.use(cookieParser());

// 3. ✅ Updated CORS Configuration (Placed before any API call routers)
const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174"
].filter(Boolean); // Filter out undefined values safely

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps, Postman) or origins in allowed list
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error("Blocked by CORS Policy"));
            }
        },
        credentials: true
    })
);
// 🗄️ DATABASE CONNECTION

connectDB();
// 📁 STATIC ASSETS ENGINE

app.use("/images", express.static("uploads"));

// 🌐 API CONTROLLER ROUTERS 

app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter); // 👈 Correct sequence placement for cross-origin razorpay requests

// Home Route
app.get("/", (req, res) => {
    res.send("🚀 API Working smoothly with Razorpay Configured!");
});
// 🚀 SERVER BOOT ENGINE

app.use((err, req, res, next) => {
    if (err.message === "Blocked by CORS Policy") {
        res.status(403).json({ success: false, message: "CORS Blocked this request." });
    } else {
        next(err);
    }
});

app.listen(
    port,
    "0.0.0.0",
    () => {
        console.log("======================================");
        console.log(`🚀 Backend Running On Port ${port}`);
        console.log(`🌐 http://localhost:${port}`);
        console.log("======================================");
    }
);