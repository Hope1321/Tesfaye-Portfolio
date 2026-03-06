import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    from: {
      type: Date,
      required: true,
    },
    to: { // Optional end date for the experience
      type: Date,
    },
    description: {
      type: String,
      trim: true,
    },
    isCurrent: { // Optional flag for current job
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite errors in Next.js hot reload
export default mongoose.models.Experience || mongoose.model("Experience", experienceSchema);