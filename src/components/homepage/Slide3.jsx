import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Your images
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

// Helper: insert 3 text boxes randomly in array
const insertTextBoxes = (arr) => {
  // const words = ['Solve', 'Enhance', 'Accelerate'];
  const newArr = [...arr];

  // words.forEach((word) => {
  //   const pos = Math.floor(Math.random() * newArr.length);
  //   newArr.splice(pos, 0, { type: 'text', value: word });
  // });

  return newArr;
};

const Slide3 = () => {
  const t = useTranslations('Home');

  // Left + Right data with text boxes
  const leftColumnData = insertTextBoxes(images);
  const rightColumnData = insertTextBoxes(images);

  return (
    <div className="flex items-center justify-between bg-cover bg-center h-full bg-zinc-100 dark:bg-[#1f1f1f]">
      
      {/* Center content - only visible on desktop */}
      <div className="hidden md:flex w-full h-full justify-center items-center">
        <img src="/Illustration-7.png" alt="Illustration" />
      </div>

      {/* Side scrolling columns */}
      <div className="w-full md:w-1/2 h-full flex">
        
        {/* Left column scroll */}
        <div className="w-1/2 h-full overflow-hidden">
          <motion.div
            className="flex flex-col"
            animate={{ y: ['5%', '-100%'] }}
            transition={{
              duration: 60,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {[...leftColumnData, ...leftColumnData].map((item, i) =>
              typeof item === 'string' ? (
                <Image
                  key={`left-img-${i}`}
                  src={item}
                  alt={`scroll-img-left-${i}`}
                  className="w-full h-[120px] md:h-[150px] object-cover"
                  width={150}
                  height={150}
                />
              ) : (
                <div
                  key={`left-text-${i}`}
                  className="w-full h-[120px] md:h-[150px] flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-2xl font-bold"
                >
                  {item.value}
                </div>
              )
            )}
          </motion.div>
        </div>

        {/* Right column scroll */}
        <div className="w-1/2 h-full overflow-hidden">
          <motion.div
            className="flex flex-col"
            animate={{ y: ['0%', '-100%'] }}
            transition={{
              duration: 60,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {[...rightColumnData, ...rightColumnData].map((item, i) =>
              typeof item === 'string' ? (
                <Image
                  key={`right-img-${i}`}
                  src={item}
                  alt={`scroll-img-right-${i}`}
                  className="w-full h-[120px] md:h-[150px] object-cover"
                  width={150}
                  height={150}
                />
              ) : (
                <div
                  key={`right-text-${i}`}
                  className="w-full h-[120px] md:h-[150px] flex items-center justify-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-2xl font-bold"
                >
                  {item.value}
                </div>
              )
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide3;
