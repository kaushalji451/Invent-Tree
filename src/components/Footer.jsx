import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');
  return (
    <footer className="bg-teal-600 dark:bg-teal-700 text-white py-10 transition-colors duration-500">
      <div className="container mx-auto px-4 text-center">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          <Image
            width={150}
            height={100}
            src="https://res.cloudinary.com/dpbpu5b0v/image/upload/v1752566569/Screenshot_2025-07-15_132958_ecqubp.png"
            alt="Invent-Tree Logo"
            className="h-20"
            priority
          />
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-xs font-medium">
          {[1,2,3,4,5,6,7,8].map((num) => (
            <a
              key={num}
              href="#"
              className="text-white hover:text-teal-300 dark:hover:text-teal-400 transition-colors duration-300"
              aria-label={t(`link${num}`)}
            >
              {t(`link${num}`)}
            </a>
          ))}
        </div>

        {/* Bottom Copyright */}
        <div className="text-sm flex flex-col sm:flex-row justify-center items-center gap-2 text-white/80">
          <p>{t('©2025')}</p>
          <p>
            {t('PRODUCEDBY')}{' '}
            <span className="ml-1 font-semibold text-white">{t('Leapy')}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
