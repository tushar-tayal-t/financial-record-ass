import mongoose from "mongoose";
import { User } from "./auth.model.js";
import { ApiError } from "../../utils/apiError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config/env.js";
export const registerService = async ({ name, email, password }) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ApiError(409, "User already exist");
        }
        const newUser = new User({
            name,
            email,
            password
        });
        await newUser.save({ session });
        await session.commitTransaction();
        session.endSession();
        return newUser;
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Transaction aborted:\n", error);
        throw new ApiError(error.statusCode || 500, error.message || "Failed in creating user");
    }
};
export const loginService = async ({ email, password }) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(404, "Please enter valid credentials");
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new ApiError(401, "Please enter valid credentials");
        }
        const token = jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: "15d" });
        return { user, token };
    }
    catch (error) {
        console.error("Login service failed:\n", error);
        throw new ApiError(error.statusCode || 500, error.message || "Failed in login service");
    }
};
