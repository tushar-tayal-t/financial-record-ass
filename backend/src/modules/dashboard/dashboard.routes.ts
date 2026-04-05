import express from "express";
import { 
  getCategorySummaryController,
  getMonthlySummaryController,
  getRecentTransController,
  getTransSummaryController
} from "./dashboard.controller.js";
import { isAuth } from "../../middleware/isAuth.js";

const router = express.Router();

router.get(
  "/summary", 
  isAuth, 
  getTransSummaryController
);

router.get(
  "/categories", 
  isAuth, 
  getCategorySummaryController
);

router.get(
  "/monthly", 
  isAuth, 
  getMonthlySummaryController
);

router.get(
  "/recent-transaction", 
  isAuth, 
  getRecentTransController
);

export default router;