import express from "express";
import { getAbout, upsertAbout } from "../controllers/aboutController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAbout);           // Public
router.post("/", auth, upsertAbout); // Admin only

export default router;
