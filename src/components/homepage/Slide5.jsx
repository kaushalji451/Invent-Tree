import React from 'react';
import RoatedSVG from '../RoatedSVG';

const news = [
  {
    date: "2025.04.27",
    tag: "others",
    title: "Golden Week holiday notice",
    description:
      "We will be closed during the Golden Week holidays from Saturday, May 3, 2025 to Tuesday, May 6, 2025. We will resume normal business hours from...",
  },
  {
    date: "2024.12.22",
    tag: "others",
    title: "Notice of New Year's holiday closure",
    description:
      "We will be closed for the New Year holidays during the following period: Saturday, December 28, 2024 - Sunday, January 5, 2025. We will resume...",
  },
];

import { useTranslations } from 'next-intl';

const Slide5 = ({ slideRefs }) => {
  const t = useTranslations('Home');
  return (
    <div
      ref={slideRefs.current[4]}
      className="w-[100vw] h-screen flex items-center bg-cover bg-center bg-slate-200 gap-8 lg:gap-20 snap-start"
    >
      <div className="flex flex-col lg:flex-row min-h-screen w-full text-[#222] bg-white font-sans text-sm">
        {/* Left Section - NEWS */}
        <aside
          className="relative
           w-full lg:w-1/2
           flex-1.1
           bg-[#f4f7ff] py-8 lg:py-12 px-5 sm:px-10 lg:px-14 "
        >
          <div className="mx-0 sm:mx-5 lg:mx-20 mt-0 sm:mt-5 lg:mt-30 ">
            {/* Header */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 lg:mb-10">
              <h1 className="text-4xl sm:text-5xl  max-md:text-center max-md:pt-40 text-[#13837d] tracking-wide">
                ANNOUNCEMENT
              </h1>
            </div>

            <hr className="border-t border-[#c1c7d0]/40 mb-6 lg:mb-8" />

            <div className="relative z-10 space-y-4 lg:space-y-6">
              {/* News Items */}
              {news.map((item, i) => (
                <article
                  key={i}
                  className="border-b border-[#c1c7d0] pb-4 lg:pb-6 hover:opacity-80"
                >
                  <div className="flex flex-wrap items-baseline text-xs font-bold text-[#6d6d6d] mb-1">
                    <time>{item.date}</time>
                    <span className="ml-2 lg:ml-3 bg-[#13837d] text-white px-2 py-1 text-[10px] rounded uppercase font-bold">{item.tag}</span>
                  </div>
                  <h2 className="text-[#13837d] py-1 lg:py-2 text-base lg:text-lg cursor-pointer font-semibold">
                    {item.title}
                  </h2>
                  <p className="text-sm text-[#3e3e3e] line-clamp-3 max-w-full lg:max-w-[90%]">{item.description}</p>
                </article>
              ))}
            </div>

          </div>
        </aside>

        {/* Right Section - Contact */}
        <main
          className="
            w-full lg:w-1/2
            flex flex-col justify-start
            min-md:mt-8 lg:mt-30
            px-5 sm:px-8 lg:px-12 xl:px-18 min-md:py-8 max-md:pb-10 lg:py-14 flex-0.9
            
          "
        >
          {/* Logo */}
          <div className="self-center mb-8 lg:mb-12 w-full max-w-[170px] drop-shadow-sm">
            <p className="text-center font-bold text-3xl lg:text-6xl">Yuitech</p>
          </div>

          {/* Contact Info */}
          <section className="flex flex-col md:flex-row items-center justify-between bg-[#f6f9ff] rounded-xl p-4 lg:p-3 mb-6 lg:mb-12 gap-2">
            <div className="flex items-center font-semibold text-lg py-1 text-[#222]">
              <svg className="w-[22px] h-[22px] mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#13837d" d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2 .4l7.5 4.5a.5.5 0 00.5 0L20 6.4V6H4v.4z" />
              </svg>
              <p className="text-base lg:text-xl">Contact us by email</p>
            </div>
            <div className="text-xl lg:text-3xl">
              <p className="py-2"><span className="text-[#13837d] font-semibold">TEL</span> 058-322-3322</p>
              <small className="text-xs text-[#4a4a4a] -mt-1 block font-medium">
                Reception hours: Weekdays 8:30-17:30
              </small>
            </div>
          </section>

          {/* Company Info */}
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 mb-8 text-sm">
            <div className="w-20 h-20 lg:w-30 lg:h-30 rounded-full p-1 flex justify-center items-center mb-4 sm:mb-0 max-md:hidden">
              <RoatedSVG />
            </div>
            <div>
              <address className="not-italic leading-snug border-b pb-3 lg:pb-5">
                <p className="py-1">Yuitec Co., Ltd.</p>
                <p className="py-1">2-43-2 Takaya Iseda, Kitakata-cho, Motosu-gun, 501-0455</p>
                <p>
                  TEL.058-322-3322 &nbsp; FAX: 058-322-3321
                </p>
              </address>
              {/* Bottom Nav */}
              <nav className="flex flex-wrap gap-x-6 gap-y-3 lg:gap-x-8 lg:gap-y-4 text-xs lg:text-sm mb-6 lg:mb-20 max-w-[500px] mt-4 lg:mt-5">
                {[
                  "For corporations",
                  "Business content",
                  "Company Profile",
                  "what's new",
                  "Privacy Policy",
                ].map((link, idx) => (
                  <a key={idx} href="#" className="text-[#222] font-medium hover:underline">
                    {link}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Slide5;


//  <footer className="text-center text-[10px] text-[#767676] bg-[#eaf0ff] py-3 font-semibold">
//       <a href="#" className="text-[#13837d] font-bold mx-1">PRIVACY POLICY</a> ©2024 Yuitech
//       <span className="opacity-40 font-normal"> PRODUCED BY</span>
//       <a
//         href="#"
//         className="text-[#b1b1b1] font-semibold mx-1 pointer-events-none select-none"
//       >
//         Leapy
//       </a>
//     </footer>
