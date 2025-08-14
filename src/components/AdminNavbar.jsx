// Note Uncomment the commented part to view the full working code 

"use client";
import cn from "../utils/cn";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SlArrowRight } from "react-icons/sl";
import Link from "next/link";
import { MenuButton } from "./menuButton";
import { ModeToggle } from "../components/toggle-button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import LanguageToggle from "../components/language-toglebutton";
import { IoIosMail } from "react-icons/io";

const AdminNavbar = ({ className }) => {

  const t = useTranslations('Navbar');

  const [open, setOpen] = useState(false);
  const session = useSession();
  const AdminNavitems = [
    { title: t('Homebtn'), href: "/" },
    { title: t('Aboutbtn'), href: "/" },
    { title: t('Servicesbtn'), href: "/service" },
    { title: t('Projectsbtn'), href: "/projects" },
    { title: t('Blogbtn'), href: "/blog" },
    { title: t('AdminDashboardbtn'), href: "/admin/dashboard" },
    { title: t('ContactUsbtn'), href: "/contact" },
  ];

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-60 flex h-24 w-full  items-center justify-between px-4 md:px-6",
        className,
      )}
    >
      <Image
        width={250}
        height={250}
        src="https://www.yuitech.jp/wp/wp-content/themes/standard_sass/images/common/logo-bg.svg"
        className="absolute top-0 left-0 max-sm:w-40  "
        alt=""
      />
      <Link href={"/"} className="z-10 flex ps-4 ">
        <p className="text-3xl max-sm:text-xl max-sm:-mt-6 text-white font-semibold">YUITECH</p>
      </Link>

      <div className="z-50 flex cursor-pointer items-center justify-center gap-x-3 p-2 text-2xl text-black dark:text-white">
        <LanguageToggle/>
        <ModeToggle className={""} />
        {/* <MenuButton
          isOpen={open}
          onClick={() => setOpen(!open)}
          strokeWidth="4"
          color="#3399cc"
          transition={{ ease: "easeOut", duration: 0.2 }}
          width="64"
          height="24"
          className="h-[24] max-sm:w-[34]"
        /> */}
      </div>

      {/* --- MENU OVERLAY COMMENTED OUT --- */}
      {/*
      <AnimatePresence>
        {open && (
          <motion.div
            className="bg-persian-green-100 dark:bg-persian-green-950  absolute top-0 left-0 flex h-screen w-full flex-col items-start justify-center text-black dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-28 flex w-screen flex-col items-center justify-center px-4 md:mx-auto md:max-w-7xl">
              <div className="flex  dark:bg-persian-green-950 dark:text-white">
                <Image
                  width={200}
                  height={200}
                  src="https://res.cloudinary.com/dpbpu5b0v/image/upload/v1753074925/ogp-removebg-preview_ghmjsh.png"
                  alt=""
                  className="h-40 w-70"
                />
              </div>
              <div className="mt-12 flex w-full flex-col items-start justify-center gap-y-3 p-4 md:flex-row md:items-center md:justify-center md:gap-x-6">
                {AdminNavitems.map((item) => (
                  <Link
                    href={item.href}
                    key={item.title}
                    onClick={() => setOpen(false)}
                    className="hover:text-persian-green-600 flex w-full cursor-pointer items-center justify-between p-2 text-2xl text-neutral-700 transition-all duration-200 hover:scale-105 md:w-auto md:justify-center md:text-xl dark:text-neutral-100"
                  >
                    {item.title}
                    <SlArrowRight className="ml-2 inline md:hidden" />
                  </Link>
                ))}
              </div>
              
              <section className="flex flex-col md:flex-row items-center justify-between bg-[#f6f9ff] rounded-xl p-4 lg:p-3 mb-6 lg:mb-12 gap-2">
                <div className="flex items-center font-semibold text-lg py-1 text-[#222]">
                  <svg className="w-[22px] h-[22px] mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#13837d" d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2 .4l7.5 4.5a.5.5 0 00.5 0L20 6.4V6H4v.4z" />
                  </svg>
                  <Link href={"/contact"} className="text-base lg:text-xl">Contact us by email</Link>
                </div>
                <div className="text-xl lg:text-3xl">
                  <p className="py-2"><span className="text-[#13837d] font-semibold">TEL</span> 058-322-3322</p>
                  <small className="text-xs text-[#4a4a4a] -mt-1 block font-medium">
                    Reception hours: Weekdays 8:30-17:30
                  </small>
                </div>
              </section>

              <div className="mt-8 w-full flex flex-col items-center justify-center gap-y-6 px-4 md:mt-10 md:flex-row md:gap-x-20">
                {session.status === "authenticated" ? (
                  <div className="flex items-center justify-center gap-x-4">
                    <Link href={"/admin/signup"}
                      className="bg-persian-green-200 dark:bg-persian-green-800 dark:hover:bg-persian-green-900 hover:bg-persian-green-300 cursor-pointer rounded-full px-6 py-2 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 dark:text-white"
                    >
                      {t('AddnewAdmin')}
                    </Link>
                    <button
                      className="bg-persian-green-200 dark:bg-persian-green-800 dark:hover:bg-persian-green-900 hover:bg-persian-green-300 cursor-pointer rounded-full px-6 py-2 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 dark:text-white"
                      onClick={() => {
                        signOut();
                      }}
                    >
                      {t('Logout')}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-x-4">
                    <Link href={"/admin/login"}
                      onClick={() => setOpen(false)}
                      className="bg-persian-green-200 dark:bg-persian-green-800 dark:hover:bg-persian-green-900 hover:bg-persian-green-300 cursor-pointer rounded-full px-6 py-2 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 dark:text-white"
                    >
                      {t('Login')}
                    </Link>
                  </div>
                )}
              </div>

              <div className="mt-6 w-full p-2 text-center text-sm font-semibold text-neutral-700 dark:text-neutral-400">
                {t('©2025')}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      */}
    </div>
  );
};

export default AdminNavbar;
