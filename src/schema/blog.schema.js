import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  tag: z.string().min(1, "Tag is required"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  featureImage: z.string("Valid image URL required"),
});
