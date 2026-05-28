import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";

// Config
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// __dirname setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());

// ✅ Enable Cookie Parser
app.use(cookieParser());

// ✅ Updated CORS Configuration (Multiple Origins Allowed for Development)
const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174"
].filter(Boolean); // Kisi undefined value ko remove karne ke liye

app.use(
    cors({
        origin: function (origin, callback) {
            // browser requests bina origin ke (jaise Postman) ya allowedOrigins list wale sab valid hain
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error("Blocked by CORS Policy"));
            }
        },
        credentials: true
    })
);

// DB Connection
connectDB();

// Static Folder
app.use(
    "/images",
    express.static(
        path.join(__dirname, "uploads")
    )
);

// API Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);

// Home Route
app.get("/", (req, res) => {
    res.send("🚀 API Working smoothly");
});

// Server Start
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