"use client";

import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useTranslations } from "next-intl";

const EditProject = ({ id, initialData }) => {
  const t = useTranslations("ProjectEdit");

  const [titleEn, setTitleEn] = useState(initialData?.title?.en || "");
  const [titleHi, setTitleHi] = useState(initialData?.title?.hi || "");
  const [descEn, setDescEn] = useState(initialData?.description?.en || "");
  const [descHi, setDescHi] = useState(initialData?.description?.hi || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [imageFile, setImageFile] = useState(null); // for new image upload

  const handleUpdate = async (e, close) => {
    e.preventDefault();

    const formData = new FormData();
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
      const res = await fetch(`/api/projects?id=${id}`, {
        method: "PATCH",
        body: formData,
      });

      const data = await res.json();
      if (data.data) {
        alert(t("successMessage"));
        close();
        location.reload();
      } else {
        alert(t("failMessage"));
      }
    } catch (err) {
      console.error("Update error:", err);
      alert(t("errorMessage"));
    }
  };

  return (
    <Popup
      trigger={
        <button className="text-white  bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-colors duration-300">
          {t("editButton")}
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
            {t("modalTitle")}
          </h2>
          <form onSubmit={(e) => handleUpdate(e, close)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("titleEn")}
              </label>
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                required
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
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
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("descriptionEn")}
              </label>
              <textarea
                value={descEn}
                onChange={(e) => setDescEn(e.target.value)}
                required
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded resize-y focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("descriptionHi")}
              </label>
              <textarea
                value={descHi}
                onChange={(e) => setDescHi(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded resize-y focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
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
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("uploadNewImage")}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
                required={!initialData?.image}
              />
            </div>
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="focus:ring-2 focus:ring-teal-500 rounded transition-colors duration-300"
              />
              <label>{t("featured")}</label>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={close}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                {t("cancel")}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {t("update")}
              </button>
            </div>
          </form>
        </div>
      )}
    </Popup>
  );
};

export default EditProject;
