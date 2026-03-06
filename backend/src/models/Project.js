import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    technologies: {
      type: [String], // Array of tech used
      default: [],
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },
    link: {
      type: String, // URL to project
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/.test(v);
        },
        message: props => `${props.value} is not a valid URL!`
      }
    },
    image: {
      type: String, // image filename or URL
      trim: true,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite errors in Next.js hot reload
export default mongoose.models.Project || mongoose.model("Project", projectSchema);