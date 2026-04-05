import mongoose, { Schema, Document, Types } from "mongoose";
const userSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["INCOME", "EXPENSE"],
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    note: {
        type: String,
    },
    createdBy: {
        type: Types.ObjectId,
        required: true
    }
}, { timestamps: true });
export const Transaction = mongoose.model("transaction", userSchema);
