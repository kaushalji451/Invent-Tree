"use client";
import cn from "../utils/cn";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "motion/react";
import { SlArrowRight } from "react-icons/sl";
import { FaMessage } from "react-icons/fa6";
import Link from "next/link";

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

const Navbar = ({ className }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "bg-persian-green-700 absolute flex h-24 w-full items-center justify-between",
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
        logo
      </div>
      <div className="p-4 text-lg font-semibold text-black dark:text-white z-50">
        <RxHamburgerMenu
          onClick={async () => {
            setOpen(!open);
          }}
        ></RxHamburgerMenu>
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
            {/* <div className="absolute right-0 flex h-12 w-12 items-center justify-between p-4">
              <IoClose onClick={() => setOpen(!open)}></IoClose>
            </div> */}
            <div className=" flex w-screen flex-col items-center justify-start border border-black">
              <div className="flex h-24 w-24 items-center justify-center border border-blue-950 p-4">
                logo
              </div>
              <div className="mt-14 flex w-full flex-col items-start justify-center gap-y-4 p-4">
                {navItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex w-full cursor-pointer items-center justify-between p-2 font-semibold text-neutral-700 transition-transform duration-200 hover:scale-101"
                  >
                    {item.title}
                    <SlArrowRight className="ml-2 inline" />
                  </div>
                ))}
              </div>
              <div>
                <Link href={"#"} className="mt-2 flex w-full cursor-pointer items-center justify-center gap-x-4 p-2 text-neutral-700 transition-transform duration-200 hover:scale-101">
                  <FaMessage className="text-persian-green-700"></FaMessage>{" "}
                  <p className="font-medium">Contact Us By Email</p>
                </Link>
                <Link href={"#"} className="mt-4 flex w-full flex-col items-center justify-center p-2 text-2xl font-medium text-neutral-700 transition-transform duration-200 hover:scale-101">
                  <p className="text-persian-green-600">
                    TEL <span className="text-neutral-700">99999999999</span>
                  </p>
                  <p className="text-sm">Reception Hour:Weekdays 8:30-17:30</p>
                </Link>
                <div className="mt-2 flex w-full items-center justify-center p-2 font-semibold text-neutral-700 transition-transform duration-200 hover:scale-101">
                  ©2024 Yuitech
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
