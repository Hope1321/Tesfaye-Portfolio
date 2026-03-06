import express from "express";
import {
  getSkills,
  createSkill,
  updateSkill,   // ✅ add this
  deleteSkill    // ✅ add this
} from "../controllers/skillController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getSkills);
router.post("/", auth, createSkill);
router.put("/:id", auth, updateSkill);
router.delete("/:id", auth, deleteSkill);

export default router;
