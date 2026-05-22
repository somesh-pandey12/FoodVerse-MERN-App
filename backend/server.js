import 'dotenv/config'
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import foodRouter from "./routes/foodRoute.js"

// Config
dotenv.config()

// App
const app = express()
const PORT = process.env.PORT || 4000

import orderRouter from "./routes/orderRoute.js";

// Middleware
app.use(cors())
app.use(express.json())
app.use("/images", express.static("uploads"))
app.use("/api/order", orderRouter);

// DB Connection
connectDB()

// Routes
app.use("/api/user", userRouter)
app.use("/api/food", foodRouter)

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...")
})

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})