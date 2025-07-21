import React from 'react';
import { FaLeaf } from 'react-icons/fa';
import Image from 'next/image';
const Footer = () => {
  return (
    <footer className="bg-teal-600 text-white py-10">
      <div className="container mx-auto px-4 text-center">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          <Image
            width={150}
            height={100}
          
          src="https://res.cloudinary.com/dpbpu5b0v/image/upload/v1752566569/Screenshot_2025-07-15_132958_ecqubp.png" alt="Yuitech Logo" className="h-20" />
          {/* <h1 className="text-3xl font-bold">Yuitech</h1> */}
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-xs">
          <a href="#">For Corporates</a>
          <a href="#">Business Overview</a>
          <a href="#">Delivery Records for Local Govts</a>
          <a href="#">SDG Initiatives</a>
          <a href="#">Company Profile</a>
          <a href="#">What's New</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Sitemap</a>
        </div>

        {/* Bottom Copyright */}
        <div className="text-sm flex flex-col sm:flex-row justify-center items-center gap-2">
          <p>©2024 Yuitech</p>
          <p className="text-gray-300">
            PRODUCED BY <span className="ml-1 font-medium">△ Leapy</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
