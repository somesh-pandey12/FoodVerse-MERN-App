import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

import userRouter from "./routes/userRoute.js";

const app = express();
const port = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Enable Cookie Parser
app.use(cookieParser());

// ✅ CORS Configuration for Cookies/Auth
app.use(
    cors({
        origin:
            process.env.CLIENT_URL ||
            "http://localhost:5173",

        credentials: true
    })
);

app.use(
    "/images",
    express.static(
        path.join(__dirname, "uploads")
    )
);

app.use("/api/user", userRouter);

const mongoURI =
    "mongodb://127.0.0.1:27017/food-delivery";

mongoose.connect(
    mongoURI,
    {
        serverSelectionTimeoutMS: 5000
    }
)
.then(() => {

    console.log(
        "========================================="
    );

    console.log(
        "✅ DATABASE STATUS: MongoDB Connected Successfully!"
    );

    console.log(
        "========================================="
    );
})
.catch((err) => {

    console.log(
        "========================================="
    );

    console.log(
        "❌ DATABASE ERROR: MongoDB connection failed!"
    );

    console.log(
        "👉 Make sure your local MongoDB compass/service is active."
    );

    console.log(
        "========================================="
    );

    console.error(err);
});

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    }
});

const foodModel =
    mongoose.models.food ||
    mongoose.model(
        "food",
        foodSchema
    );

app.post(
    "/api/food/add",
    async (req, res) => {

        try {

            const food =
                new foodModel({
                    name:
                        req.body.name,

                    description:
                        req.body.description,

                    price:
                        req.body.price,

                    category:
                        req.body.category,

                    image:
                        req.body.image ||
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"
                });

            await food.save();

            res.json({
                success: true,
                message:
                    "Food Item Added Successfully"
            });

        } catch (error) {

            console.error(error);

            res.json({
                success: false,
                message:
                    "Error adding food item"
            });
        }
    }
);

app.get(
    "/api/food/list",
    async (req, res) => {

        try {

            const foods =
                await foodModel.find({});

            res.json({
                success: true,
                data: foods
            });

        } catch (error) {

            console.error(error);

            res.json({
                success: false,
                message:
                    "Error fetching food list"
            });
        }
    }
);

app.get("/", (req, res) => {

    res.send(
        "API Working smoothly"
    );
});

app.listen(
    port,
    "0.0.0.0",
    () => {

        console.log(
            "======================================"
        );

        console.log(
            `🚀 Backend Running On Port ${port}`
        );

        console.log(
            `🌐 http://localhost:${port}`
        );

        console.log(
            "======================================"
        );
    }
);