import mongoose, { Types } from "mongoose";
import { ApiError } from "../../utils/apiError.js";
import { User } from "../auth/auth.model.js";
import { Transaction } from "../transaction/transaction.model.js";
export const getUserTransSummaryService = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "Please login to get the summary");
        }
        const summary = await Transaction.aggregate([
            {
                $match: {
                    createdBy: userId
                }
            },
            {
                $group: {
                    _id: "$type",
                    totalAmount: { $sum: "$amount" }
                }
            },
            {
                $project: {
                    _id: 0,
                    type: "$_id",
                    totalAmount: 1
                }
            }
        ]);
        const totalIncome = summary.find(item => item.type === "INCOME")?.totalAmount || 0;
        const totalExpense = summary.find(item => item.type === "EXPENSE")?.totalAmount || 0;
        const netBalance = totalIncome - totalExpense;
        return { totalIncome, totalExpense, netBalance };
    }
    catch (error) {
        console.error("Transaction aborted:\n", error);
        throw new ApiError(error.statusCode || 500, error.message || "Failed in creating user");
    }
};
export const getCategoryTotalService = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "Please login to get the summary");
        }
        const summary = await Transaction.aggregate([
            {
                $match: {
                    createdBy: userId
                }
            },
            {
                $group: {
                    _id: "$category",
                    totalAmount: { $sum: "$amount" }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    totalAmount: 1
                }
            }
        ]);
        const summaryData = {};
        summary.forEach((item) => {
            summaryData[item.category] = item.totalAmount;
        });
        return summaryData;
    }
    catch (error) {
        console.error("Transaction aborted:\n", error);
        throw new ApiError(error.statusCode || 500, error.message || "Failed in creating user");
    }
};
export const getMonthlyTotalService = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "Please login to get the summary");
        }
        const summary = await Transaction.aggregate([
            {
                $match: {
                    createdBy: userId
                }
            },
            {
                $addFields: {
                    month: { $month: "$createdAt" },
                    year: { $year: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: {
                        month: "$month",
                        year: "$year",
                        type: "$type"
                    },
                    totalAmount: { $sum: "$amount" }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    year: "$_id.year",
                    type: "$id.type",
                    totalAmount: 1
                }
            },
            {
                $group: {
                    _id: {
                        month: "$month",
                        year: "$year"
                    },
                    income: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "INCOME"] }, "$totalAmount", 0]
                        }
                    },
                    expense: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "EXPENSE"] }, "$totalAmount", 0]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: {
                        $switch: {
                            $branches: [
                                { case: { $eq: ["$_id.month", 1] }, then: "January" },
                                { case: { $eq: ["$_id.month", 2] }, then: "February" },
                                { case: { $eq: ["$_id.month", 3] }, then: "March" },
                                { case: { $eq: ["$_id.month", 4] }, then: "April" },
                                { case: { $eq: ["$_id.month", 5] }, then: "May" },
                                { case: { $eq: ["$_id.month", 6] }, then: "June" },
                                { case: { $eq: ["$_id.month", 7] }, then: "July" },
                                { case: { $eq: ["$_id.month", 8] }, then: "August" },
                                { case: { $eq: ["$_id.month", 9] }, then: "September" },
                                { case: { $eq: ["$_id.month", 10] }, then: "October" },
                                { case: { $eq: ["$_id.month", 11] }, then: "November" },
                                { case: { $eq: ["$_id.month", 12] }, then: "December" }
                            ],
                            default: "Unknown"
                        }
                    },
                    year: "$_id.year",
                    income: 1,
                    expense: 1
                }
            }
        ]);
        return summary;
    }
    catch (error) {
        console.error("Transaction aborted:\n", error);
        throw new ApiError(error.statusCode || 500, error.message || "Failed in creating user");
    }
};
export const getRecentTransService = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "Please login to get the summary");
        }
        const recentTrans = await Transaction.find({
            createdBy: userId
        }).sort({ createdBy: -1 }).limit(10);
        return recentTrans;
    }
    catch (error) {
        console.error("Transaction aborted:\n", error);
        throw new ApiError(error.statusCode || 500, error.message || "Failed in creating user");
    }
};
