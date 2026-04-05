import { Types } from "mongoose";
import { ApiError } from "../../utils/apiError.js";
import { User } from "../auth/auth.model.js";
import { Transaction } from "../transaction/transaction.model.js";

export const getAllUserService = async(
  {
    limit = 10, 
    page = 1
  }: {limit?: any, page?: any}
) => {
  try {
    const Limit = Number(limit);
    const Page = Number(page);
    const skip = (Page - 1) * Limit;
    const users = await User.find().sort({createdAt: -1}).skip(skip).limit(Limit);
    return {users, Limit, Page};
  } catch(error: any) {
    throw new ApiError(error.statusCode || 500, error.message || "Failed in creating user");
  }
} 

export const getUserService = async(id: string) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch(error: any) {
    throw new ApiError(error.statusCode || 500, error.message || "Failed in creating user");
  }
} 

export const updateUserRoleService = async(id: string, role: "USER" | "ADMIN") => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    user.role = role;
    user.save();

    return user;
  } catch(error: any) {
    throw new ApiError(error.statusCode || 500, error.message || "Failed in creating user");
  }
} 

export const deleteUserService = async(id: string) => {
  try {
    const transaction = await Transaction.findOne({
      createdBy: new Types.ObjectId(id)
    });

    let deletedUser;
    if (transaction) {
      deletedUser = await User.findById(id);
      if (deletedUser && deletedUser.isActive) {
        deletedUser.isActive = false;
        await deletedUser.save();
      } else {
        throw new ApiError(404, "User not found");
      }
    } else {
      deletedUser = await User.findByIdAndDelete(id);
    }

    return deletedUser;
  } catch(error: any) {
    throw new ApiError(error.statusCode || 500, error.message || "Failed in creating user");
  }
}