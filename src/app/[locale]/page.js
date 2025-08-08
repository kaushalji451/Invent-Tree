'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Slide1 from "../../components/homepage/Slide1"
import Slide2 from "../../components/homepage/Slide2"
import Slide3 from "../../components/homepage/Slide3"
import Slide4 from "../../components/homepage/Slide4"
import Slide5 from "../../components/homepage/Slide5"

const steps = [
  { number: "01", label: "Home" },
  { number: "02", label: "INFORMATION" },
  { number: "03", label: "DETAILS" },
  { number: "04", label: "BUSSINSS" },
  { number: "05", label: "ANNOUNCEMENT" },
];

const Page = () => {
  const t = useTranslations('Home');
  const [hoveredStep, setHoveredStep] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const containerRef = useRef(null);
  const slideRefs = useRef(steps.map(() => React.createRef()));

  const handleStepClick = (idx) => {
    setActiveStep(idx);
    slideRefs.current[idx]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  };

  const handleScroll = () => {
    if (!containerRef.current) return;

    const isDesktop = window.innerWidth >= 768;
    let step = 0;

    slideRefs.current.forEach((ref, idx) => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        if (isDesktop && rect.left <= window.innerWidth / 2 && rect.right >= window.innerWidth / 2) {
          step = idx;
        } else if (!isDesktop && rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          step = idx;
        }
      }
    });

    setActiveStep(step);
  };

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const progressWidth = `${(activeStep / (steps.length - 1)) * 100}%`;


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      ref={containerRef}
      className="overflow-x-auto overflow-y-auto w-screen h-screen snap-y snap-mandatory flex flex-col md:flex-row md:snap-x md:overflow-y-hidden md:overflow-x-auto"
    >
      {/* Progress Bar Navigation */}
      <div className="fixed bottom-10 right-5 text-white p-4 z-50">
        <div className="flex items-center justify-center mt-10">
          <div className="relative flex items-center w-fit">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-teal-400 z-0" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-white z-10 transition-all duration-300"
              style={{ width: progressWidth }}
            />
            {steps.map((step, idx) => (
              <div key={step.number} className="relative z-20 flex flex-col items-center mx-4">
                <div
                  className={`absolute bottom-10 px-3 py-1 rounded bg-white text-teal-600 shadow transition-all duration-300
                  ${(hoveredStep === idx || (hoveredStep === null && activeStep === idx))
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-2 pointer-events-none'}`}
                  style={{ minWidth: "90px", textAlign: "center" }}
                >
                  {step.label}
                  <span className="absolute left-1/2 -bottom-2.5 -translate-x-1/2 w-3 h-3 bg-white rotate-45 shadow-sm" />
                </div>
                <button
                  className={`w-8 h-8 flex mt-6 items-center justify-center font-light
                  ${idx <= activeStep ? 'text-teal-600' : 'text-black'}`}
                  onMouseEnter={() => setHoveredStep(idx)}
                  onMouseLeave={() => setHoveredStep(null)}
                  onClick={() => handleStepClick(idx)}
                >
                  {step.number}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slides */}
      <div className="flex flex-col md:flex-row w-screen h-[400vh] md:w-[800vw] md:h-screen">

        {/* Slide 1 */}
        <Slide1 slideRefs={slideRefs} />

        {/* Slide 2 */}
        <Slide2 slideRefs={slideRefs} />

        {/* Slide 3 */}
        <Slide3 slideRefs={slideRefs} />

        {/* Slide 3 */}
        <Slide4 slideRefs={slideRefs} />

        {/* Slide 3 */}
        <Slide5 slideRefs={slideRefs} />

      </div>
    </motion.div>
  );
};

export default Page;
