// File Location: backend/routes/foodRoute.js

import express from "express";

import {
    addFood,
    listFood,
    removeFood
} from "../controllers/foodController.js";

import multer from "multer";

import authMiddleware
    from "../middleware/auth.js";

import adminMiddleware
    from "../middleware/adminMiddleware.js";

const foodRouter =
    express.Router();

// Multer Storage Configuration
const storage =
    multer.diskStorage({

    destination:
        "uploads",

    filename:
        (
            req,
            file,
            cb
        ) => {

        return cb(
            null,
            `${Date.now()}_${file.originalname}`
        );
    }
});

const upload =
    multer({
        storage: storage
    });

// Public Route
foodRouter.get(
    "/list",
    listFood
);

// Protected Admin Routes
foodRouter.post(
    "/add",
    authMiddleware,
    adminMiddleware,
    upload.single("image"),
    addFood
);

foodRouter.post(
    "/remove",
    authMiddleware,
    adminMiddleware,
    removeFood
);

export default foodRouter;