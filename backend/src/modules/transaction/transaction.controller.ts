import { ApiError } from "../../utils/apiError.js";
import { TryCatch } from "../../utils/tryCatch.js";
import { createTranService, fetchAllTranService, updateTransService } from "./transaction.services.js";

export const createTransactionController = TryCatch(
  async(req, res) => {
    const userId = req.user?._id;
    if (!userId) {
      throw new ApiError(400, "Please login to create transaction");
    }

    const newTrans = await createTranService({...req.body, userId});

    return res.json({
      success: true,
      message: "Successfully created transaction",
      transaction: newTrans
    });
  }
);

export const getAllUserTransController = TryCatch(
  async(req, res) => {
    const userId = req.user?._id;
    if (!userId) {
      throw new ApiError(400, "Please login to get transactions");
    }

    const allTransaction = await fetchAllTranService(userId);

    return res.json({
      success: true,
      message: "Successfully fetched all user transaction",
      transaction: allTransaction,
      user: {
        name: req.user?.name,
        email: req.user?.email
      }
    });
  }
);

export const updateUserTransController = TryCatch(
  async(req, res) => {
    const {id} = req.query;
    const userId = req.user?._id;
    if (!id || !userId) {
      throw new ApiError(400, "Bad request");
    }
    
    const updatedTransaction = await updateTransService(id.toString(), userId);
  }
)