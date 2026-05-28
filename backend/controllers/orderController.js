// File Location: backend/controllers/orderController.js
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// 🛒 1. Placing User Order and Redirecting to Stripe checkout
const placeOrder = async (req, res) => {
    const frontend_url = "http://127.0.0.1:5173"; // Aapka frontend port node
    
    try {
        // ✨ SAFE INITIALIZATION: Function ke andar initialize karne se key humesha milegi
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        // Create baseline record entry in MongoDB
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        
        // Cart clean operation baseline preparation
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Stripe format line items map layout mapping conversion
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 // Amount in paise
            },
            quantity: item.quantity
        }));

        // Adding fixed delivery charges allocation
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 40 * 100 
            },
            quantity: 1
        });

        // Generate the Stripe Hosted Checkout Redirect Session Links
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log("❌ Stripe Checkout Initialization Failed: ", error);
        res.status(500).json({ success: false, message: "Stripe Checkout session generation error" });
    }
};

// ⚡ 2. Verify Payment Hook Callback Routing
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid Successfully" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment Cancelled/Aborted" });
        }
    } catch (error) {
        console.log("❌ Payment verification sync module failed: ", error);
        res.status(500).json({ success: false, message: "Verification processing error" });
    }
};

// 👤 3. User Orders Fetching Endpoint for Frontend Dashboard
const userOrders = async (req, res) => {
    try {
        // Auth middleware se req.body.userId automatically mil jayegi
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("❌ Failed to fetch user orders: ", error);
        res.status(500).json({ success: false, message: "Error retrieving orders history" });
    }
};

export { placeOrder, verifyOrder, userOrders };