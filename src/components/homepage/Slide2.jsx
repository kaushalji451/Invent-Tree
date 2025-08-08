'use client';

import React, { useState } from 'react';
import { FaLeaf } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Scene data
const scenes = [
  {
    title: 'farmer',
    text: 'Compost bags and garbage bags are a bridge between the fresh vegetables on your dinner table, gently connecting producers and your dining table.',
  },
  {
    title: 'supplier',
    text: 'Suppliers ensure that biodegradable waste is processed efficiently to promote sustainable agriculture.',
  },
  {
    title: 'distributor',
    text: 'Distributors handle packaging and transportation of compost bags from waste to farmlands.',
  },
  {
    title: 'consumer',
    text: 'Consumers complete the loop by sorting waste responsibly using labeled garbage bags.',
  },
  {
    title: 'recycler',
    text: 'Recyclers turn organic waste into compost that rejuvenates the soil.',
  },
  {
    title: 'government',
    text: 'Government policies support sustainable practices from farm to table.',
  },
];

const yOffsets = [-40, 0, -50, 10, -30, 20];

// Rotating circle component
const RotatingSceneIndicator = ({ current }) => {
  const controls = useAnimation();

  React.useEffect(() => {
    controls.start({
      rotate: current * (360 / scenes.length),
      transition: { duration: 0.6, ease: 'easeInOut' },
    });
  }, [current, controls]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 50,
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: '#0d9488',
        boxShadow: '0 8px 30px rgba(13, 148, 136, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        animate={controls}
        initial={{ rotate: 0 }}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 700 }}>
          SCENE 0{current + 1}
        </div>
        <div style={{ fontSize: 20, marginTop: 6 }}>
          {scenes[current].title}
        </div>
      </motion.div>
    </div>
  );
};

const Slide2 = ({ slideRefs }) => {
  const [currentScene, setCurrentScene] = useState(0);

  // Hook to track when the entire cards section is in view
  const [cardsRef, cardsInView] = useInView({
    threshold: 0.2, // triggers when 20% of card container is visible
  });

  return (
    <div
      ref={slideRefs?.current ? slideRefs.current[1] : null}
      className="w-[350vw] h-screen flex items-center bg-cover bg-center bg-slate-200 snap-start overflow-x-auto scroll-smooth relative"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dpbpu5b0v/image/upload/v1752595832/Screenshot_2025-07-15_213828_t4jgvw.png')",
      }}
    >
      {/* Only show rotating circle when the card section is visible */}
      {cardsInView && <RotatingSceneIndicator current={currentScene} />}

      {/* Horizontal cards section being observed */}
      <div ref={cardsRef} className="flex flex-row gap-20 px-10">
        {/* Spacer before first card */}
        <div className="w-[100vw] flex-shrink-0" />

        {scenes.map((scene, idx) => (
          <SceneCard
            key={idx}
            index={idx}
            {...scene}
            setCurrentScene={setCurrentScene}
          />
        ))}
      </div>
    </div>
  );
};

const SceneCard = ({ title, text, index, setCurrentScene }) => {
  const [ref, inView] = useInView({ threshold: 0.5 });

  React.useEffect(() => {
    if (inView) {
      setCurrentScene(index);
    }
  }, [inView, index, setCurrentScene]);

  const offset = yOffsets[index % yOffsets.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: offset - 100 }}
      animate={inView ? { opacity: 1, y: offset } : { opacity: 0, y: offset - 100 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="w-[35vw] flex-shrink-0 flex flex-col items-center justify-center"
      style={{ marginTop: offset, zIndex: 10 - index }}
    >
      <div className="max-w-md bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-2xl text-center shadow-lg">
        <p className="text-sm text-teal-600 font-semibold">SCENE 0{index + 1}</p>
        <h2 className="text-2xl text-teal-700">{title}</h2>
        <p className="mt-3 text-gray-700">{text}</p>
      </div>

      <div className="relative mt-4">
        <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg relative z-10">
          <FaLeaf className="text-white text-2xl" />
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-teal-600"></div>
      </div>
    </motion.div>
  );
};

export default Slide2;
