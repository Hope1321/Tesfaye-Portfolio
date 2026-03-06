import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite errors in Next.js hot reload
export default mongoose.models.Skill || mongoose.model("Skill", skillSchema);