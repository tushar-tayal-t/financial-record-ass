import express from "express";
import { validateLoginUser, validateRegisterUser } from "./auth.validation.js";
import { loginController, registerController } from "./auth.controller.js";

const router = express.Router();

router.post("/register", validateRegisterUser, registerController);
router.post("/login", validateLoginUser, loginController);

export default router;