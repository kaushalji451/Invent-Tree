"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Loading from "../../../components/loading";
import CreateBlogPage from "./PostBlog";
import Footer from "../../../components/Footer";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import EditBlog from "./EditBlog";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      type: "spring",
    },
  }),
};

const Page = () => {
  const t = useTranslations("BlogPage");
  const locale = useLocale(); // Get current locale: 'en' or 'hi'
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const session = useSession();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get("/api/blog");
        setData(response.data.message);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, []);

  const handleDeleteBlog = async (id) => {
    try {
      const response = await fetch(`/api/blog?id=${id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        alert(t("deleteSuccess") || "Blog deleted successfully");
        setData(data.filter((item) => item._id !== id));
      } else {
        const errorData = await response.json();
        console.error(errorData);
        alert(t("deleteFailure") || "Failed to delete blog");
      }
    } catch (error) {
      console.error(error);
      alert(t("deleteFailure") || "Failed to delete blog");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl bg-white dark:bg-gray-900 transition-colors duration-500">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen max-md:mt-20 bg-gray-50 dark:bg-gray-900 dark:text-neutral-300 transition-colors duration-500 px-4 py-10">
        <div>
          <h1 className="mb-10 text-center text-4xl font-bold text-[#08807a] dark:text-teal-400 transition-colors duration-500">
            {t("heading")}
          </h1>
          <div className="w-full flex justify-end mb-6">
            {session?.status === "authenticated" && (
              <div className="w-2/4 ms-5 flex justify-center">
                <CreateBlogPage />
              </div>
            )}
          </div>
        </div>

        <div className="mx-auto max-w-4xl space-y-6">
          {data.map((item, i) => (
            <motion.div
              key={item._id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="flex flex-col gap-4 overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-4 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 md:flex-row"
            >
              {item.image && (
                <Image
                  width={200}
                  height={200}
                  loading="lazy"
                  src={item.image}
                  alt={item.title?.[locale] || item.slug}
                  className="h-40 w-full rounded-xl object-cover md:w-52"
                />
              )}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h2 className="line-clamp-2 text-xl font-semibold text-gray-800 dark:text-gray-100 md:text-2xl transition-colors duration-300">
                    {item.title?.[locale] || item.slug}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                    {item.content?.[locale]?.slice(0, 150) || t("noDescription")}
                  </p>
                </div>
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                  {t("category")}:{" "}
                  <span className="font-medium">
                    {item.category?.[locale] || t("uncategorized")}
                  </span>
                </div>
              </div>
              {session?.status === "authenticated" && (
                <div className="flex h-12 gap-2 items-center">
                  <EditBlog initialData={item} />
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-colors duration-300"
                    onClick={() => handleDeleteBlog(item._id)}
                    aria-label={t("delete")}
                  >
                    {t("delete")}
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
