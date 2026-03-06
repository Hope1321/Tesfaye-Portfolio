import express from "express";
import { sendMessage, getMessages, deleteMessage } from "../controllers/contactController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", sendMessage);       // Public
router.get("/", auth, getMessages);  // Admin only
router.delete("/:id", auth, deleteMessage);  // Admin only

export default router;
