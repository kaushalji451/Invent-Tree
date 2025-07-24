"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EditService from "./EditService";
import ServicePost from "./ServicePost";
import Footer from "../../../components/Footer";
import Loading from "../../../components/loading";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const Page = () => {
  const t = useTranslations("ServicesPage");
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1]; // 'en' or 'hi'

  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const session = useSession();

  const servicesData = async () => {
    const data = await fetch("/api/services");
    const res = await data.json();
    return res.message;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    servicesData().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`/api/services?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setServices(services.filter((service) => service._id !== id));
      alert(t("serviceDeleteSuccess") || "Service deleted successfully");
    } else {
      alert(t("serviceDeleteFailed") || "Failed to delete service");
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
      <div className="min-h-screen bg-[#f3f7ff] dark:bg-gray-900 pb-10 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-slate-200 dark:bg-gray-800 bg-top bg-no-repeat bg-contain transition-colors duration-500"
        >
          <div
            className="min-h-[50vh] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dpbpu5b0v/image/upload/v1753085021/Screenshot_2025-07-21_133220_ywyg2s.png')",
            }}
          />
          <div className="max-w-7xl mx-auto px-6 -mt-29 pb-30 flex justify-end pe-50 text-[#08807a] dark:text-[#4fd1c5] font-bold select-none transition-colors duration-500">
            <div className="flex items-center gap-4 flex-col absolute z-50">
              <span className="text-lg py-2 px-4 border-l-4 border-[#08807a] dark:border-[#4fd1c5] font-normal relative left-3 select-text bg-white dark:bg-gray-900 rounded-md shadow-sm cursor-default transition-colors duration-500">
                {t("title")}
              </span>
              {session?.status === "authenticated" && <ServicePost />}
            </div>
          </div>
        </motion.header>

        {/* Services List */}
        {services.map((service, index) => (
          <motion.section
            key={service._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`max-w-7xl mx-auto px-6 py-10 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg transition-colors duration-500 ${
              index === 0 ? "-mt-12 relative z-10" : "mt-10"
            }`}
          >
            <div className="flex justify-between items-center mb-6 max-md:flex-col max-md:gap-5">
              <h2 className="flex items-start text-4xl text-[#08807a] dark:text-[#4fd1c5] font-light transition-colors duration-500">
                <span className="border-l-4 border-[#08807a] dark:border-[#4fd1c5] pl-2">
                  {t("serviceLabel")} {index + 1}
                </span>
                <span className="ml-4 text-lg font-normal">
                  {service.title[currentLocale] || service.title["en"]}
                </span>
                <span className="inline-block ml-2 text-sm text-[#08807a] dark:text-[#4fd1c5]">
                  »
                </span>
              </h2>
              {session?.status === "authenticated" && (
                <div className="flex justify-center max-md:justify-end gap-2 items-center max-md:w-full max-md:pe-5">
                  <EditService id={service._id} initialData={service} />
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-colors duration-300"
                    onClick={() => handleDelete(service._id)}
                  >
                    {t("delete")}
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row mt-8 gap-8">
              <motion.img
                src={service.image}
                alt={service.title[currentLocale] || service.title["en"]}
                className="rounded-lg shadow-lg w-full md:w-1/2 h-auto object-cover transition-shadow duration-500 dark:shadow-xl dark:shadow-black/60"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/600x300?text=Image+Not+Available";
                }}
                initial="hidden"
                animate="visible"
              />
              <motion.div
                className="flex-1 text-gray-700 dark:text-gray-300 transition-colors duration-500"
                initial="hidden"
                animate="visible"
              >
                <p className="mb-3 text-xl font-semibold text-indigo-600 dark:text-indigo-400 transition-colors duration-500">
                  {service.description[currentLocale] || service.description["en"]}
                </p>
                {service.category && (
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500">
                    {t("category")}: {service.category}
                  </p>
                )}
              </motion.div>
            </div>
          </motion.section>
        ))}

        {/* Core Comparison Table */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-7xl mx-auto px-6 py-10 rounded-xl bg-[#f0f4ff] dark:bg-gray-700 text-gray-700 dark:text-gray-300 mt-10 shadow-lg transition-colors duration-500"
        >
          <h3 className="text-center mb-6 font-semibold text-2xl text-[#08807a] dark:text-teal-400 transition-colors duration-500">
            {t("coreComparison")}
          </h3>
          <div className="overflow-auto">
            <table className="w-full table-fixed border-collapse border border-gray-300 dark:border-gray-600">
              <thead className="bg-[#08807a] dark:bg-teal-600 text-white text-center">
                <tr>
                  <th className="w-1/4 border border-gray-300 dark:border-gray-600 py-4">
                    {t("serviceLabel")}
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 py-4">
                    {t("services.0")}
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 py-4">
                    {t("services.1")}
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 py-4">
                    {t("services.2")}
                  </th>
                </tr>
              </thead>
              <tbody className="text-center text-gray-800 dark:text-gray-200">
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 bg-[#08807a] dark:bg-teal-600 text-white font-semibold py-3">
                    {t("comparison.focus")}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 py-3">{t("details.focus.0")}</td>
                  <td className="border border-gray-300 dark:border-gray-600 py-3">{t("details.focus.1")}</td>
                  <td className="border border-gray-300 dark:border-gray-600 py-3">{t("details.focus.2")}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 bg-[#08807a] dark:bg-teal-600 text-white font-semibold py-3">
                    {t("comparison.tools")}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 py-3">{t("details.tools.0")}</td>
                  <td className="border border-gray-300 dark:border-gray-600 py-3">{t("details.tools.1")}</td>
                  <td className="border border-gray-300 dark:border-gray-600 py-3">{t("details.tools.2")}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 bg-[#08807a] dark:bg-teal-600 text-white font-semibold py-3">
                    {t("comparison.impact")}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 py-3">{t("details.impact.0")}</td>
                  <td className="border border-gray-300 dark:border-gray-600 py-3">{t("details.impact.1")}</td>
                  <td className="border border-gray-300 dark:border-gray-600 py-3">{t("details.impact.2")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
