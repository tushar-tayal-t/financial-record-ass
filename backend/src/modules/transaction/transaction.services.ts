import mongoose, { Types } from "mongoose";
import { ApiError } from "../../utils/apiError.js";
import { Transaction } from "./transaction.model.js";
import { User } from "../auth/auth.model.js";

type createTranServiceProps = {
  amount: string | number;
  type: "INCOME" | "EXPENSE";
  category: string;
  note?: string;
  userId: Types.ObjectId;
}

export const createTranService = async({amount, type, category, note, userId}: createTranServiceProps) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newTransaction = new Transaction({
      amount,
      type,
      category,
      note,
      createdBy: userId
    });
     
    await newTransaction.save({session});
    await session.commitTransaction();
    session.endSession();

    return newTransaction;
  } catch(error: any) {
    await session.abortTransaction();
    session.endSession();
    console.error("Transaction aborted:\n", error);
    throw new ApiError(error.statusCode || 500, error.message || "Failed in creating user");
  }
} 

export const fetchAllTranService = async(userId: Types.ObjectId) => {
  try {
    const allTransaction = await Transaction.find({
      createdBy: userId
    });

    return allTransaction;
  } catch(error: any) {
    console.error("Transaction aborted:\n", error);
    throw new ApiError(error.statusCode || 500, error.message || "Failed in creating user");
  }
} 