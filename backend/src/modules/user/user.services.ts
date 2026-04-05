import { Types } from "mongoose";
import { ApiError } from "../../utils/apiError.js";
import { User } from "../auth/auth.model.js";
import { Transaction } from "../transaction/transaction.model.js";

export const getAllUserService = async() => {
  try {
    const users = await User.find();
    return users;
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