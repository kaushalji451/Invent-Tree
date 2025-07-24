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
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useTranslations } from "next-intl";

export default function CreateBlogPage() {
  const t = useTranslations("BlogPost");

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
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      // Ensure tags are up to date in form data
      setValue("tags", tags, { shouldValidate: true });

      // Send data matching mongoose schema shape
      const response = await axios.post("/api/blog", data);
      if (response.status === 201) {
        router.push("/admin/dashboard");
      } else {
        alert(response.data.message || "Something went wrong.");
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
      setValue("image", imageUrl, { shouldValidate: true }); // note `image` key to match schema
    } catch {
      alert("Image upload failed. Please try again.");
      setUploadedImageUrl("");
    } finally {
      setIsUploading(false);
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = tagInput.trim();

      if (trimmed && !tags.includes(trimmed)) {
        const updated = [...tags, trimmed];
        setTags(updated);
        setValue("tags", updated, { shouldValidate: true });
      }

      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    const updated = tags.filter((t) => t !== tagToRemove);
    setTags(updated);
    setValue("tags", updated, { shouldValidate: true });
  };

  return (
    <Popup
      trigger={
        <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-colors duration-300">
          {t("create")}
        </button>
      }
      modal
      contentStyle={{
        width: "60%",
        maxHeight: "80vh",
        overflow: "auto",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      {(close) => (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg dark:shadow-xl transition-colors duration-500">
          <h2 className="text-2xl font-semibold mb-4 text-center text-[#08807a] dark:text-teal-400 transition-colors duration-500">
            {t("edit")}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Title (English and Hindi) */}
            <div>
              <label className="text-persian-green-700 dark:text-persian-green-200 mb-1 block text-sm font-semibold transition-colors duration-500">
                {t("titleEnglish")}
              </label>
              <input
                type="text"
                {...register("title.en")}
                className="border-persian-green-300 dark:border-persian-green-800 dark:bg-persian-green-950 dark:text-persian-green-100 focus:border-persian-green-500 focus:ring-persian-green-400 dark:focus:ring-persian-green-600 w-full rounded-xl border bg-white p-3 text-sm text-gray-800 shadow-sm focus:ring-1 transition-colors duration-300"
              />
              {errors.title?.en && (
                <p className="mt-1 text-sm text-red-500">{errors.title.en.message}</p>
              )}
            </div>

            <div>
              <label className="text-persian-green-700 dark:text-persian-green-200 mb-1 block text-sm font-semibold transition-colors duration-500">
                {t("titleHindi")}
              </label>
              <input
                type="text"
                {...register("title.hi")}
                className="border-persian-green-300 dark:border-persian-green-800 dark:bg-persian-green-950 dark:text-persian-green-100 focus:border-persian-green-500 focus:ring-persian-green-400 dark:focus:ring-persian-green-600 w-full rounded-xl border bg-white p-3 text-sm text-gray-800 shadow-sm focus:ring-1 transition-colors duration-300"
              />
              {errors.title?.hi && (
                <p className="mt-1 text-sm text-red-500">{errors.title.hi.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="text-persian-green-700 dark:text-persian-green-200 mb-1 block text-sm font-semibold transition-colors duration-500">
                {t("categoryEnglish")}
              </label>
              <input
                type="text"
                {...register("category.en")}
                className="border-persian-green-300 dark:border-persian-green-800 dark:bg-persian-green-950 dark:text-persian-green-100 w-full rounded-xl border bg-white p-3 text-sm shadow-sm transition-colors duration-300"
              />
              {errors.category?.en && (
                <p className="mt-1 text-sm text-red-500">{errors.category.en.message}</p>
              )}
            </div>

            <div>
              <label className="text-persian-green-700 dark:text-persian-green-200 mb-1 block text-sm font-semibold transition-colors duration-500">
                {t("categoryHindi")}
              </label>
              <input
                type="text"
                {...register("category.hi")}
                className="border-persian-green-300 dark:border-persian-green-800 dark:bg-persian-green-950 dark:text-persian-green-100 w-full rounded-xl border bg-white p-3 text-sm shadow-sm transition-colors duration-300"
              />
              {errors.category?.hi && (
                <p className="mt-1 text-sm text-red-500">{errors.category.hi.message}</p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="text-persian-green-700 dark:text-persian-green-200 mb-1 block text-sm font-semibold transition-colors duration-500">
                {t("tags")}
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder={t("tagPlaceholder")}
                className="border-persian-green-300 dark:border-persian-green-800 dark:bg-persian-green-950 dark:text-persian-green-100 focus:border-persian-green-500 focus:ring-persian-green-400 dark:focus:ring-persian-green-600 w-full rounded-xl border bg-white p-3 text-sm text-gray-800 shadow-sm focus:ring-1 transition-colors duration-300"
              />
              {errors.tags && (
                <p className="mt-1 text-sm text-red-500">{errors.tags.message}</p>
              )}
              <div className="mt-2 flex flex-wrap gap-2 transition-colors duration-500">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-persian-green-100 dark:bg-persian-green-800 text-persian-green-900 dark:text-persian-green-100 flex items-center gap-2 rounded-full px-3 py-1 text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-red-500 hover:text-red-700"
                      aria-label={`Remove tag ${tag}`}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Content (English and Hindi) */}
            <div>
              <label className="text-persian-green-700 dark:text-persian-green-200 mb-1 block text-sm font-semibold transition-colors duration-500">
                {t("contentEnglish")}
              </label>
              <Controller
                name="content.en"
                control={control}
                defaultValue=""
                render={({ field }) => <MarkdownEditor value={field.value} onChange={field.onChange} />}
              />
              {errors.content?.en && (
                <p className="mt-1 text-sm text-red-500">{errors.content.en.message}</p>
              )}
            </div>

            <div>
              <label className="text-persian-green-700 dark:text-persian-green-200 mb-1 block text-sm font-semibold transition-colors duration-500">
                {t("contentHindi")}
              </label>
              <Controller
                name="content.hi"
                control={control}
                defaultValue=""
                render={({ field }) => <MarkdownEditor value={field.value} onChange={field.onChange} />}
              />
              {errors.content?.hi && (
                <p className="mt-1 text-sm text-red-500">{errors.content.hi.message}</p>
              )}
            </div>

            {/* Feature Image Upload */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={async (e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file) {
                  const fakeEvent = { target: { files: [file] } };
                  await handleImageUpload(fakeEvent);
                }
              }}
              className="border-2 border-dashed border-persian-green-300 dark:border-persian-green-700 p-4 rounded-lg relative hover:bg-persian-green-50 dark:hover:bg-persian-green-950 transition-colors duration-300"
            >
              <label className="text-persian-green-700 dark:text-persian-green-200 mb-2 block text-sm font-semibold transition-colors duration-500">
                {t("featureImage")}
              </label>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageUpload}
                aria-label={t("featureImage")}
              />

              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="bg-persian-green-100 text-persian-green-900 hover:bg-persian-green-200 dark:bg-persian-green-800 dark:text-persian-green-100 dark:hover:bg-persian-green-700 flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium transition disabled:opacity-60 mx-auto"
                aria-label={t("uploadImage")}
              >
                {isUploading ? (
                  <>
                    <FaSpinner className="h-4 w-4 animate-spin" />
                    {t("uploading")}
                  </>
                ) : (
                  t("uploadImage")
                )}
              </motion.button>

              {uploadedImageUrl && (
                <motion.img
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  src={uploadedImageUrl}
                  alt="Uploaded Preview"
                  className="border-persian-green-200 dark:border-persian-green-800 mt-4 h-40 w-auto rounded-lg border object-cover shadow-md mx-auto"
                />
              )}

              {errors.image && (
                <p className="mt-1 text-sm text-red-500 text-center">{errors.image.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              disabled={isSubmitting}
              className="bg-persian-green-600 hover:bg-persian-green-700 w-full rounded-xl px-6 py-3 text-center text-sm font-semibold text-white shadow-md transition-colors duration-300"
            >
              {isSubmitting ? t("submitting") : t("submit")}
            </motion.button>
          </form>
        </div>
      )}
    </Popup>
  );
}
