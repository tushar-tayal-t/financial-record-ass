import mongoose, { Schema, Document } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ["VIEWER", "ANALYST", "ADMIN"],
        default: "VIEWER"
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });
export const User = mongoose.model("user", userSchema);
