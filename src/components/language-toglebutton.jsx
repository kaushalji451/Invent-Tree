"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "../i18n/navigation";
import { usePathname } from "next/navigation";

const LanguageToggle = () => {
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1]; // 'en' or 'hi'
  const basePath = pathname.replace(/^\/(en|hi)/, ""); // strip current locale
  const [isHindi, setIsHindi] = useState(currentLocale === "hi");

  useEffect(() => {
    setIsHindi(currentLocale === "hi");
  }, [currentLocale]);

  const handleToggle = () => {
    const newLocale = isHindi ? "en" : "hi";
    router.replace(basePath || "/", { locale: newLocale });
  };

  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={isHindi}
        onChange={handleToggle}
      />
      <div className="peer relative h-6 w-11 rounded-full bg-[#e995b7] peer-checked:bg-[#604e84] peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-persian-green-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:bg-[#604e84]
        dark:peer-checked:bg-[#604e84]" />
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {isHindi ? "हिंदी" : "English"}
      </span>
    </label>
  );
};

export default LanguageToggle;
