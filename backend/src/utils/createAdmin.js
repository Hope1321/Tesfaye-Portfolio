import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import connectDB from "../config/db.js";

const createAdmin = async () => {
  await connectDB();

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.create({
    email: "admin@portfolio.com",
    password: hashedPassword,
  });

  console.log("✅ Admin user created");
  process.exit();
};

createAdmin();
