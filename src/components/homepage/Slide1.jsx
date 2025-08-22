import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import RoatedSVG from "../../components/RoatedSVG";

const Slide1 = () => {
  const t = useTranslations('Home');

  return (
    <div className="flex max-md:flex-col items-center justify-center max-sm:mt-5 max-sm:text-center h-full min-md:gap-10 min-md:px-20">
      {/* Left Section */}
      <div className="flex flex-col items-center min-md:ps-20 max-sm:px-5 gap-5 min-md:h-1/2">
        <h1 className="w-2/3 max-sm:w-full text-2xl min-md:text-center text-[#604e84]  max-md:mt-10">
          {t('slide1title')}
        </h1>
        <p className="text-[#273c89]  border-t w-[120px] text-center mb-4">
          {t('slide1msg')}
        </p>
      </div>

      {/* Center Section */}
      <div className="max-w-xl max-sm:mb-10">
        <p className="pb-10 max-md:px-5 min-md:text-center text-lg text-[#263238] dark:text-[#dae7ef] leading-relaxed">
          {t('slide1description')}
        </p>
        <div className="max-md:flex max-md:justify-center">
          <Link
            href="/about"
            className="rounded-md border max-sm:text-center bg-slate-100 border-slate-300 shadow-xl w-50 px-6 py-3 hover:bg-[#263238]  hover:text-white transition duration-300 dark:bg-slate-400 dark:text-white"
          >
            {t('slide1CTA')}
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="max-sm:hidden">
        <RoatedSVG />
      </div>
    </div>
  );
};

export default Slide1;
