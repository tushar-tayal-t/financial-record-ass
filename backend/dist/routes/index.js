import express from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import tranRoutes from "../modules/transaction/transaction.routes.js";
import dashBoardRoutes from "../modules/dashboard/dashboard.routes.js";
const router = express.Router();
router.use("/api/auth", authRoutes);
router.use("/api/transations", tranRoutes);
router.use("/api/dashboard", dashBoardRoutes);
export default router;
