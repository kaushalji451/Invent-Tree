import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from "next-intl";

// Just store images in order
const sceneImages = [
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPpAh63HncAuJOC6TxWkGLYpS0WwNXswz9MA&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPpAh63HncAuJOC6TxWkGLYpS0WwNXswz9MA&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPpAh63HncAuJOC6TxWkGLYpS0WwNXswz9MA&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPpAh63HncAuJOC6TxWkGLYpS0WwNXswz9MA&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPpAh63HncAuJOC6TxWkGLYpS0WwNXswz9MA&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPpAh63HncAuJOC6TxWkGLYpS0WwNXswz9MA&s",
];

const MobileCarousel = () => {
  const [index, setIndex] = useState(0);
  const t = useTranslations("Home.slide2.scenes"); // start from scenes namespace

  // Auto-slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % sceneImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full px-4"
        >
          <div className="bg-white dark:bg-[#2e2d2d]/95 p-6 rounded-2xl shadow-lg text-center">
            <img
              src={sceneImages[index]}
              alt={t(`${index}.title`)}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <p className="text-sm text-[#8777a9] font-semibold">
              {t(`${index}.label`)}
            </p>
            <h2 className="text-xl font-bold text-[#8777a9]">
              {t(`${index}.title`)}
            </h2>
          <p className="mt-2 text-[#dae7ef ]">
              {t(`${index}.text`)}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MobileCarousel;
