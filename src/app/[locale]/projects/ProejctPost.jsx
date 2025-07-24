"use client";

import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useTranslations } from "next-intl";

const ProjectPost = () => {
  const t = useTranslations("PostProject");

  const [titleEn, setTitleEn] = useState("");
  const [titleHi, setTitleHi] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descHi, setDescHi] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [featured, setFeatured] = useState(false);

  const handleSubmit = async (e, close) => {
    e.preventDefault();
    const formData = new FormData();

    // Flatten nested objects
    formData.append("titleEn", titleEn);
    formData.append("titleHi", titleHi);
    formData.append("descriptionEn", descEn);
    formData.append("descriptionHi", descHi);
    formData.append("category", category);
    formData.append("featured", featured);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await fetch(`/api/projects`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Response:", data);

      if (data.data) {
        close();
        alert(t("successMessage"));
        location.reload();
      } else {
        alert(t("failMessage") || t("errorMessage"));
      }
    } catch (err) {
      console.error("Error submitting project:", err);
      alert(t("errorMessage"));
    }
  };

  return (
    <div>
      <Popup
        trigger={
          <span className="text-lg py-2 px-4 border-l-4 border-[#08807a] font-normal relative left-3 select-text bg-white dark:bg-gray-800 dark:text-teal-300 rounded-md shadow-sm cursor-default transition-colors duration-500">
            {t("postProjectButton")}
          </span>
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
              aria-label={t("close")}
            >
              &times;
            </button>

            <h2 className="text-2xl mb-4 font-bold text-black dark:text-white text-center transition-colors duration-500">
              {t("modalTitle")}
            </h2>

            <form onSubmit={(e) => handleSubmit(e, close)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("titleEn")}
                </label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("titleHi")}
                </label>
                <input
                  type="text"
                  value={titleHi}
                  onChange={(e) => setTitleHi(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("descriptionEn")}
                </label>
                <textarea
                  value={descEn}
                  onChange={(e) => setDescEn(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded resize-y focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("descriptionHi")}
                </label>
                <textarea
                  value={descHi}
                  onChange={(e) => setDescHi(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded resize-y focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("category")}
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("uploadImage")}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
                  required
                />
              </div>

              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
                />
                <label>{t("featured")}</label>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={close}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
                >
                  {t("saveProject")}
                </button>
              </div>
            </form>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default ProjectPost;
