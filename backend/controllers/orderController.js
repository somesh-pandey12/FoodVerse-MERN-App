import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import Razorpay from "razorpay";
import { transporter } from "../config/emailConfig.js";
import "dotenv/config";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_Sy0FMTTj4VPu1J",
    key_secret: process.env.RAZORPAY_SECRET || "1rb5u8xImrFoCFuVkfOovUPf"
});

const placeOrder = async (req, res) => {
    const frontend_url = process.env.FRONTEND_URL || "http://127.0.0.1:5173";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: false,
            status: "Food Processing"
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Email Notification
        await transporter.sendMail({
            from: '"FoodVerse" <your-email@gmail.com>',
            to: req.body.email, // Ensure email is passed in req.body
            subject: "Order Confirmed! 🍔",
            text: `Hello, your order #${newOrder._id} has been confirmed!`,
        });

        const razorpayOrder = await razorpay.orders.create({
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: `receipt_${newOrder._id}`
        });

        res.status(200).json({ success: true, orderId: newOrder._id, order: razorpayOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

// Yahan se function bahar nikal gaya hai
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        res.json({ success: false, message: "Error" });
    }
};

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true" || success === true) {
            await orderModel.findByIdAndUpdate(orderId, { payment: true, status: "Food Processing" });
            return res.json({ success: true, message: "Paid" });
        }
        await orderModel.findByIdAndDelete(orderId);
        res.json({ success: false, message: "Not Paid" });
    } catch (error) {
        res.json({ success: false, message: "Error" });
    }
};

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        res.json({ success: false, message: "Error" });
    }
};

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        res.json({ success: false, message: "Error" });
    }
};

// Sahi Export List
export { placeOrder, verifyOrder, userOrders, updateStatus, listOrders };