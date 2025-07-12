import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    hi: { type: String }
  },
  description: {
    en: { type: String, required: true },
    hi: { type: String }
  },
  image: { type: String, required: true },
  category: { type: String },
  featured: { type: Boolean, default: false }, // For homepage or highlight display
},
  { timestamps: true }
);


const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
