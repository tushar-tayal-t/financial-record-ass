import mongoose, { Types } from "mongoose";
import { ApiError } from "../../utils/apiError.js";
import { Transaction } from "./transaction.model.js";
import { User } from "../auth/auth.model.js";
import { redisClient } from "../../config/redis.js";

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

type fetchAllTransProps = {
  limit?: any;
  page?: any;
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

export const canCreateTransRequest = async(
  id: string  
) => {
  try {
    const redisUserRateLimitKey = `rate-limit:${id}`;

    const userRate = Number(await redisClient.get(redisUserRateLimitKey));
    if (userRate && userRate >= 5) {
      return false;
    }

    if (userRate && userRate < 5) {
      const ttl = await redisClient.ttl(redisUserRateLimitKey); 
      await redisClient.set(redisUserRateLimitKey, (userRate + 1).toString());
      if (ttl > 0) {
        await redisClient.expire(redisUserRateLimitKey, ttl);
      }
      return true;
    }

    await redisClient.setEx(redisUserRateLimitKey, 60, "1");
    return true;
  } catch(error: any) {
    throw new ApiError(
      error.statusCode || 500, 
      error.message || "Failed in validating usage limit"
    );
  }
}

export const fetchAllTranService = async(
  userId: Types.ObjectId, 
  {limit = 10, page = 1}: fetchAllTransProps
) => {
  try {
    const Limit = Number(limit);
    const Page = Number(page);
    const skip = (Page - 1) * Limit;
    const allTransaction = await Transaction.find({
      createdBy: userId
    }).sort({createdAt: -1}).skip(skip).limit(Limit);

    return {allTransaction, Limit, Page};
  } catch(error: any) {
    throw new ApiError(error.statusCode || 500, error.message || "Failed in creating user");
  }
} 

export const updateTransService = async(
  id: string, 
  {amount, type, category, createdAt, note}: updateTranServiceProps
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const transaction = await Transaction.findOne({
      _id: id
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
) => {
  try {
    const transaction = await Transaction.findOne({
      _id: id
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
) => {
  try {
    const deleted = await Transaction.findOneAndDelete({
      _id: id
    });

    if (!deleted) {
      throw new ApiError(404, "Transaction not found");
    }
    
    return deleted;
  } catch(error: any) {
    throw new ApiError(error.statusCode || 500, error.message || "Failed in creating user");
  }
}