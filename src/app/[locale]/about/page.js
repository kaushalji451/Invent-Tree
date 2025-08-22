"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, type: "spring" }
  })
};

function Page() {
  const t = useTranslations("about");
  const team = t.raw("team");

  return (
    <div className="min-h-screen bg-white text-[#222] dark:bg-[#1f1f1f] dark:text-white px-3 pb-16 transition-colors duration-300">
      <motion.div
        className="max-w-4xl mx-auto py-12 max-md:pt-35"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, type: "spring" }}
      >
        {/* Header */}
        <motion.h1
          className="text-4xl font-bold text-center mb-2 text-teal-700 dark:text-teal-400"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 1, type: "spring" }}
        >
          {t("title")}
        </motion.h1>
        <motion.p
          className="text-center text-lg mb-8 text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {t("subtitle")}
        </motion.p>

        {/* Company Mission */}
        <div className="p-6 rounded-2xl mb-10 bg-[#f4f7ff] dark:bg-[#2e2d2d]">
          <motion.div
            className="rounded-lg shadow px-6 py-6 border border-[#c1c7d0]/40 dark:border-gray-600"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p>
              <strong>{t("mission.title")}</strong><br />
              <span className="text-teal-700 dark:text-teal-400 font-semibold">
                {t("mission.highlight")}
              </span><br />
              <span>{t("mission.extra")}</span>
            </p>
          </motion.div>
        </div>

        {/* Team */}
        <motion.h2
          className="text-2xl font-semibold mb-6 text-center tracking-wide text-teal-700 dark:text-teal-400"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.09, duration: 0.6, type: "spring" }}
        >
          {t("teamTitle")}
        </motion.h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-12 bg-[#f4f7ff] dark:bg-[#2e2d2d] p-6 rounded-2xl">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              className="rounded-lg p-5 border border-[#c1c7d0]/40 dark:border-gray-600 shadow-lg hover:scale-105 transition-transform bg-white dark:bg-[#1f1f1f]"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3 className="text-lg font-bold mb-1">{member.name}</h3>
              <p className="italic mb-1 text-gray-600 dark:text-gray-400">{member.role}</p>
              <p>{member.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Privacy Policy */}
        <div className="p-6 mb-8 bg-[#f4f7ff] dark:bg-[#2e2d2d] rounded-2xl">
          <motion.div
            className="px-6 py-6 rounded-lg shadow-lg border border-[#c1c7d0]/40 dark:border-gray-600"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            <h2 className="text-xl font-semibold mb-2 text-teal-700 dark:text-teal-400">{t("privacy.title")}</h2>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              {t.raw("privacy.points").map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            <div className="mt-3 underline text-teal-700 dark:text-teal-400 cursor-pointer">
              {t("privacy.link")}
            </div>
          </motion.div>
        </div>

        {/* Company Details */}
        <div className="p-6 bg-[#f4f7ff] dark:bg-[#2e2d2d] rounded-2xl">
          <motion.div
            className="rounded-lg px-6 py-6 shadow-lg border border-[#c1c7d0]/40 dark:border-gray-600"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.22, duration: 0.8 }}
          >
            <h2 className="text-xl font-semibold mb-2 text-teal-700 dark:text-teal-400">{t("companyDetails.title")}</h2>
            <div className="space-y-1 text-gray-700 dark:text-gray-300">
              <div>{t("companyDetails.name")}</div>
              <div>{t("companyDetails.founded")}</div>
              <div>{t("companyDetails.hq")}</div>
              <div>{t("companyDetails.email")}</div>
              <div>{t("companyDetails.phone")}</div>
              <div>{t("companyDetails.legal")}</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="text-center mt-8 text-gray-600 dark:text-gray-400"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {t("footer")}
      </motion.footer>
    </div>
  );
}

export default Page;
