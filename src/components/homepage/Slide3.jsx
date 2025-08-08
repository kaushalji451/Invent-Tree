import React from 'react'
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
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


const Slide3 = ({slideRefs}) => {
      const t = useTranslations('Home');
    
      return (
        <div ref={slideRefs.current[2]} className="w-[100vw] h-screen flex items-center justify-between bg-cover bg-center bg-slate-200 snap-start"
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
        </div>
    )
}

export default Slide3
