# 🌳 Invent-Tree

Invent-Tree is a full-stack MERN-based web platform built for a political, survey, and geospatial consultancy firm. Inspired by the vision of YUI Tech, the application delivers a seamless, multilingual experience with powerful admin tools, survey tracking, blog features, and more.

## 🔧 Tech Stack

- **Frontend:** Next.js (App Router)
- **Styling:** Tailwind CSS, Framer Motion
- **State Management:** React Hooks
- **Internationalization:** i18next
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** NextAuth (JWT + MongoDB)
- **File Handling:** Cloudinary for image uploads
- **Package Manager:** pnpm

## ✨ Features

- 🌐 Multilingual support with i18next
- 🌗 Dark/Light mode toggle
- 📝 Blog creation & management (admin-only)
- 🗳️ Political survey & opinion collection tools
- 🧠 Geospatial data handling for analytics (upcoming)
- 🔒 Role-based authentication with JWT
- 📦 Fully typed REST API
- 📂 File/image uploads via Cloudinary
- 📊 Admin dashboard for content & user management

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm installed globally:  
  npm install -g pnpm

# Clone the Repository
git clone https://github.com/kaushalji451/Invent-Tree
Install Dependencies
pnpm install
Environment Variables
Create a .env.local file in the root directory and configure the following:

# MongoDB
MONGODB_URI=your_mongo_connection_string

# NextAuth
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# Google Provider (if using)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Run Development Server

pnpm dev
Open http://localhost:3000 in your browser.

# Scripts
Script	Description
pnpm dev	Starts the development server
pnpm build	Builds the project
pnpm start	Starts the production server
pnpm lint	Runs ESLint

# Security
JWT-based authentication via NextAuth.

Admin routes are protected via middleware.

File uploads are validated and securely stored on Cloudinary.

# License
MIT License. See LICENSE file for more details.

# Contact
For questions or collaboration:

💼 Author: Abhishek Kumar Kaushal

📧 Email: [abhishekkaushal2526@gmail.com]








home page code 
<!-- 'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Slide1 from "../../components/homepage/Slide1"
import Slide2 from "../../components/homepage/Slide2"
import Slide3 from "../../components/homepage/Slide3"

const images = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYqoKTu_o3Zns2yExbst2Co84Gpc2Q1RJbA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s',
  'https://thumbs.dreamstime.com/b/innovative-medical-device-featuring-eye-image-illustrating-advanced-tracking-technology-generated-ai-358374352.jpg',
  'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUPIfiGgUML8G3ZqsNLHfaCnZK3I5g4tJabQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUsbmTZu_uMrmJ0z--CrG-o1UIXytu1OCizQ&s',
  'https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbnUheL6Gz4BOy-uR6-BZ8KFIYVVDn-18ciQ&s',
];

const steps = [
  { number: "01", label: "MESSAGE" },
  { number: "02", label: "INFORMATION" },
  { number: "03", label: "DETAILS" },
  { number: "04", label: "CONFIRM" },
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
      <div className="flex flex-col md:flex-row w-screen h-[400vh] md:w-[400vw] md:h-screen">
        {/* Slide 1 */}
       <Slide1 slideRefs={slideRefs}/>
        {/* Slide 2 */}
        <Slide2 slideRefs={slideRefs}/>

        {/* Slide 3 */}
        {/* <div ref={slideRefs.current[2]} className="w-screen h-screen flex items-center justify-center bg-cover bg-center bg-slate-200 gap-20 snap-start"
          style={{ backgroundImage: "url('https://res.cloudinary.com/dpbpu5b0v/image/upload/v1752598504/Screenshot_2025-07-15_222532_ftsh87.png')" }}
        >
          <div className="flex flex-col items-center gap-5 w-1/2 max-md:w-full justify-center">
            <h1 className="text-5xl bg-gradient-to-b from-blue-50 to-blue-200 py-2 mx-10 max-md:text-3xl text-center">
              {t('slide3title')}
            </h1>
            <ul className="text-[#20998e] w-1/2 max-md:w-full max-md:text-2xl max-md:px-5 overflow-auto text-center">
              <li>{t('slide2li1')}</li>
              <li>{t('slide2li2')}</li>
              <li>{t('slide2li3')}</li>
            </ul>
            <Link href="/services" className="text-center rounded-md border border-slate-300 shadow-xl w-50 px-6 py-3 max-md:mt-10 hover:bg-[#20998e] dark:bg-slate-300 hover:text-white transition duration-300">
              {t('slide3CTA')}
            </Link>
          </div>
        </div> */}

        {/* Slide 4 */}
        <Slide3 slideRefs={slideRefs}/>
        {/* <div ref={slideRefs.current[3]} className="w-screen h-screen flex items-center justify-between bg-cover bg-center bg-slate-200 snap-start"
          style={{ backgroundImage: "url('https://res.cloudinary.com/dpbpu5b0v/image/upload/v1752599877/Screenshot_2025-07-15_224833_mgl78h.png')" }}
        >
          <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col items-center gap-5 px-4">
              <Image
                src="https://res.cloudinary.com/dpbpu5b0v/image/upload/v1752599604/Screenshot_2025-07-15_224405_ku0qio.png"
                alt="Campaign"
                width={150}
                height={150}
              />
              <h1 className="font-bold text-3xl text-[#20998e] text-center">
                {t('slide4title')}
              </h1>
              <p className="text-2xl text-center dark:text-black">{t('slide4description')}</p>
            </div>
          </div>
          <div className="w-1/4 h-full hidden md:flex">
            <div className="w-full h-full overflow-hidden">
              <motion.div
                className="flex flex-col"
                animate={{ y: ["5%", "-100%"] }}
                transition={{
                  duration: 60,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {[...images, ...images].map((img, i) => (
                  <Image
                    key={`left-${i}`}
                    src={img}
                    alt={`scroll-img-left-${i}`}
                    className="w-full h-[150px] object-cover"
                    width={150}
                    height={150}
                  />
                ))}
              </motion.div>
            </div>
            <div className="w-full h-full overflow-hidden">
              <motion.div
                className="flex flex-col"
                animate={{ y: ["0%", "-100%"] }}
                transition={{
                  duration: 60,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {[...images, ...images].map((img, i) => (
                  <Image
                    key={`right-${i}`}
                    src={img}
                    alt={`scroll-img-right-${i}`}
                    className="w-full h-[150px] object-cover"
                    width={150}
                    height={150}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div> */}
      </div>
    </motion.div>
  );
};

export default Page;
 -->