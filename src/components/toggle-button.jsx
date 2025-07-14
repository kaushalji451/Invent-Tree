"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import cn from "../utils/cn";

export function ModeToggle({className}) {
  const { setTheme, theme } = useTheme();
  console.log(theme);
  const isDark = theme === "dark";
  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };
  return (
    <div className={cn("",className)} >
      <label className="inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          value=""
          className="peer sr-only"
          checked={isDark}
          onChange={handleToggle}
        />
        <div className="peer relative h-6 w-11 rounded-full bg-persian-green-200 peer-checked:bg-persian-green-600   peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-persian-green-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-persian-green-700 dark:peer-checked:bg-persian-green-600 "></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {theme === "dark" ? "Dark Mode" : "Light Mode"}
        </span>
      </label>
    </div>
  );
}
