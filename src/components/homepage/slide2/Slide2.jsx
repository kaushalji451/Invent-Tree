'use client';
import React, { useState } from 'react';
import scenes from "./scenes";
import SceneCard from "./Desktopcard";
import MobileCarousel from "./MobileCarsole";
import { useTranslations } from 'next-intl';
import { AnimatePresence } from 'framer-motion';

const Slide2 = () => {
  const t = useTranslations('Home');
  const [currentScene, setCurrentScene] = useState(0);

  return (
    <>
      {/* Desktop layout */}
      <div className="hidden sm:flex items-center">
        <div className="flex flex-row gap-20">
          <div
            className="w-[100vw] h-screen flex-shrink-0 bg-cover relative flex items-center"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dpbpu5b0v/image/upload/v1754898561/Screenshot_2025-08-10_144825-removebg-preview_emlftp.png')",
            }}
          >
            <p className="z-50 text-[#dae7ef] text-4xl ps-4 font-bold">
              {t('slide2.tagline')}
            </p>
          </div>
          <AnimatePresence>
          {scenes.map((scene, idx) => (
            <SceneCard
              key={idx}
              index={idx}
              {...scene}
              setCurrentScene={setCurrentScene}
              currentScene={currentScene}
            />
          ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile carousel layout */}
      <div className="min-md:hidden">
        <MobileCarousel />
      </div>
    </>
  );
};

export default Slide2;
