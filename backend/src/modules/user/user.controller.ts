import { TryCatch } from "../../utils/tryCatch.js";
import { ApiError } from "../../utils/apiError.js";
import { deleteUserService, getAllUserService, getUserService, updateUserRoleService } from "./user.services.js";

export const getAllUserController = TryCatch(async(req, res) => {
  const data = await getAllUserService(req.query);
  return res.status(200).json({
    success: true,
    message: "Fetched all users successfully",
    users: data.users,
    limit: data.Limit,
    page: data.Page
  });
});

export const getUserController = TryCatch(async(req, res) => {
  const {id} = req.params;
  if (!id) {
    throw new ApiError(400, "Bad request");
  }

  const user = await getUserService(id.toString());
  return res.status(200).json({
    success: true,
    message: "User fetched successfully",
    user
  })
});

export const updateUserRoleController = TryCatch(async(req, res) => {
  const {id, role} = req.body;

  const user = await updateUserRoleService(id, role);

  return res.status(200).json({
    success: true,
    message: "User role updated successfully",
    user
  })
});

export const deleteUserController = TryCatch(async(req, res) => {
  const {id} = req.params;

  if (!id) {
    throw new ApiError(400, "Bad request");
  }
  const user = await deleteUserService(id.toString());

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
    user
  })
});

