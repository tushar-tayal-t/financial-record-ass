import express from "express";
import { isAuth } from "../../middleware/isAuth.js";
import { authorizeRoles } from "../../middleware/roleAuth.js";
import { 
  deleteUserController,
  getAllUserController,
  getUserController,
  updateUserRoleController
} from "./user.controller.js";
import { validateRoleUpdate } from "./user.validation.js";

const router = express.Router();

router.get("/all-users", isAuth, authorizeRoles("ADMIN"), getAllUserController);
router.get("/:id", isAuth, authorizeRoles("ADMIN"), getUserController);

router.put(
  "/update-role", 
  validateRoleUpdate, 
  isAuth, 
  authorizeRoles("ADMIN"), 
  updateUserRoleController
);

router.delete("/delete/:id", isAuth, authorizeRoles("ADMIN"), deleteUserController);

export default router;