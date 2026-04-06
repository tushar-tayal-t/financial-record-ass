import express from "express";
import { validateLoginUser, validateRegisterUser } from "./auth.validation.js";
import { 
  getUserController, 
  loginController, 
  registerController 
} from "./auth.controller.js";
import { isAuth } from "../../middleware/isAuth.js";

const router = express.Router();

router.post("/register", validateRegisterUser, registerController);
router.post("/login", validateLoginUser, loginController);
router.get("/me", isAuth, getUserController);

export default router;