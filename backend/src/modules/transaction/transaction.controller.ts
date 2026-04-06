import { ApiError } from "../../utils/apiError.js";
import { TryCatch } from "../../utils/tryCatch.js";
import { 
  canCreateTransRequest, 
  createTranService, 
  deleteTransService, 
  fetchAllTranService, 
  getTransService, 
  updateTransService 
} from "./transaction.services.js";

export const createTransactionController = TryCatch(
  async(req, res) => {
    const userId = req.user?._id;
    if (!userId) {
      throw new ApiError(400, "Please login to create transaction");
    }

    const canMakeRequest = await canCreateTransRequest(userId.toString());
    if (!canMakeRequest) {
      throw new ApiError(429, "Too many request");
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
    const data = await fetchAllTranService(userId, req.query);

    return res.json({
      success: true,
      message: "Successfully fetched all user transaction",
      transaction: data.allTransaction,
      limit: data.Limit,
      page: data.Page,
      user: {
        name: req.user?.name,
        email: req.user?.email
      }
    });
  }
);

export const updateUserTransController = TryCatch(
  async(req, res) => {
    const {id} = req.params;
    if (!id) {
      throw new ApiError(400, "Bad request");
    }
    
    const updatedTransaction = await updateTransService(id.toString(), req.body);

    res.json({
      success: true,
      message: "Successfully updates the transaction",
      transaction: updatedTransaction
    })
  }
);

export const getUserTransController = TryCatch(
  async(req, res) => {
    const {id} = req.params;
    if (!id) {
      throw new ApiError(400, "Bad request");
    }
    
    const transaction = await getTransService(id.toString());

    res.json({
      success: true,
      message: "Successfully fetched the transaction",
      transaction
    })
  }
);

export const deleteUserTransController = TryCatch(
  async(req, res) => {
    const {id} = req.params;
    if (!id) {
      throw new ApiError(400, "Bad request");
    }
    
    const transaction = await deleteTransService(id.toString());

    res.json({
      success: true,
      message: "Successfully delete the transaction",
      transaction
    })
  }
);