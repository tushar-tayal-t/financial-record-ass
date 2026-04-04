import express from "express";
import { validateCreateTransaction } from "./transaction.validation.js";
import { createTransactionController, getAllUserTransController, updateUserTransController } from "./transaction.controller.js";
import { isAuth } from "../../middleware/isAuth.js";

const router = express.Router();

router.post("/", validateCreateTransaction, isAuth, createTransactionController);
router.get("/", isAuth, getAllUserTransController);
router.put("/:id", isAuth, updateUserTransController);

export default router;