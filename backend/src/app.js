import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import skillRoutes from "./routes/skillRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

/* =======================
   GLOBAL MIDDLEWARE
======================= */
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://tesfaye-portfolio-three.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

/* =======================
   API ROUTES
======================= */
app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes); // ✅ FIXED

/* =======================
   BASIC ROUTE
======================= */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* =======================
   DATABASE HEALTH CHECK
======================= */
app.get("/db-check", (req, res) => {
  const state = mongoose.connection.readyState;

  let status = "DISCONNECTED";
  if (state === 1) status = "CONNECTED";
  if (state === 2) status = "CONNECTING";

  res.json({ database: status });
});

/* =======================
   404 HANDLER
======================= */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
