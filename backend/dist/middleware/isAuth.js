import jwt, {} from "jsonwebtoken";
import { config } from "../config/env.js";
import { User } from "../modules/auth/auth.model.js";
export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                success: false,
                message: "Please login - No auth header"
            });
            return;
        }
        const token = authHeader.split(" ")[1] || "";
        const decodedValue = jwt.verify(token, config.JWT_SECRET);
        if (!decodedValue || !decodedValue.id) {
            res.status(401).json({
                success: false,
                message: "Invalid token",
            });
            return;
        }
        const user = await User.findById(decodedValue.id);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: "Please login -JWT error",
        });
    }
};
