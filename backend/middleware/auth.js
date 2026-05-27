// File Location: backend/middleware/auth.js

import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    let token;

    // ✅ Check Token From Cookies (Primary secure entry channel)
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    // ✅ Fallback: Check Authorization Header (Useful for Admin tools or postman testing)
    else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    // ❌ No Token Found (Enforce 401 Unauthorized status code)
    if (!token || token === "none") {
        return res.status(401).json({
            success: false,
            message: "Not Authorized, Login Again!"
        });
    }

    try {
        // ✅ Verify Token
        const token_decode = jwt.verify(
            token,
            process.env.JWT_SECRET || "SUPER_SECRET_KEY_JWT_2026"
        );

        // ✅ Attach User ID to request body so downstream controllers can use it instantly
        req.body.userId = token_decode.id;

        next();

    } catch (error) {
        console.error("❌ Auth Middleware Error:", error.message);

        // ❌ Return 401 instead of 200 for expired or broken tokens
        return res.status(401).json({
            success: false,
            message: "Token is invalid or expired."
        });
    }
};

export default authMiddleware;