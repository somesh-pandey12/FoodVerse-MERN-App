// File Location: backend/server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

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

const app = express();
const port = process.env.PORT || 8000;

// ==========================================
// 📁 __dirname FIX FOR ES MODULES
// ==========================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// 🛡️ GLOBAL MIDDLEWARES
// ==========================================

// ✅ JSON Parser
app.use(express.json());

// ✅ Cookie Parser
app.use(cookieParser());

// ==========================================
// 🌍 CORS CONFIGURATION
// ==========================================

const allowedOrigins = [
    "https://food-verse-mern-app.vercel.app", // ✅ Explicitly added Vercel URL
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174"
].filter(Boolean);

// Debug Allowed Origins
console.log("======================================");
console.log("🌍 Allowed Origins:");
console.log(allowedOrigins);
console.log("======================================");

app.use(
    cors({
        origin: function (origin, callback) {

            // ✅ Allow requests without origin
            // (Postman, Mobile Apps, Thunder Client)
            if (!origin) {
                return callback(null, true);
            }

            // ✅ Allow matched frontend origins
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            console.log("❌ Blocked Origin:", origin);

            return callback(
                new Error("Blocked by CORS Policy"),
                false
            );
        },

        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    })
);

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

    if (err.message === "Blocked by CORS Policy") {
        return res.status(403).json({
            success: false,
            message: "CORS Blocked this request."
        });
    }

    console.error("🔥 SERVER ERROR:", err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
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