// File Location: backend/middleware/adminMiddleware.js
import userModel from "../models/userModel.js";

const adminMiddleware = async (req, res, next) => {
    try {
        // req.body.userId is reliably passed down here by the preceding authMiddleware
        const user = await userModel.findById(req.body.userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User account verification failed." });
        }

        // Check if the role property matches our explicit admin level string
        if (user.role !== "admin") {
            return res.status(403).json({ 
                success: false, 
                message: "Access Denied: Forbidden. Administrative privileges required." 
            });
        }

        // If verified, proceed to the target controller cleanly
        next();

    } catch (error) {
        console.error("❌ Admin Middleware Security Intercept Error:", error.message);
        return res.status(500).json({ success: false, message: "Internal server validation security error." });
    }
};

export default adminMiddleware;