import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config";

// App Initialization
const app = express();
const port = process.env.PORT || 8000; // Reads port dynamically from .env

// 1. Core Middlewares
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"],
    credentials: true
}));

// 2. Async Database Connection Execution
const startServer = async () => {
    try {
        await connectDB();
        
        // 3. Static Media Delivery Route
        app.use("/images", express.static('uploads'));

        // 4. API Endpoints Map
        app.use("/api/food", foodRouter);
        app.use("/api/user", userRouter);
        app.use("/api/cart", cartRouter);
        app.use("/api/order", orderRouter);

        // Global Base Testing Route
        app.get("/", (req, res) => {
           res.status(200).json({ 
                success: true, 
                message: `API Working Perfectly On Port ${port}!`,
                timestamp: new Date()
           });
        });

        // Global Error Boundary Middleware
        app.use((err, req, res, next) => {
            console.error("💥 Internal System Server Error:", err.stack);
            res.status(500).json({ success: false, message: "Internal Server Middleware Error!" });
        });

        // 5. Network Binding Listener (Listen on all local interfaces)
        app.listen(port, () => {
            console.log(`==================================================`);
            console.log(`🚀 FRESH BACKEND LIVE ON: http://localhost:${port}`);
            console.log(`==================================================`);
        });

    } catch (error) {
        console.error("💥 Server Startup Initialization Failed:", error.message);
        process.exit(1); 
    }
};

// Fire the server
startServer();