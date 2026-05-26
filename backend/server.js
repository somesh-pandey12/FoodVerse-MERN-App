// File Location: backend/server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 8000;

// Path handling for ES Modules to serve uploaded images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*" })); // Allows any frontend port (5173, 5174) to connect flawlessly
app.use("/images", express.static(path.join(__dirname, "uploads")));

// 🗄️ MongoDB Connection Setup
// Replace the connection string with your local MongoDB string or MongoDB Atlas URI
const mongoURI = "mongodb://127.0.0.1:27017/food-delivery";
mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected Flawlessly!"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// 🛒 Mongoose Schema definition for Food items
const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true }
});
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

// 📄 API Endpoints Configuration
// 1. Add Food Item Route
app.post("/api/food/add", async (req, res) => {
    try {
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.body.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"
        });
        await food.save();
        res.json({ success: true, message: "Food Item Added Successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error adding food item" });
    }
});

// 2. Get All Food Items Route
app.get("/api/food/list", async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching food list" });
    }
});

// Root Route
app.get("/", (req, res) => {
    res.send("API Working smoothly");
});

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});