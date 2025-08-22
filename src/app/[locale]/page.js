'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Slide1 from "../../components/homepage/Slide1"
import Slide2 from "../../components/homepage/slide2/Slide2"
import Slide3 from "../../components/homepage/Slide3"
import Slide4 from "../../components/homepage/Slide4"
import Slide5 from "../../components/homepage/Slide5"

const steps = [
  { number: '01', label: 'Home' },
  { number: '02', label: 'INFORMATION' },
  { number: '03', label: 'DETAILS' },
  { number: '04', label: 'BUSINESS' },
  { number: '05', label: 'ANNOUNCEMENT' },
];

export default function Page() {
  const containerRef = useRef(null);
  const slideRefs = useRef(steps.map(() => null));

  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState(null);

  const rafRef = useRef(null);
  const pendingDeltaRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDesktop = window.innerWidth >= 768;

    function onResize() {
      isDesktop = window.innerWidth >= 768;
    }

    function onWheel(e) {
      if (!isDesktop) return;
      e.preventDefault();
      pendingDeltaRef.current += e.deltaY;

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          const delta = pendingDeltaRef.current;
          pendingDeltaRef.current = 0;
          container.scrollLeft += delta;
          rafRef.current = null;
        });
      }
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          updateActiveStepFromScroll();
          ticking = false;
        });
      }
    }

    function updateActiveStepFromScroll() {
      let found = 0;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      slideRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();

        if (isDesktop) {
          // Find slide whose center is closest to viewport center
          const slideCenter = rect.left + rect.width / 2;
          if (Math.abs(slideCenter - centerX) < Math.abs((slideRefs.current[found]?.getBoundingClientRect().left ?? 0) + (slideRefs.current[found]?.getBoundingClientRect().width ?? 0) / 2 - centerX)) {
            found = idx;
          }
        } else {
          const slideCenter = rect.top + rect.height / 2;
          if (Math.abs(slideCenter - centerY) < Math.abs((slideRefs.current[found]?.getBoundingClientRect().top ?? 0) + (slideRefs.current[found]?.getBoundingClientRect().height ?? 0) / 2 - centerY)) {
            found = idx;
          }
        }
      });

      setActiveStep(found);
    }

    window.addEventListener('resize', onResize);
    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('scroll', onScroll, { passive: true });

    updateActiveStepFromScroll();

    return () => {
      window.removeEventListener('resize', onResize);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    function onKey(e) {
      if (e.key === 'ArrowRight' && activeStep < steps.length - 1) {
        slideRefs.current[activeStep + 1]?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      } else if (e.key === 'ArrowLeft' && activeStep > 0) {
        slideRefs.current[activeStep - 1]?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeStep]);

  const handleStepClick = (idx) => {
    slideRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  };

  const [progressWidth, setProgressWidth] = useState('0%');
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let rafId;
    function updateProgress() {
      const ratio = container.scrollLeft / (container.scrollWidth - container.clientWidth || 1);
      setProgressWidth(`${Math.max(0, Math.min(1, ratio)) * 100}%`);
      rafId = requestAnimationFrame(updateProgress);
    }
    rafId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      ref={containerRef}
      className="w-screen h-screen overflow-auto md:overflow-hidden md:touch-none"
      style={{ scrollBehavior: 'auto' }}
    >
      {/* Progress Bar Navigation (Desktop Only) */}
      <div className="hidden md:block fixed bottom-8 right-6 text-white p-4 z-50">
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
                  className={`absolute bottom-10 px-3 py-1 rounded bg-white dark:text-[#2e2d2d] text-teal-600 shadow transition-all duration-300
                    ${(hoveredStep === idx || (hoveredStep === null && activeStep === idx))
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-2 pointer-events-none'}`}
                  style={{ minWidth: '90px', textAlign: 'center' }}
                >
                  {step.label}
                  <span className="absolute left-1/2 -bottom-2.5 -translate-x-1/2 w-3 h-3 bg-white rotate-45 shadow-sm" />
                </div>
                <button
                  aria-label={`Go to ${step.label}`}
                  className={`w-8 h-8 flex mt-6 items-center justify-center font-light
                    ${idx <= activeStep ? 'text-teal-600' : 'dark:text-white text-black'}`}
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
      <div className="flex flex-col md:flex-row w-screen md:w-fit h-auto md:h-screen">
        <div ref={(el) => (slideRefs.current[0] = el)} className="w-[100vw] h-screen max-sm:h-fit flex-shrink-0 bg-cover bg-center bg-[url('/Home-Page-Invent-Tree.png')] dark:bg-[url('/Home-Page-Invent-Tree-Dark.png')]">
          <Slide1 />
        </div>
        <div ref={(el) => (slideRefs.current[1] = el)} className="h-screen flex-shrink-0 bg-cover  bg-center bg-[url('/Final-Illustration-Light-Mode.png')] dark:bg-[url('/Final-Illustration-Dark-Mode.png')]">
          <Slide2 />
        </div>
        <div ref={(el) => (slideRefs.current[2] = el)} className="w-[100vw] h-screen flex-shrink-0">
          <Slide3 />
        </div>
        <div ref={(el) => (slideRefs.current[3] = el)} className="w-[100vw] h-fit md:h-screen flex-shrink-0">
          <Slide4 />
        </div>
        <div ref={(el) => (slideRefs.current[4] = el)} className="w-[100vw] h-screen flex-shrink-0">
          <Slide5 />
        </div>
      </div>
    </motion.div>
  );
}
