// authMiddleware.js
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Please login again." });
    }
    try {
        const token_decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.body.userId = token_decode.userId; // Changed to 'userId' from 'id'
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

export default authMiddleware;


