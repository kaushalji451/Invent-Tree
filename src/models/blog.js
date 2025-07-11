import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      hi: { type: String },
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      en: { type: String, required: true }, // Markdown
      hi: { type: String },
    },
    excerpt: {
      en: { type: String },
      hi: { type: String },
    },
    image: {
      type: String, // Cloudinary URL or Firebase URL
    },
    category: {
      type: String,
    },
    tags: [String],
    author: {
      type: String,
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    language: {
      type: String, // 'en', 'hi', or 'both'
      default: "en",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
