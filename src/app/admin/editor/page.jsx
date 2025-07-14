"use client";

import { useForm, Controller } from "react-hook-form";
import MarkdownEditor from "../../../components/MarkdownEditor";
import { useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogPostSchema } from "../../../schema/blog.schema";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(blogPostSchema),
  });

  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/blog", data);
      if (response.status === 201) {
        router.push("/admin/dashboard");
      } else {
        setError(response.data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error saving blog:", err);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const uploadResponse = await axios.post("/api/uploadimage", formData);

      const imageUrl = uploadResponse.data.imageUrl;
      setUploadedImageUrl(imageUrl);
      setValue("featureImage", imageUrl, { shouldValidate: true });
    } catch (err) {
      alert("Image upload failed. Please try again.");
      setUploadedImageUrl("");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mx-auto mt-20 max-w-3xl px-4 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-persian-green-800 dark:text-persian-green-200">
        Create New Blog
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-persian-green-700 dark:text-persian-green-200 mb-1">
            Title
          </label>
          <input
            type="text"
            {...register("title")}
            className="w-full rounded-xl border border-persian-green-300 bg-white p-3 text-sm text-gray-800 shadow-sm focus:border-persian-green-500 focus:ring-1 focus:ring-persian-green-400 dark:border-persian-green-800 dark:bg-persian-green-950 dark:text-persian-green-100 dark:focus:ring-persian-green-600"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-persian-green-700 dark:text-persian-green-200 mb-1">
            Category
          </label>
          <select
            {...register("category")}
            className="w-full rounded-xl border border-persian-green-300 bg-white p-3 text-sm shadow-sm dark:border-persian-green-800 dark:bg-persian-green-950 dark:text-persian-green-100"
          >
            <option value="">Select Category</option>
            <option value="user">User</option>
            <option value="name">Name</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Tag */}
        <div>
          <label className="block text-sm font-semibold text-persian-green-700 dark:text-persian-green-200 mb-1">
            Tag
          </label>
          <input
            type="text"
            {...register("tag")}
            className="w-full rounded-xl border border-persian-green-300 bg-white p-3 text-sm text-gray-800 shadow-sm focus:border-persian-green-500 focus:ring-1 focus:ring-persian-green-400 dark:border-persian-green-800 dark:bg-persian-green-950 dark:text-persian-green-100 dark:focus:ring-persian-green-600"
          />
          {errors.tag && (
            <p className="mt-1 text-sm text-red-500">{errors.tag.message}</p>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-semibold text-persian-green-700 dark:text-persian-green-200 mb-1">
            Content
          </label>
          <Controller
            name="content"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <MarkdownEditor value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-500">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* Feature Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-persian-green-700 dark:text-persian-green-200 mb-1">
            Feature Image
          </label>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />

          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 rounded-lg bg-persian-green-100 px-5 py-2 text-sm font-medium text-persian-green-900 transition hover:bg-persian-green-200 disabled:opacity-60 dark:bg-persian-green-800 dark:text-persian-green-100 dark:hover:bg-persian-green-700"
          >
            {isUploading ? (
              <>
                <FaSpinner className="h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Image"
            )}
          </motion.button>

          {errors.featureImage && (
            <p className="mt-1 text-sm text-red-500">
              {errors.featureImage.message}
            </p>
          )}

          {uploadedImageUrl && (
            <motion.img
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              src={uploadedImageUrl}
              alt="Uploaded Preview"
              className="mt-4 h-40 w-auto rounded-lg border border-persian-green-200 object-cover shadow-md dark:border-persian-green-800"
            />
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          className="w-full rounded-xl bg-persian-green-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-persian-green-700"
        >
          {isSubmitting ? "Submitting..." : "Submit Blog"}
        </motion.button>

        {error && (
          <p className="mt-4 text-center text-sm text-red-600">{error}</p>
        )}
      </form>
    </div>
  );
}
