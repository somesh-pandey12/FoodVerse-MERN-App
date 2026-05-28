// File Location: backend/controllers/orderController.js
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import Razorpay from "razorpay";
import "dotenv/config";

console.log(
    "Razorpay Key Status:",
    process.env.RAZORPAY_KEY_ID ? "Loaded Successfully" : "Missing"
);

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_xxxxxxxxx",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "xxxxxxxxxxxx"
});

const placeOrder = async (req, res) => {
    const frontend_url = "http://127.0.0.1:5173";

    try {
        // 1. Save order locally in database
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: false,
            status: "Pending"
        });

        await newOrder.save();

        // 2. Clear customer's cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // 3. Build Razorpay Options Array
        const razorpayOptions = {
            amount: req.body.amount * 100, // Converts rupees to paise
            currency: "INR",
            receipt: `receipt_${newOrder._id}`
        };

        const razorpayOrder = await razorpay.orders.create(razorpayOptions);

        // 4. Stripe Integration (Optional Fallback)
        let stripeSessionUrl = null;
        if (process.env.STRIPE_SECRET_KEY) {
            try {
                const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
                const line_items = req.body.items.map((item) => ({
                    price_data: {
                        currency: "inr",
                        product_data: { name: item.name },
                        unit_amount: item.price * 100
                    },
                    quantity: item.quantity
                }));

                line_items.push({
                    price_data: {
                        currency: "inr",
                        product_data: { name: "Delivery Charges" },
                        unit_amount: 40 * 100
                    },
                    quantity: 1
                });

                const session = await stripe.checkout.sessions.create({
                    line_items,
                    mode: "payment",
                    success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
                    cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
                });

                stripeSessionUrl = session.url;
            } catch (stripeError) {
                console.log("Stripe Session Error:", stripeError.message);
            }
        }

        // 5. Consolidated API Response Engine
        res.status(200).json({
            success: true,
            orderId: newOrder._id,
            order: razorpayOrder,       // 👈 Added as 'order' fallback alias for standard frontend templates
            razorpayOrder,              // Kept for backward compatibility
            stripeSessionUrl,
            message: "Order created successfully"
        });

    } catch (error) {
        console.log("Order Placement Error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to create order"
        });
    }
};

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        if (success === "true" || success === true) {
            await orderModel.findByIdAndUpdate(orderId, {
                payment: true,
                status: "Food Processing"
            });

            return res.status(200).json({
                success: true,
                message: "Payment verified successfully"
            });
        }

        // If payment fails, remove the pending order record safely
        await orderModel.findByIdAndDelete(orderId);
        res.status(400).json({
            success: false,
            message: "Payment failed or cancelled"
        });

    } catch (error) {
        console.log("Payment Verification Error:", error);
        res.status(500).json({
            success: false,
            message: "Payment verification failed"
        });
    }
};

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.log("Fetch Orders Error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to fetch orders"
        });
    }
};

export {
    placeOrder,
    verifyOrder,
    userOrders
};