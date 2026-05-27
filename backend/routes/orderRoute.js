// File Location: backend/routes/orderRoute.js

import express from "express";

import authMiddleware
    from "../middleware/auth.js";

import {
    placeOrder,
    verifyOrder,
    userOrders,
    listOrders,
    updateStatus
} from "../controllers/orderController.js";

const orderRouter =
    express.Router();

// Protected Order Routes
orderRouter.post(
    "/place",
    authMiddleware,
    placeOrder
);

// 🛡️ Protected User Orders Route
orderRouter.post(
    "/userorders",
    authMiddleware,
    userOrders
);

// Public Verification Route
orderRouter.post(
    "/verify",
    verifyOrder
);

// Admin Routes
orderRouter.get(
    "/list",
    listOrders
);

orderRouter.post(
    "/status",
    updateStatus
);

export default orderRouter;