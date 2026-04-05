import { Types } from "mongoose";
import { ApiError } from "../../utils/apiError.js";
import { User } from "../auth/auth.model.js";

type registerServiceProps = {
  name: string;
  email: string;
  password: string;
}

export const getAllUserService = async() => {
  try {
    const users = await User.find();
    return users;
  } catch(error: any) {
    console.error("Transaction aborted:\n", error);
    throw new ApiError(error.statusCode || 500, error.message || "Failed in creating user");
  }
} 

export const getUserService = async(id: string) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch(error: any) {
    console.error("Transaction aborted:\n", error);
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
    console.error("Transaction aborted:\n", error);
    throw new ApiError(error.statusCode || 500, error.message || "Failed in creating user");
  }
} 

export const deleteUserService = async(id: string) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    return deletedUser;
  } catch(error: any) {
    console.error("Transaction aborted:\n", error);
    throw new ApiError(error.statusCode || 500, error.message || "Failed in creating user");
  }
}