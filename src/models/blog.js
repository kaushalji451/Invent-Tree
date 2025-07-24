import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
    },
    slug: { type: String, required: true, unique: true },
    content: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
    },
    category: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
    },
    tags: [{ type: String }],
    author: { type: String, default: "admin" },
    image: { type: String, required: true },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
