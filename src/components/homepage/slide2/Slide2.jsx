'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import scenes from "./scenes";
import RotatingSceneIndicator from "./RoatatingCircle";
import SceneCard from "./Desktopcard";
import MobileCarousel from "./MobileCarsole";
import { useTranslations } from 'next-intl';

const Slide2 = () => {
  const t = useTranslations('Home');
  const [currentScene, setCurrentScene] = useState(0);
  const [cardsRef, cardsInView] = useInView({ threshold: 0.2 });

  return (
    <>
      {/* Desktop layout */}
      <div className="hidden sm:flex items-center">
        {cardsInView && <RotatingSceneIndicator current={currentScene} />}

        <div ref={cardsRef} className="flex flex-row gap-20 -mt-11">
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

      {/* Mobile carousel layout */}
      <div className="min-md:hidden">
        <MobileCarousel />
      </div>
    </>
  );
};

export default Slide2;
