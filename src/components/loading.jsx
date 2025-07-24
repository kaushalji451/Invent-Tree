"use client";

import React from "react";
import { motion } from "motion/react";

const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center gap-x-5 bg-white dark:bg-gray-900 transition-colors duration-500">
      {[...Array(3)].map((_, idx) => (
        <motion.div
          key={idx}
          className="rounded-full w-6 h-6 md:w-10 md:h-10 bg-persian-green-800 dark:bg-persian-green-300"
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: idx * 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default Loading;
