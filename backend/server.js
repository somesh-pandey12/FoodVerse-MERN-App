import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";

// Router Imports
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// 🌍 CORS CONFIGURATION
// ==========================================
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",")
  : ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ==========================================
// 🛡️ GLOBAL MIDDLEWARES
// ==========================================
app.use(express.json());
app.use(cookieParser());

// Google OAuth Fix
app.use((req, res, next) => {
  res.setHeader(
    "Cross-Origin-Opener-Policy",
    "same-origin-allow-popups"
  );
  next();
});

// ==========================================
// 🗄️ DATABASE & FILES
// ==========================================
connectDB();

app.use("/images", express.static(path.join(__dirname, "uploads")));

// ==========================================
// 🌐 API ROUTES
// ==========================================
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("🚀 API Working smoothly!");
});

// ==========================================
// 🔌 SOCKET.IO SETUP
// ==========================================
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("✅ User Connected:", socket.id);

  // Admin status update
  socket.on("update_order_status", (data) => {
    console.log("📦 Status Updated:", data);

    // Sabhi connected clients ko update bhejo
    io.emit("status_changed", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ User Disconnected:", socket.id);
  });
});

// ==========================================
// 🚀 START SERVER
// ==========================================
httpServer.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});