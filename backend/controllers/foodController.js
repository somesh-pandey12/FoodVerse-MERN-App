import foodModel from "../models/foodModel.js";
import fs from "fs";

// 1. Add Food Item
const addFood = async (req, res) => {

    // Image validation
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Image upload karna zaroori hai"
        });
    }

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {

        await food.save();

        res.json({
            success: true,
            message: "Food Item Added Successfully!"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Error adding food item"
        });
    }
};

// 2. List All Food Items
const listFood = async (req, res) => {

    try {

        const foods = await foodModel.find({});

        res.json({
            success: true,
            data: foods
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Error fetching food list"
        });
    }
};

// 3. Remove Food Item
const removeFood = async (req, res) => {

    try {

        const food = await foodModel.findById(req.body.id);

        // Check if food exists
        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food item not found"
            });
        }

        // Delete image from uploads folder
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.log("Image delete error:", err);
            }
        });

        // Delete food item from DB
        await foodModel.findByIdAndDelete(req.body.id);

        res.json({
            success: true,
            message: "Food Item Removed Successfully!"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Error removing food item"
        });
    }
};

export {
    addFood,
    listFood,
    removeFood
};