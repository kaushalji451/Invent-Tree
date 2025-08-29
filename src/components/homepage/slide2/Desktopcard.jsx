"use client"
import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import RotatingSceneIndicator from './RoatatingCircle';

const yOffsets = [-40, 0, -50, 10, -30, 20];

const SceneCard = ({ index, setCurrentScene, currentScene }) => {
  const t = useTranslations('Home.slide2.scenes');
  const [ref, inView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      setCurrentScene(index);
    }
  }, [inView, index, setCurrentScene]);

  const offset = yOffsets[index % yOffsets.length];
  const [cardsRef, cardsInView] = useInView({ threshold: 0.2 });

  return (
    <>

      {cardsInView && <RotatingSceneIndicator current={currentScene} />}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: offset - 100 }}
        animate={inView ? { opacity: 1, y: offset } : { opacity: 0, y: offset - 100 }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        className="w-[35vw] flex-shrink-0 flex flex-col items-center justify-center"
        style={{ marginTop: offset, zIndex: 10 - index }}
      >
        {/* Card */}

        <div ref={cardsRef} className="max-w-md p-6 rounded-2xl text-center shadow-lg 
                      bg-white/70 bg-opacity-80 dark:bg-[#2e2d2d]/70 dark:bg-opacity-80 
                      backdrop-blur-md">
          <p className="text-md font-semibold text-[#27ec] ">
            {t(`${index}.label`)}
          </p>
          <h2 className="text-3xl text-[#604e84]">
            {t(`${index}.title`)}
          </h2>
          <p className="mt-3 text-gray-700 dark:text-[#cbcfd3]">
            {t(`${index}.text`)}
          </p>
        </div>

        {/* Icon with Arrow */}
        <div className="relative mt-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg relative z-10 
                        bg-[#8777a9] ">
            <img src="/logo/Invent-Tree logo Favicon-08.png" className='w-10' alt="" />
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 
                        w-0 h-0 border-l-8 border-r-8 border-t-8 
                        border-l-transparent border-r-transparent border-t-[#8777a9]"></div>
        </div>
      </motion.div>
    </>
  );
};

export default SceneCard;