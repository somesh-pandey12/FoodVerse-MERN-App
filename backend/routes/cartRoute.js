import express from "express";

import {
    addToCart,
    removeFromCart,
    getCart
} from "../controllers/cartController.js";

import authMiddleware
    from "../middleware/auth.js";

// 🛒 Create Router
const cartRouter =
    express.Router();

// ➕ Add Item
cartRouter.post(
    "/add",
    authMiddleware,
    addToCart
);

// ➖ Remove Item
cartRouter.post(
    "/remove",
    authMiddleware,
    removeFromCart
);

// 📦 Get Cart Data
cartRouter.get(
    "/get",
    authMiddleware,
    getCart
);

export default cartRouter;