import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  tags: z.array(z.string().min(1, "Each tag must be a non-empty string")).min(1, "At least one tag is required"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  featureImage: z.string()
});
