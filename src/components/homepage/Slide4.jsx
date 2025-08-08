'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const image = [
  {
    id: "01",
    title: "Manufacture and sale of PE and PP products",
    text: "We manufacture and sell polyethylene (PE) and polypropylene (PP) products, and are also working on developing environmentally friendly products using biomass materials.",
    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5a7b0d59-d492-41b6-b281-e8de1d6f27f0.png"
  },
  {
    id: "02",
    title: "Manufacturing and sales of custom-made plastic bags",
    text: "We offer original plastic bags that can be customized in size, color, material, design, and printing to suit your needs and purposes.",
    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e103c33f-594c-41f8-94eb-0533e98c610a.png"
  }
];

const Slide4 = ({ slideRefs }) => {
  const t = useTranslations('Home');

  return (
    <div
      ref={slideRefs.current[3]}
      className="w-[100vw] h-screen flex items-center justify-center bg-cover bg-center bg-slate-200 gap-20 snap-start"
    >
      <div className="min-h-screen bg-[#f1f5fb] flex justify-center px-4 py-8">
        <main className="max-w-[1200px] mt-10 w-full flex flex-col md:flex-row bg-[#f6f9fe] border-x border-[#298b85]">

          {/* Sidebar */}
          <aside className="relative text-white font-montserrat md:clip-path-custom px-8 py-8 md:w-1/3 border-[#298b85] bg-[#f6f9fe] z-50">
            <h1 className="text-[4rem] text-[#148b85] md:text-[5.6rem] font-orbitron font-medium leading-none tracking-tight">BUSINESS</h1>
            <p className="text-[#158b83] pe-6 text-4xl mt-8 max-w-xs leading-relaxed">
              We have a thorough understanding of materials and their properties, and deliver highly versatile products.
            </p>
            <p className="text-zinc-600 text-lg text-center mt-4 max-w-xs leading-snug font-normal">
              Yuitec specializes in the manufacture and sale of polyethylene (PE) and polypropylene (PP) products. With a thorough understanding of the materials and a focus on highly versatile products.
            </p>
          </aside>

          {/* Animated Cards with overlap and reveal */}
          <div className="relative flex flex-row flex-grow overflow-hidden md:overflow-visible border-x border-[#298b85]">
            {image.map(({ id, title, text, image }) => (
              <section
                key={id}
                className={`flex flex-col border-t md:border-t-0 md:border-l border-[#298b85] py-8 md:w-1/2`}>
                <div className="relative px-6 pl-6 bg-white">
                  {/* Custom vertical border */}
                  <div className="absolute left-0 top-0 h-20 w-3 bg-[#148b85]"></div>

                  <div className="mb-4">
                    <div className="text-[2.75rem] md:text-[4.4rem] font-orbitron font-medium text-[#148b85] leading-none">{id}</div>
                    <div className="flex items-center text-sm font-semibold text-[#148b85]">
                      <span className="text-lg mr-2">▮</span> business
                    </div>
                  </div>

                  <h2 className="text-[#148b85] px-4 text-lg md:text-4xl mb-4 font-montserrat">{title}</h2>
                  <p className="text-[#2a2116] font-normal mb-6 py-10 px-4 text-xl">{text}</p>
                  <div className='flex w-full justify-center'>
                    <img
                      src={image}
                      alt={title}
                      onError={(e) => (e.target.style.display = 'none')}
                      className="rounded-xl shadow-md w-[85%] h-50 mt-auto"
                    />
                  </div>
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Slide4;
