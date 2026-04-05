import { TryCatch } from "../../utils/tryCatch.js";
import bcrypt from "bcrypt";
import { loginService, registerService } from "./auth.services.js";
export const registerController = TryCatch(async (req, res) => {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // Register user here
    const newUser = await registerService({ ...req.body, password: hashedPassword });
    return res.status(200).json({
        success: true,
        message: "User registered successfully",
    });
});
export const loginController = TryCatch(async (req, res) => {
    const { email, password } = req.body;
    // Login user here
    const { user, token } = await loginService({ email, password });
    return res.status(200).json({
        success: true,
        message: "User login successfully",
        email: user.email,
        token
    });
});
