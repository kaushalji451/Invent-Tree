import React from 'react';
import RoatedSVG from '../RoatedSVG';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const Slide5 = () => {
  const t = useTranslations('Home');

  const news = [
    {
      date: "2025.04.27",
      tag: t('slide5.news.0.tag'),
      title: t('slide5.news.0.title'),
      description: t('slide5.news.0.description'),
    },
    {
      date: "2024.12.22",
      tag: t('slide5.news.1.tag'),
      title: t('slide5.news.1.title'),
      description: t('slide5.news.1.description'),
    },
  ];

  const footerLinks = [
    t('slide5.footerLinks.0'),
    t('slide5.footerLinks.1'),
    t('slide5.footerLinks.2'),
    t('slide5.footerLinks.3'),
    t('slide5.footerLinks.4'),
  ];

  return (
    <div>
     <div className="flex flex-col lg:flex-row min-h-screen h-full w-full font-sans text-sm bg-white text-[#222] dark:bg-[#2e2d2d] dark:text-white">
        
  {/* Left Section - NEWS */}
  <aside className="relative w-full lg:w-1/2 flex-1.1 bg-[#f4f7ff] dark:bg-[#1f1f1f] py-8 lg:py-12 px-5 sm:px-10 lg:px-14">
    <div className="mx-0 sm:mx-5 lg:mx-20 mt-0 sm:mt-5 lg:mt-30">
      <div className="relative z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 lg:mb-10">
        <h1 className="text-4xl sm:text-5xl max-md:text-center max-md:pt-10 text-[#604e84] tracking-wide">
          {t('slide5.announcement')}
        </h1>
      </div>

      <hr className="border-t border-[#c1c7d0]/40 dark:border-gray-600 mb-6 lg:mb-8" />

      <div className="relative z-10 space-y-4 lg:space-y-6">
        {news.map((item, i) => (
          <article 
            key={i} 
            className="border-b border-[#c1c7d0] pb-4 lg:pb-6 hover:opacity-80"
          >
            <div className="flex flex-wrap items-baseline text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
              <time className='dark:text-[#cbcfd3]'>{item.date}</time>
              <span className="ml-2 lg:ml-3 bg-[#8777a9]  text-white px-2 py-1 text-[10px] rounded uppercase font-bold">{item.tag}</span>
            </div>
            <h2 className="text-teal-700 dark:text-[#8777a9] py-1 lg:py-2 text-base lg:text-lg cursor-pointer font-semibold">
              {item.title}
            </h2>
            <p className="text-sm text-[#c1c7d0]line-clamp-3 max-w-full lg:max-w-[90%]">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  </aside>

  {/* Right Section - Contact */}
  <main className="w-full lg:w-1/2 flex flex-col justify-start min-md:mt-8 lg:mt-30 px-5 sm:px-8 lg:px-12 xl:px-18 min-md:py-8 max-md:pb-10 lg:py-14 flex-0.9">
    
    {/* Logo */}
    <div className="mb-8 lg:mb-12 w-full max-sm:mt-4 flex justify-center">
      <img src="/logo/Invent-Tree logo Favicon-08.png" alt="" />
    </div>

    {/* Contact Info */}
    <section className="flex flex-col md:flex-row items-center justify-between bg-[#f6f9ff] dark:bg-[#1f1f1f] rounded-xl p-4 lg:p-3 mb-6 lg:mb-12 gap-2">
      <div className="flex items-center font-semibold text-lg py-1 text-[#222] dark:text-white">
        <svg className="w-[22px] h-[22px] mr-2" viewBox="0 0 24 24" xmlns="http:www.w3.org/2000/svg">
          <path fill="#13837d" d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2 .4l7.5 4.5a.5.5 0 00.5 0L20 6.4V6H4v.4z" />
        </svg>
        <Link href={"/contact"} className="text-base lg:text-xl text-[#8777a9] dark:text-[#8777a9]">{t('slide5.contactEmail')}</Link>
      </div>
      <div className="text-xl lg:text-3xl">
        <p className="py-2 dark:text-[#cbcfd3]">
          <span className="text-[#8777a9] font-semibold">{t('slide5.telLabel')}</span> 058-322-3322
        </p>
        <small className="text-xs dark:text-[#cbcfd3] -mt-1 block font-medium">
          {t('slide5.receptionHours')}
        </small>
      </div>
    </section>

    {/* Company Info */}
    <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 mb-8 text-sm">
      <div className="w-20 h-20 lg:w-30 lg:h-30 rounded-full p-1 flex justify-center items-center mb-4 sm:mb-0 max-md:hidden">
        <RoatedSVG />
      </div>
      <div>
        <address className="not-italic leading-snug border-b dark:border-gray-600 pb-3 lg:pb-5">
          <p className="py-1 dark:text-[#cbcfd3]">{t('slide5.companyFullName')}</p>
          <p className="py-1 dark:text-[#cbcfd3]">{t('slide5.companyAddress')}</p>
          <p className="dark:text-[#cbcfd3]">{t('slide5.companyContact')}</p>
        </address>

        {/* Bottom Nav */}
        <nav className="flex flex-wrap gap-x-6 gap-y-3 lg:gap-x-8 lg:gap-y-4 text-xs lg:text-sm mb-6 lg:mb-20 max-w-[500px] mt-4 lg:mt-5">
          {footerLinks.map((link, idx) => (
            <a key={idx} href="#" className="text-[#222] dark:text-[#cbcfd3] font-medium hover:underline">
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
