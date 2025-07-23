"use client";

import React from "react";
import { useRouter, usePathname } from "../i18n/navigation";

const LanguageToggle = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (locale) => {
    router.replace(pathname, { locale });
  };

  return (
    <div className="flex gap-4 items-center justify-center py-4">
      <button
        onClick={() => handleLocaleChange("en")}
        className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        English
      </button>
      <button
        onClick={() => handleLocaleChange("hi")}
        className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
      >
        हिंदी
      </button>
    </div>
  );
};

export default LanguageToggle;
