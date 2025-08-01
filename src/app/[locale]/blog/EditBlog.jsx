"use client";

import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useTranslations } from "next-intl";

const EditBlog = ({ slug, initialData }) => {
  const t = useTranslations("BlogEdit");

  const [titleEn, setTitleEn] = useState(initialData?.title?.en || "");
  const [titleHi, setTitleHi] = useState(initialData?.title?.hi || "");
  const [contentEn, setContentEn] = useState(initialData?.content?.en || "");
  const [contentHi, setContentHi] = useState(initialData?.content?.hi || "");
  const [categoryEn, setCategoryEn] = useState(initialData?.category?.en || "");
  const [categoryHi, setCategoryHi] = useState(initialData?.category?.hi || "");
  const [tags, setTags] = useState(initialData?.tags?.join(", ") || "");
  const [imageFile, setImageFile] = useState(null);
  const [published, setPublished] = useState(initialData?.published ?? true);

  const handleSubmit = async (e, close) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("slug", slug);
    formData.append("titleEn", titleEn);
    formData.append("titleHi", titleHi);
    formData.append("contentEn", contentEn);
    formData.append("contentHi", contentHi);
    formData.append("categoryEn", categoryEn);
    formData.append("categoryHi", categoryHi);
    formData.append("tags", tags);
    formData.append("published", published);
    if (imageFile) formData.append("image", imageFile);

    try {
      const response = await fetch(`/api/blogs?slug=${slug}`, {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        alert(t("alert.success"));
        close();
        location.reload();
      } else {
        alert(t("alert.failure"));
      }
    } catch (error) {
      console.error(error);
      alert(t("alert.failure"));
    }
  };

  return (
    <Popup
      trigger={
        <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 transition-colors duration-300">
          {t("button.edit")}
        </button>
      }
      modal
      contentStyle={{
        width: "60%",
        height: "80vh",
        borderRadius: "10px",
        padding: "20px",
        overflow: "auto",
      }}
    >
      {(close) => (
        <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-xl relative p-6 transition-colors duration-500">
          <button
            className="absolute top-2 right-3 text-2xl font-bold text-gray-700 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300"
            onClick={close}
            aria-label={t("button.close") || "Close"}
          >
            &times;
          </button>

          <h2 className="text-2xl mb-4 font-bold text-black dark:text-white text-center transition-colors duration-500">
            {t("title")}
          </h2>

          <form onSubmit={(e) => handleSubmit(e, close)} className="space-y-6">
            {/* Title EN & HI */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                {t("form.titleEn")}
              </label>
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                {t("form.titleHi")}
              </label>
              <input
                type="text"
                value={titleHi}
                onChange={(e) => setTitleHi(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors duration-300"
              />
            </div>

            {/* Content EN & HI */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                {t("form.contentEn")}
              </label>
              <textarea
                value={contentEn}
                onChange={(e) => setContentEn(e.target.value)}
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded resize-y bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                {t("form.contentHi")}
              </label>
              <textarea
                value={contentHi}
                onChange={(e) => setContentHi(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded resize-y bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors duration-300"
              />
            </div>

            {/* Category EN & HI */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                {t("form.categoryEn")}
              </label>
              <input
                type="text"
                value={categoryEn}
                onChange={(e) => setCategoryEn(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                {t("form.categoryHi")}
              </label>
              <input
                type="text"
                value={categoryHi}
                onChange={(e) => setCategoryHi(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors duration-300"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                {t("form.tags")}
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="comma-separated"
                className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors duration-300"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                {t("form.image")}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors duration-300"
              />
            </div>

            {/* Published Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors duration-300"
                id="published"
              />
              <label
                htmlFor="published"
                className="text-gray-700 dark:text-gray-300 transition-colors duration-300"
              >
                {t("form.published")}
              </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={close}
                className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                {t("button.cancel")}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors duration-300"
              >
                {t("button.save")}
              </button>
            </div>
          </form>
        </div>
      )}
    </Popup>
  );
};

export default EditBlog;
