"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

const ContactForm = () => {
  const t = useTranslations("Contact");

  const [form, setForm] = useState({
    inquiryType: "",
    organization: "",
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    language: "",
  });

  const inquiryOptions = [
    { key: "order", label: t("inquiryOptions.order") },
    { key: "scheme", label: t("inquiryOptions.scheme") },
    { key: "recruitment", label: t("inquiryOptions.recruitment") },
    { key: "other", label: t("inquiryOptions.other") },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unknown error");

      alert("Message sent successfully!");
    } catch (err) {
      alert("Failed to submit: " + err.message);
      console.error("Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fd] dark:bg-[#1f1f1f] flex flex-col items-center justify-start py-10 px-4 transition-colors duration-500">
      <div className="text-center mb-6 max-md:mt-10">
        <h2 className="text-lg text-gray-800 dark:text-gray-200 transition-colors duration-500">{t("heading")}</h2>
        <p className="text-sm mt-1 text-gray-600 dark:text-gray-400 transition-colors duration-500">
          {t("callText")}{" "}
          <span className="text-[#67577f] font-semibold ">058-322-3322</span> {t("callTime")}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#2e2d2d] shadow-md w-full max-w-xl rounded-lg px-8 py-6 transition-colors duration-500"
      >
        {/* Inquiry Type */}
        <div className="mb-4">
          <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2 transition-colors duration-500">
            {t("inquiryLabel")} <span className="text-red-600">*</span>
          </label>
          <div className="space-y-1">
            {inquiryOptions.map((option) => (
              <div key={option.key}>
                <label className="inline-flex items-center text-gray-800 dark:text-gray-300 transition-colors duration-500">
                  <input
                    type="radio"
                    className="form-radio text-green-600 dark:text-green-400"
                    checked={form.inquiryType === option.label}
                    onChange={() => setForm({ ...form, inquiryType: option.label })}
                  />
                  <span className="ml-2">{option.label}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Organization */}
        <div className="mb-4">
          <label htmlFor="organization" className="block text-gray-800 dark:text-gray-200 mb-1 transition-colors duration-500">
            {t("organizationLabel")}
          </label>
          <input
            type="text"
            name="organization"
            id="organization"
            value={form.organization}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-[#2e2d2d] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#455b68] transition-colors duration-300"
            placeholder={t("organizationPlaceholder")}
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-800 dark:text-gray-200 mb-1 transition-colors duration-500">
            {t("nameLabel")} <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-[#2e2d2d] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#455b68] transition-colors duration-300"
            placeholder={t("namePlaceholder")}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-800 dark:text-gray-200 mb-1 transition-colors duration-500">
            {t("emailLabel")} <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-[#2e2d2d] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#455b68] transition-colors duration-300"
            placeholder={t("emailPlaceholder")}
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-800 dark:text-gray-200 mb-1 transition-colors duration-500">
            {t("phoneLabel")} <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            required
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-[#2e2d2d] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#455b68] transition-colors duration-300"
            placeholder={t("phonePlaceholder")}
          />
        </div>

        {/* Subject */}
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-800 dark:text-gray-200 mb-1 transition-colors duration-500">
            {t("subjectLabel")} <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            required
            value={form.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-[#2e2d2d] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#455b68] transition-colors duration-300"
            placeholder={t("subjectPlaceholder")}
          />
        </div>

        {/* Message */}
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-800 dark:text-gray-200 mb-1 transition-colors duration-500">
            {t("messageLabel")} <span className="text-red-600">*</span>
          </label>
          <textarea
            name="message"
            id="message"
            required
            value={form.message}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 h-24 bg-white dark:bg-[#2e2d2d] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#455b68] transition-colors duration-300 resize-y"
            placeholder={t("messagePlaceholder")}
          />
        </div>

        {/* Language */}
        <div className="mb-6">
          <label htmlFor="language" className="block text-gray-800 dark:text-gray-200 mb-1 transition-colors duration-500">
            {t("languageLabel")}
          </label>
          <input
            type="text"
            name="language"
            id="language"
            value={form.language}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-[#2e2d2d] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#455b68] transition-colors duration-300"
            placeholder={t("languagePlaceholder")}
          />
        </div>

        {/* Submit */}
        <div className="w-full flex items-center justify-center">
          <button
            type="submit"
            className="bg-[#8777a9] text-xl p-5 w-[221px] h-[56px] flex items-center justify-center text-white font-semibold rounded-full hover:bg-[#67577f]  transition-colors duration-300 focus:outline-none focus:ring-4 "
          >
            {t("submitButton")}
          </button>
        </div>

        {/* reCAPTCHA Footer */}
        <br />
        <div>
          <p className="text-xs  text-center text-gray-600 dark:text-white transition-colors duration-500">
            {t("privacyNote")}{" "}
            <span className="text-blue-500 underline cursor-pointer">{t("privacyPolicy")}</span> and{" "}
            <span className="text-blue-500 underline cursor-pointer">{t("terms")}</span> apply.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
