import express from "express";
import { 
  validateCreateTransaction, 
  validateUpdateTransaction 
} from "./transaction.validation.js";
import { 
  createTransactionController, 
  deleteUserTransController, 
  getAllUserTransController, 
  getUserTransController, 
  updateUserTransController 
} from "./transaction.controller.js";
import { isAuth } from "../../middleware/isAuth.js";
import { authorizeRoles } from "../../middleware/roleAuth.js";

const router = express.Router();

router.post(
  "/create", 
  validateCreateTransaction, 
  isAuth, 
  createTransactionController
);

router.get("/all", isAuth, getAllUserTransController);
router.get("/:id", isAuth, getUserTransController);

router.put(
  "/update/:id", 
  validateUpdateTransaction, 
  isAuth, 
  authorizeRoles("ADMIN"), 
  updateUserTransController
);

router.delete("/delete/:id", isAuth, authorizeRoles("ADMIN"), deleteUserTransController);

export default router;