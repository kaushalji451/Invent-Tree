"use client";

import { useForm, Controller } from "react-hook-form";
import MarkdownEditor from "../../../../../components/MarkdownEditor";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogPostSchema } from "../../../../../schema/blog.schema";
import { useRouter, useParams } from "next/navigation";

export default function BlogAdminPage({ params }) {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      category: "",
      tags: [],
      content: "",
      featureImage: "",
    },
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [blogData, setBlogData] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const fileInputRef = useRef(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { slug } = useParams();

  // Watch all form values to ensure they're updated
  const watchedValues = watch();
  useEffect(() => {
    const fetchBlogData = async () => {
      if (!slug) return;

      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get(`/api/blog?slug=${slug}`);
        const data = response.data.message[0];


        // Store the fetched data
        setBlogData(data);

        // Use reset to populate all form fields at once
        const formData = {
          title: data.title || "",
          category: data.category || "",
          tags: data.tags || [], // ← Should be an array
          content: data.content || "",
          featureImage: data.image || "", // ← Map from 'image' to 'featureImage'
        };
        setTags(data.tags || []); // ← Should be an array
        reset(formData);

        // Set uploaded image URL if it exists
        if (data.image) {
          // ← Check for 'image' field from API
          setUploadedImageUrl(data.image);
        }
      } catch (err) {
        console.error("Failed to fetch blog data:", err);
        setError("Could not load blog data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogData();
  }, [slug, reset]);

  // Additional effect to ensure form is populated after data is loaded
 useEffect(() => {
  if (blogData && !isLoading) {
    const formData = {
      title: blogData.title || "",
      category: blogData.category || "",
      tags: blogData.tags || [], // ← Should be "tags" (plural) and an array
      content: blogData.content || "",
      featureImage: blogData.image || "", // ← Map from 'image' to 'featureImage'
    };

    // Force update form values
    Object.keys(formData).forEach((key) => {
      setValue(key, formData[key], {
        shouldValidate: false,
        shouldDirty: true,
      });
    });

    // Update tags state
    setTags(blogData.tags || []); // ← Ensure tags state is updated

    // Ensure image URL is set
    if (blogData.image && !uploadedImageUrl) { // ← Check for 'image' field
      setUploadedImageUrl(blogData.image);
    }
  }
}, [blogData, isLoading, setValue, uploadedImageUrl]);

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

  const onSubmit = async (data) => {
    try {
      const response = await axios.patch("/api/blog", {
        ...data,
        slug, // send slug for edit operation
      });
      if (response.status === 201) {
        router.push("/admin/dashboard");
      } else {
        setError(response.data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error saving blog:", err);
      setError("Error saving blog. Try again.");
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

  if (error) {
    return (
      <div className="mx-auto mt-20 max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-red-50 p-4 text-red-700">
          <h2 className="text-lg font-semibold">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mx-auto mt-20 max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-8">
          <FaSpinner className="text-persian-green-600 h-8 w-8 animate-spin" />
          <span className="ml-2">Loading blog data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-20 max-w-3xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-persian-green-800 dark:text-persian-green-200 mb-6 text-2xl font-bold">
        {slug ? "Edit Blog" : "Create New Blog"}
      </h1>

      {/* Debug Section - Remove in production */}
      {process.env.NODE_ENV === "development" && (
        <div className="mb-4 rounded-lg bg-gray-100 p-4 text-sm">
          <h3 className="font-semibold">Debug Info:</h3>
          <p>Slug: {slug}</p>
          <p>Is Loading: {isLoading.toString()}</p>
          <p>Blog Data Loaded: {blogData ? "Yes" : "No"}</p>
          <p>Form Values:</p>
          <pre className="mt-2 text-xs">
            {JSON.stringify(watchedValues, null, 2)}
          </pre>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Title */}
        <div>
          <label className="text-persian-green-700 dark:text-persian-green-200 mb-1 block text-sm font-semibold">
            Title
          </label>
          <input
            type="text"
            {...register("title")}
            className="border-persian-green-300 focus:border-persian-green-500 focus:ring-persian-green-400 dark:border-persian-green-800 dark:bg-persian-green-950 dark:text-persian-green-100 dark:focus:ring-persian-green-600 w-full rounded-xl border bg-white p-3 text-sm text-gray-800 shadow-sm focus:ring-1"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="text-persian-green-700 dark:text-persian-green-200 mb-1 block text-sm font-semibold">
            Category
          </label>
          <select
            {...register("category")}
            className="border-persian-green-300 dark:border-persian-green-800 dark:bg-persian-green-950 dark:text-persian-green-100 w-full rounded-xl border bg-white p-3 text-sm shadow-sm"
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
          <label className="text-persian-green-700 dark:text-persian-green-200 mb-1 block text-sm font-semibold">
            Tags
          </label>

          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Type a tag and press Enter"
            className="border-persian-green-300 focus:border-persian-green-500 focus:ring-persian-green-400 dark:border-persian-green-800 dark:bg-persian-green-950 dark:text-persian-green-100 dark:focus:ring-persian-green-600 w-full rounded-xl border bg-white p-3 text-sm text-gray-800 shadow-sm focus:ring-1"
          />

          {errors.tags && (
            <p className="mt-1 text-sm text-red-500">{errors.tags.message}</p>
          )}

          <div className="mt-2 flex flex-wrap gap-2">
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
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="text-persian-green-700 dark:text-persian-green-200 mb-1 block text-sm font-semibold">
            Content
          </label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <MarkdownEditor
                value={field.value || ""}
                onChange={field.onChange}
                key={blogData?.content || "new"} // Force re-render when data changes
              />
            )}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-500">
              {errors.content.message}
            </p>
          )}
          {/* Debug info - remove in production */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-2 text-xs text-gray-500">
              Current content length: {watchedValues.content?.length || 0}
            </div>
          )}
        </div>

        {/* Feature Image Upload */}
        <div>
          <label className="text-persian-green-700 dark:text-persian-green-200 mb-1 block text-sm font-semibold">
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
            className="bg-persian-green-100 text-persian-green-900 hover:bg-persian-green-200 dark:bg-persian-green-800 dark:text-persian-green-100 dark:hover:bg-persian-green-700 flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium transition disabled:opacity-60"
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

          {/* Show existing image or newly uploaded image */}
          {uploadedImageUrl && (
            <div className="mt-4">
              <p className="text-persian-green-700 dark:text-persian-green-200 mb-2 text-sm font-medium">
                Current Feature Image:
              </p>
              <motion.img
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                src={uploadedImageUrl}
                alt="Feature Image Preview"
                className="border-persian-green-200 dark:border-persian-green-800 h-40 w-auto rounded-lg border object-cover shadow-md"
                onError={(e) => {
                  console.error("Image failed to load:", uploadedImageUrl);
                  e.target.style.display = "none";
                }}
                onLoad={() => {
                  console.log("Image loaded successfully:", uploadedImageUrl);
                }}
              />
            </div>
          )}

          {/* Debug info for image */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-2 text-xs text-gray-500">
              <p>Uploaded Image URL: {uploadedImageUrl || "None"}</p>
              <p>Form Feature Image: {watchedValues.featureImage || "None"}</p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          disabled={isSubmitting}
          className="bg-persian-green-600 hover:bg-persian-green-700 w-full rounded-xl px-6 py-3 text-center text-sm font-semibold text-white shadow-md transition disabled:opacity-50"
        >
          {isSubmitting
            ? "Submitting..."
            : slug
              ? "Update Blog"
              : "Create Blog"}
        </motion.button>

        {error && (
          <p className="mt-4 text-center text-sm text-red-600">{error}</p>
        )}
      </form>
    </div>
  );
}
