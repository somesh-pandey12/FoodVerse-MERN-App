// File Location: backend/controllers/orderController.js

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY
);

const placeOrder = async (
    req,
    res
) => {

    try {

        const {
            userId,
            items,
            amount,
            address
        } = req.body;

        const frontend_url =
            process.env.CLIENT_URL ||
            "http://localhost:5173";

        if (
            !items ||
            items.length === 0
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Cart is empty"
            });
        }

        const newOrder =
            new orderModel({
                userId,
                items,
                amount,
                address,
                payment: false,
                status:
                    "Food Processing"
            });

        await newOrder.save();

        await userModel.findByIdAndUpdate(
            userId,
            {
                cartData: {}
            }
        );

        const line_items =
            items.map((item) => ({
                price_data: {
                    currency: "inr",

                    product_data: {
                        name:
                            item.name
                    },

                    unit_amount:
                        item.price * 100
                },

                quantity:
                    item.quantity
            }));

        line_items.push({
            price_data: {
                currency: "inr",

                product_data: {
                    name:
                        "Delivery Charges"
                },

                unit_amount:
                    40 * 100
            },

            quantity: 1
        });

        const session =
            await stripe.checkout.sessions.create({
                line_items,

                mode: "payment",

                success_url:
                    `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,

                cancel_url:
                    `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
            });

        res.status(200).json({
            success: true,
            session_url:
                session.url,

            orderId:
                newOrder._id
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message:
                "Error placing order"
        });
    }
};

const verifyOrder = async (
    req,
    res
) => {

    const {
        orderId,
        success
    } = req.body;

    try {

        if (
            !orderId ||
            !success
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Missing credentials"
            });
        }

        if (
            success === "true"
        ) {

            await orderModel.findByIdAndUpdate(
                orderId,
                {
                    payment: true
                }
            );

            res.json({
                success: true,
                message:
                    "Payment Successful"
            });

        } else {

            await orderModel.findByIdAndDelete(
                orderId
            );

            res.json({
                success: false,
                message:
                    "Payment Failed"
            });
        }

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message:
                "Verification Error"
        });
    }
};

// User Orders
const userOrders = async (
    req,
    res
) => {

    try {

        const orders =
            await orderModel.find({
                userId:
                    req.body.userId
            }).sort({
                createdAt: -1
            });

        res.status(200).json({
            success: true,
            data: orders
        });

    } catch (error) {

        console.error(
            "❌ User Orders Fetch Error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message:
                "Internal server error retrieving order history."
        });
    }
};

const listOrders = async (
    req,
    res
) => {

    try {

        const orders =
            await orderModel.find({});

        res.json({
            success: true,
            data: orders
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message:
                "Error fetching orders"
        });
    }
};

const updateStatus = async (
    req,
    res
) => {

    try {

        await orderModel.findByIdAndUpdate(
            req.body.orderId,
            {
                status:
                    req.body.status
            }
        );

        res.json({
            success: true,
            message:
                "Status Updated"
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message:
                "Error updating status"
        });
    }
};

export {
    placeOrder,
    verifyOrder,
    userOrders,
    listOrders,
    updateStatus
};