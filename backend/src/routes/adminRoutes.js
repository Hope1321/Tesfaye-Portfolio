import express from "express";
import { getDashboardSummary, getRecentActivities } from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/summary", auth, getDashboardSummary);
router.get("/activities", auth, getRecentActivities);

export default router;
