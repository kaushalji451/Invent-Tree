"use client";

import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useTranslations } from "next-intl";

const EditService = ({ id, initialData }) => {
  const t = useTranslations("ServiceEdit");

  const [titleEn, setTitleEn] = useState(initialData?.title?.en || "");
  const [titleHi, setTitleHi] = useState(initialData?.title?.hi || "");
  const [descEn, setDescEn] = useState(initialData?.description?.en || "");
  const [descHi, setDescHi] = useState(initialData?.description?.hi || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [imageFile, setImageFile] = useState(null);
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);

  const handleSubmit = async (e, close) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titleEn", titleEn);
    formData.append("titleHi", titleHi);
    formData.append("descriptionEn", descEn);
    formData.append("descriptionHi", descHi);
    formData.append("category", category);
    formData.append("isActive", isActive);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(`/api/services?id=${id}`, {
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
      console.error("Update failed:", error);
      alert(t("alert.failure"));
    }
  };

  return (
    <div>
      <Popup
        trigger={
          <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-colors duration-300">
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
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("form.titleEn")}
                </label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("form.titleHi")}
                </label>
                <input
                  type="text"
                  value={titleHi}
                  onChange={(e) => setTitleHi(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("form.descEn")}
                </label>
                <textarea
                  value={descEn}
                  onChange={(e) => setDescEn(e.target.value)}
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("form.descHi")}
                </label>
                <textarea
                  value={descHi}
                  onChange={(e) => setDescHi(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("form.category")}
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("form.image")}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300"
                />
              </div>

              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300"
                />
                <label>{t("form.active")}</label>
              </div>

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
                  className="px-4 py-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300"
                >
                  {t("button.save")}
                </button>
              </div>
            </form>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default EditService;
