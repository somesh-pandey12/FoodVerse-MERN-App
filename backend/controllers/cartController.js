// File Location: backend/controllers/cartController.js

import userModel from "../models/userModel.js";

// 🛒 Add Items To Cart
const addToCart = async (
    req,
    res
) => {

    try {

        const {
            userId,
            itemId
        } = req.body;

        // ✅ Validate itemId
        if (!itemId) {

            return res.status(400).json({
                success: false,
                message:
                    "Missing required itemId parameter."
            });
        }

        // ✅ Find User
        let userData =
            await userModel.findById(
                userId
            );

        if (!userData) {

            return res.status(404).json({
                success: false,
                message:
                    "User account not found."
            });
        }

        // ✅ Load Cart Data
        let cartData =
            userData.cartData || {};

        // ✅ Add Item
        if (
            !cartData[itemId]
        ) {

            cartData[itemId] = 1;

        } else {

            cartData[itemId] += 1;
        }

        // ✅ Save Updated Cart
        await userModel.findByIdAndUpdate(
            userId,
            { cartData }
        );

        res.status(200).json({
            success: true,
            message:
                "Added To Cart"
        });

    } catch (error) {

        console.log(
            "❌ AddToCart Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Error adding to cart"
        });
    }
};

// ❌ Remove Items From Cart
const removeFromCart = async (
    req,
    res
) => {

    try {

        const {
            userId,
            itemId
        } = req.body;

        // ✅ Validate itemId
        if (!itemId) {

            return res.status(400).json({
                success: false,
                message:
                    "Missing required itemId parameter."
            });
        }

        // ✅ Find User
        let userData =
            await userModel.findById(
                userId
            );

        if (!userData) {

            return res.status(404).json({
                success: false,
                message:
                    "User account not found."
            });
        }

        // ✅ Load Cart
        let cartData =
            userData.cartData || {};

        // ✅ Remove Item
        if (
            cartData[itemId] &&
            cartData[itemId] > 0
        ) {

            cartData[itemId] -= 1;

            // Remove key if quantity becomes 0
            if (
                cartData[itemId] === 0
            ) {

                delete cartData[itemId];
            }
        }

        // ✅ Save Updated Cart
        await userModel.findByIdAndUpdate(
            userId,
            { cartData }
        );

        res.status(200).json({
            success: true,
            message:
                "Removed From Cart"
        });

    } catch (error) {

        console.log(
            "❌ RemoveFromCart Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Error removing from cart"
        });
    }
};

// 📦 Get User Cart
const getCart = async (
    req,
    res
) => {

    try {

        const {
            userId
        } = req.body;

        // ✅ Find User
        let userData =
            await userModel.findById(
                userId
            );

        if (!userData) {

            return res.status(404).json({
                success: false,
                message:
                    "User account not found."
            });
        }

        // ✅ Fetch Cart
        let cartData =
            userData.cartData || {};

        res.status(200).json({
            success: true,
            cartData
        });

    } catch (error) {

        console.log(
            "❌ GetCart Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Error fetching cart"
        });
    }
};

export {
    addToCart,
    removeFromCart,
    getCart
};