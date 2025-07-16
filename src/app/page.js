'use client'; // If you're using Next.js App Router

import React from 'react';
import { motion } from 'framer-motion';

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
const page = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dpbpu5b0v/image/upload/v1752593870/Screenshot_2025-07-15_210659_xpsbuf.png')",
        }}
        className="w-full h-[100vh] flex items-center justify-center bg-cover bg-center bg-slate-200 gap-20"
      >
        <div className="flex flex-col items-center gap-5 h-1/2">
          <h1 className="text-5xl text-[#20998e]">Political Consultancy Services</h1>
          <p className="text-[#20998e] border-t w-[120px] text-center">Message</p>
        </div>
        <div className="max-w-xl">
          <p className="pb-10 text-sm text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, libero saepe doloribus, nemo esse omnis quo ad aliquam enim culpa ex voluptas officiis accusamus laudantium veritatis quae excepturi magnam repudiandae.
            <br />
            <br />
            Atque soluta modi facilis hic vitae, est tempora nisi porro, perspiciatis, a voluptatibus.
            <br />
            <br />
            Quod ab aperiam, accusantium soluta totam laudantium odio exercitationem nemo non earum laboriosam omnis ipsa esse nostrum.
          </p>

          <button className="rounded-md border border-slate-300 shadow-xl px-6 py-3">
            MORE
          </button>
        </div>
      </div>
      {/* second page */}
      <div style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dpbpu5b0v/image/upload/v1752595832/Screenshot_2025-07-15_213828_t4jgvw.png')",
      }}
        className="w-full h-[100vh] flex items-center bg-cover bg-center bg-slate-200 gap-20"
      >
        <p className='w-1/2 text-white text-xl px-10'>Our firm is dedicated to empowering political candidates, parties, and organizations with strategic, data-driven, and innovative solutions to achieve electoral success and effective governance. Below is a detailed catalogue of our services, each designed to address the multifaceted challenges of modern political campaigns. These offerings are informed by industry best practices and tailored to navigate the complexities of diverse political landscapes.</p>
      </div>


      {/* // next section */}
      <div style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dpbpu5b0v/image/upload/v1752598504/Screenshot_2025-07-15_222532_ftsh87.png')",
      }}
        className="w-full h-[100vh] flex items-center bg-cover bg-center justify-center bg-slate-200 gap-20">
        <div className="flex flex-col items-center gap-5 w-1/2  justify-center ">
          <h1 className="text-5xl  bg-gradient-to-b from-blue-50 to-blue-200 py-2 ">
            Website/App Development & Upkeep
          </h1>

          <ul className="text-[#20998e] w-1/2 overflow-auto  text-center">
            <li>●	Custom Website Design: Tailored to reflect your campaign’s branding, with intuitive navigation and responsive design for all devices .</li>
            <li>●	Mobile App Development: Features like push notifications, event updates, and seamless donation processing enhance supporter interaction .</li>
            <li>●	Content Management: Easy-to-use systems for updating content and managing multimedia without technical expertise .</li>
          </ul>

          <button className="rounded-md border border-slate-300 shadow-xl px-6 py-3">
            LEARN MORE
          </button>
        </div>
      </div>

      {/* next section */}
      <div style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dpbpu5b0v/image/upload/v1752599877/Screenshot_2025-07-15_224833_mgl78h.png')",
      }}
        className="w-full h-[100vh] flex items-center bg-cover bg-center justify-between bg-slate-200 gap-20 ">
        <div className='w-full flex justify-center items-center h-[100vh]'>
          <div className='flex flex-col items-center gap-5'>
            <img
              src="https://res.cloudinary.com/dpbpu5b0v/image/upload/v1752599604/Screenshot_2025-07-15_224405_ku0qio.png"
              alt=""
            />
            <h1 className='font-bold text-3xl text-[#20998e]'>End-to-End Campaign Management</h1>
            <p className='text-2xl'>Strategic Planning</p>
          </div>
        </div>
        <div
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dpbpu5b0v/image/upload/v1752599877/Screenshot_2025-07-15_224833_mgl78h.png')",
          }}
          className="w-1/3 h-[100vh] flex items-center bg-cover bg-center justify-end "
        >
          {/* Left Content */}
          <div className="w-full h-[100vh] overflow-hidden">
            <motion.div
              className="flex flex-col "
              animate={{ y: ['10%', '-100%'] }}
              transition={{
                duration: 60,
                ease: 'linear',
                repeat: Infinity,
              }}
            >
              {[...images, ...images].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`scroll-img-${i}`}
                  className="w-full h-[150px] object-cover"
                />
              ))}
            </motion.div>
          </div>
          {/* Right Auto-Scroll Area */}
          <div className="w-full h-[100vh] overflow-hidden">
            <motion.div
              className="flex flex-col"
              animate={{ y: ['0%', '-100%'] }}
              transition={{
                duration: 60,
                ease: 'linear',
                repeat: Infinity,
              }}
            >
              {[...images, ...images].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`scroll-img-${i}`}
                  className="w-full h-[150px] object-cover"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default page