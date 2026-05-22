import userModel from "../models/userModel.js";

// ================= ADD TO CART =================
const addToCart = async (req, res) => {
    try {
        // Find user
        let userData = await userModel.findById(req.body.userId);

        // Get cart data or initialize empty object
        let cartData = userData.cartData || {};

        // Add item
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        // Update cart in DB
        await userModel.findByIdAndUpdate(req.body.userId, {
            cartData,
        });

        res.json({
            success: true,
            message: "Added To Cart",
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: "Error adding to cart",
        });
    }
};

// ================= REMOVE FROM CART =================
const removeFromCart = async (req, res) => {
    try {
        // Find user
        let userData = await userModel.findById(req.body.userId);

        // Get cart data
        let cartData = userData.cartData || {};

        // Remove item quantity
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        // Update DB
        await userModel.findByIdAndUpdate(req.body.userId, {
            cartData,
        });

        res.json({
            success: true,
            message: "Removed From Cart",
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: "Error removing from cart",
        });
    }
};

// ================= GET CART =================
const getCart = async (req, res) => {
    try {
        // Find user
        let userData = await userModel.findById(req.body.userId);

        // Get cart data
        let cartData = userData.cartData || {};

        res.json({
            success: true,
            cartData,
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: "Error fetching cart",
        });
    }
};

export {
    addToCart,
    removeFromCart,
    getCart,
};