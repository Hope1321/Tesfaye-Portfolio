import express from "express";
import {
  sendMessage,
  getMessages,
  deleteMessage,
  markMessageRead,
} from "../controllers/contactController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", sendMessage); // Public
router.get("/", auth, getMessages); // Admin only
router.patch("/:id/read", auth, markMessageRead); // Mark as read
router.delete("/:id", auth, deleteMessage); // Admin only

export default router;
