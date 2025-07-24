import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.object({
    en: z.string().min(1, "English title is required"),
    hi: z.string().min(1, "Hindi title is required"),
  }),
  content: z.object({
    en: z.string().min(1, "English content is required"),
    hi: z.string().min(1, "Hindi content is required"),
  }),
  category: z.object({
    en: z.string().optional(),
    hi: z.string().optional(),
  }),
  image: z.string().min(1, "Feature image is required"),
  tags: z.array(z.string()).optional(),
  author: z.string().optional(),
  published: z.boolean().optional(),
  language: z.enum(["en", "hi", "both"]).optional().default("both"),
});
