import { ApiError } from "../../utils/apiError.js";
import { TryCatch } from "../../utils/tryCatch.js";
import { getCategoryTotalService, getMonthlyTotalService, getRecentTransService, getUserTransSummaryService } from "./dashboard.services.js";
export const getTransSummaryController = TryCatch(async (req, res) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(400, "Please login to create transaction");
    }
    const summary = await getUserTransSummaryService(userId);
    return res.json({
        success: true,
        message: "Successfully created transaction",
        summary
    });
});
export const getCategorySummaryController = TryCatch(async (req, res) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(400, "Please login to create transaction");
    }
    const summary = await getCategoryTotalService(userId);
    return res.json({
        success: true,
        message: "Successfully fetched category transaction",
        summary
    });
});
export const getMonthlySummaryController = TryCatch(async (req, res) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(400, "Please login to create transaction");
    }
    const summary = await getMonthlyTotalService(userId);
    return res.json({
        success: true,
        message: "Successfully fetched monthly transaction",
        summary
    });
});
export const getRecentTransController = TryCatch(async (req, res) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(400, "Please login to create transaction");
    }
    const transactions = await getRecentTransService(userId);
    return res.json({
        success: true,
        message: "Successfully fetched recent transaction",
        transactions
    });
});
