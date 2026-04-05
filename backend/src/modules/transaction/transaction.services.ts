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

type updateTranServiceProps = {
  amount?: string | number;
  type?: "INCOME" | "EXPENSE";
  category?: string;
  note?: string;
  createdAt?: Date | string;
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
    throw new ApiError(error.statusCode || 500, error.message || "Failed in creating user");
  }
} 

export const updateTransService = async(
  id: string, 
  userId: Types.ObjectId, 
  {amount, type, category, createdAt, note}: updateTranServiceProps
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const transaction = await Transaction.findOne({
      _id: id,
      createdBy: userId
    });
    if (!transaction) {
      throw new ApiError(404, "Transaction not found");
    }

    if (amount) {
      transaction.amount = Number(amount);
    }
    if (type) {
      transaction.type = type;
    }
    if (category) {
      transaction.category = category;
    }
    if (createdAt) {
      const parsedDate = new Date(createdAt);

      if (isNaN(parsedDate.getTime())) {
        throw new ApiError(400, "Bad request");
      }

      transaction.createdAt = parsedDate;
    }
    if (note) {
      transaction.note = note;
    }
    transaction.save({session});

    session.commitTransaction();
    session.endSession();

    return transaction;
  } catch(error: any) {
    session.abortTransaction();
    session.endSession();
    throw new ApiError(error.statusCode || 500, error.message || "Failed in creating user");
  }
}

export const getTransService = async(
  id: string, 
  userId: Types.ObjectId, 
) => {
  try {
    const transaction = await Transaction.findOne({
      _id: id,
      createdBy: userId
    });
    if (!transaction) {
      throw new ApiError(404, "Transaction not found");
    }
    return transaction;
  } catch(error: any) {
    throw new ApiError(error.statusCode || 500, error.message || "Failed in creating user");
  }
}

export const deleteTransService = async(
  id: string, 
  userId: Types.ObjectId, 
) => {
  try {
    const deleted = await Transaction.findOneAndDelete({
      _id: id,
      createdBy: userId
    });

    if (!deleted) {
      throw new ApiError(404, "Transaction not found");
    }
    
    return deleted;
  } catch(error: any) {
    throw new ApiError(error.statusCode || 500, error.message || "Failed in creating user");
  }
}