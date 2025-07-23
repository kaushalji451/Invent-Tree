import React from 'react';
import { FaLeaf } from 'react-icons/fa';
import Image from 'next/image';
 import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');
  return (
    <footer className="bg-teal-600 text-white py-10">
      <div className="container mx-auto px-4 text-center">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          <Image
            width={150}
            height={100}

            src="https://res.cloudinary.com/dpbpu5b0v/image/upload/v1752566569/Screenshot_2025-07-15_132958_ecqubp.png" alt="Yuitech Logo" className="h-20" />
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-xs">
          <a href="#">{t('link1')}</a>
          <a href="#">{t('link2')}</a>
          <a href="#">{t('link3')}</a>
          <a href="#">{t('link4')}</a>
          <a href="#">{t('link5')}</a>
          <a href="#">{t('link6')}</a>
          <a href="#">{t('link7')}</a>
          <a href="#">{t('link8')}</a>
        </div>

        {/* Bottom Copyright */}
        <div className="text-sm flex flex-col sm:flex-row justify-center items-center gap-2">
          <p>{t('©2025')}</p>
          <p className="text-gray-300">
            {t('PRODUCEDBY')} <span className="ml-1 font-medium">{t('Leapy')}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
