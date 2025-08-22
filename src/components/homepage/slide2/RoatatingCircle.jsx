

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import scenes from "./scenes";

// Rotating circle component (desktop only)
const RotatingSceneIndicator = ({ current }) => {
  const activeScene = scenes[current];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 50,
        width: 900,
        height: 900,
        borderRadius: "50%",
        background: "#0d9488",
        boxShadow: "0 8px 30px rgba(13,148,136,0.25)",
        pointerEvents: "none",
        clipPath: "polygon(100% 0, 100% 50%, 50% 50%, 50% 0)",
        transform: "translate(-50%, 50%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "75%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ x: 120, y: 200, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ x: -120, y: -200, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
          >
            <div
              style={{
                width: 450,
                height: 300, 
                backgroundImage: `url(${activeScene.img})`,
              }}
              className="bg-cover bg-center rounded-2xl"
            />
            <p className="text-6xl text-end -mt-9 dark:text-white text-black font-bold">{activeScene.label}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};


export default RotatingSceneIndicator;