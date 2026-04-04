import express from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import tranRoutes from "../modules/transaction/transaction.routes.js";

const router = express.Router();

router.use("/api/auth", authRoutes);
router.use("/api/transations", tranRoutes);

export default router;