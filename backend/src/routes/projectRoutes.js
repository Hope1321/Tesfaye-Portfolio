import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProjects);        // Public
router.post("/", auth, createProject);  // Admin only
router.put("/:id", auth, updateProject); // Admin only
router.delete("/:id", auth, deleteProject); // Admin only

export default router;
