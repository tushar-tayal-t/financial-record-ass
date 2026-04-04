import { TryCatch } from "../../utils/tryCatch.js";
import { createTranService, fetchAllTranService } from "./transaction.services.js";

export const createTransactionController = TryCatch(
  async(req, res) => {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Please login to create transaction"
      })
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
      return res.status(400).json({
        success: false,
        message: "Please login to create transaction"
      })
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

