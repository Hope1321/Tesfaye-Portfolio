import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    description: { type: String, required: true },
    email: { 
      type: String, 
      validate: {
        validator: function(v) {
          return !v || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      }
    },
    phone: { type: String },
    location: { type: String },
    resume: { type: String } // PDF link
  },
  { timestamps: true }
);

// Ensure the model isn't recompiled if this file is imported multiple times
export default mongoose.models.About || mongoose.model("About", aboutSchema);