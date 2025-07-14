import mongoose from "mongoose";
import { string } from "zod";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true, // Markdown
    },
    image: {
      type:string,
      required:true, // Cloudinary URL or Firebase URL
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
      default: Date.now(),
    },
    language: {
      type: String, // 'en', 'hi', or 'both'
      default: "en",
    },
  },
  { timestamps: true },
);
const blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default blog;
