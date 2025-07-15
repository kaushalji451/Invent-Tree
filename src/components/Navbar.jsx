"use client";
import cn from "../utils/cn";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SlArrowRight } from "react-icons/sl";
import { FaMessage } from "react-icons/fa6";
import Link from "next/link";
import { MenuButton } from "./menuButton";
import { ModeToggle } from "../components/toggle-button";
import ServicePost from "../app/service/ServicePost";  // Importing the ServicePost component
const navItems = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Services", href: "/service" },
  { title: "Case Study", href: "/caseStudy" },
  { title: "Blog", href: "/blogs" },
  { title: "Projects", href: "/projects" },
];



const Navbar = ({ className }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-50 flex h-24 w-full items-center justify-between px-4 md:px-6",
        className,
      )}
    >
      <img
        src="https://www.yuitech.jp/wp/wp-content/themes/standard_sass/images/common/logo-bg.svg"
        className="absolute top-0 left-0"
        alt=""
      />
      <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-semibold dark:bg-black dark:text-white"></div>

      <div className="z-50 flex cursor-pointer items-center justify-center gap-x-3 p-2 text-2xl text-black dark:text-white">
        <ModeToggle className={""} />
        <MenuButton
          isOpen={open}
          onClick={() => setOpen(!open)}
          strokeWidth="4"
          color="#3399cc"
          transition={{ ease: "easeOut", duration: 0.2 }}
          width="64"
          height="24"
          className="h-[24] max-sm:w-[34]"
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="bg-persian-green-100 dark:bg-persian-green-950 absolute top-0 left-0 flex h-screen w-full flex-col items-start justify-center text-black dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-28 flex w-screen flex-col items-center justify-center px-4 md:mx-auto md:max-w-7xl">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-sm font-semibold dark:bg-black dark:text-white">
                logo
              </div>

              <div className="mt-12 flex w-full flex-col items-start justify-center gap-y-3 p-4 md:flex-row md:items-center md:justify-center md:gap-x-6">
                {navItems.map((item) => (
                  <Link
                    href={item.href}
                    key={item.title}
                    onClick={() => setOpen(false)}
                    className="hover:text-persian-green-600 flex w-full cursor-pointer items-center justify-between p-2 text-2xl font-semibold text-neutral-700 transition-all duration-200 hover:scale-105 md:w-auto md:justify-center md:text-xl dark:text-neutral-100"
                  >
                    {item.title}
                    <SlArrowRight className="ml-2 inline md:hidden" />
                  </Link>
                ))}
              </div>

                <div className="mt-12 flex w-full flex-col items-start justify-center gap-y-3 p-4 md:flex-row md:items-center md:justify-center md:gap-x-6">
               <ServicePost/>
              </div>


              {/* */}
              <div className="mt-8 flex flex-col items-center justify-center gap-y-6 px-4 md:mt-10 md:flex-row md:gap-x-20">
                <Link
                  href="/contact"
                  className="flex items-center justify-start gap-x-3 text-base font-medium text-neutral-700 transition-transform duration-200 hover:scale-105"
                  onClick={() => setOpen(false)}
                >
                  <FaMessage className="text-persian-green-700 dark:text-persian-green-100 text-xl" />
                  <span className="text-persian-green-700 dark:text-persian-green-100 text-xl md:text-2xl">
                    Contact Us By Email
                  </span>
                </Link>

                <Link
                  href="#"
                  className="flex flex-col items-center justify-center p-2 text-base font-medium text-neutral-700 transition-transform duration-200 hover:scale-105 md:items-start md:text-lg"
                >
                  <p className="text-persian-green-600 dark:text-persian-green-100 flex items-center gap-x-2 text-xl font-semibold md:text-4xl">
                    TEL{" "}
                    <span className="text-neutral-700 md:text-4xl dark:text-neutral-100">
                      99999999999
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-neutral-900 dark:text-neutral-100">
                    Reception Hour: Weekdays 8:30–17:30
                  </p>
                </Link>
              </div>

              <div className="mt-6 w-full p-2 text-center text-sm font-semibold text-neutral-700">
                ©2024 Yuitech
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
