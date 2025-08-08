"use client";
import { motion } from "framer-motion";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, type: "spring" },
  }),
};

const team = [
  {
    name: "Abhishek Kaushal",
    role: "Founder & Lead Developer",
    desc: "Over 4 years in web technologies (MERN stack). Clean code, efficient systems, building for scale.",
  },
  {
    name: "Priya Sharma",
    role: "UI/UX Designer",
    desc: "Intuitive user experiences, user psychology & modern design. Balances form & function.",
  },
  {
    name: "Ravi Verma",
    role: "Backend Architect",
    desc: "Builds robust backend systems using Node.js, Express, MongoDB. Focus on scale, security, and performance.",
  },
  {
    name: "Sneha Patel",
    role: "Marketing & Client Relations",
    desc: "Drives client communication and marketing. Ensures transparency and smooth collaboration.",
  },
];

// Main component
function Page() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-persian-green-950  text-slate-900 dark:text-white px-3 pb-16 transition-colors duration-300">
      <motion.div
        className="max-w-4xl mx-auto py-12 max-md:pt-35"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, type: "spring" }}
      >
        {/* Header */}
        <motion.h1
          className="text-4xl font-bold text-center mb-2 text-[#20948f]  bg-clip-text"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 1, type: "spring" }}
        >
           About TechNova Solutions
        </motion.h1>
        <motion.p
          className="text-center text-lg mb-8 text-slate-700 dark:text-slate-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Your trusted partner in building innovative digital experiences.
        </motion.p>

        {/* Company Mission */}
        <div className="p-6 rounded-2xl mb-10  bg-white">
            <motion.div
          className="bg-gradient-to-br   from-white to-slate-200 dark:from-white/5 dark:via-slate-800/40 dark:to-persian-green-900 rounded-lg shadow px-6 py-6 transition-colors"
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p>
            <strong>Founded in 2021</strong>, our mission is to empower businesses by building cutting-edge web and mobile applications.<br />
            <span className="bg-gradient-to-br from-cyan-500 via-lime-400 to-emerald-500 dark:from-yellow-400 dark:via-pink-400 dark:to-pink-600 bg-clip-text text-transparent font-semibold">We specialize in full-stack development, UI/UX design, and scalable cloud-based solutions.</span><br />
            <span>
              At TechNova, we push technology’s boundaries with a user-first approach and a passion for quality.
            </span>
          </p>
        </motion.div>
        </div>

        {/* Team Section */}
        <motion.h2
          className="text-2xl font-semibold mb-6 text-center tracking-wide text-[#20948f]"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.09, duration: 0.6, type: "spring" }}
        >
          Meet Our Team
        </motion.h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-12 bg-white p-6 rounded-2xl  ">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              className="rounded-lg p-5  bg-gradient-to-br from-white to-slate-200 dark:from-persian-green-900 dark:via-black/40 dark:to-persian-green-950 shadow-lg hover:scale-105 transition-transform dark:border-gray-700"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3 className="text-lg font-bold mb-1 text-slate-950 dark:text-white">{member.name}</h3>
              <p className="italic mb-1 text-slate-600 dark:text-pink-300">{member.role}</p>
              <p className="text-slate-800 dark:text-white/85">{member.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Privacy Policy */}
       <div className="p-6 mb-8 bg-white rounded-2xl">
         <motion.div
          className="bg-gradient-to-br  from-white to-slate-200 dark:from-white/5 dark:via-slate-800/40 dark:to-persian-green-900  px-6 py-6  transition-colors  rounded-lg dark:border-gray-700 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.8 }}
        >
          <h2 className="text-xl font-semibold mb-2  text-[#20948f] dark:text-pink-200"> Privacy Policy</h2>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200">
            <li>We value your privacy and protect your personal information.</li>
            <li>
              <strong>Data Collection:</strong> Only data necessary for improving services is collected.
            </li>
            <li>
              <strong>Usage:</strong> Data is used only for service delivery, communications, and analytics. Not shared or sold without consent.
            </li>
            <li>
              <strong>Security:</strong> Industry-standard encryption secures your data.
            </li>
            <li>
              <strong>Cookies:</strong> Cookies are used for enhancing user experience; manage via your browser.
            </li>
          </ul>
          <div className="mt-3">
            <span className="underline text-cyan-600 cursor-pointer dark:text-cyan-200">
              Read full Privacy Policy &rarr;
            </span>
          </div>
        </motion.div>
       </div>

        {/* Company Details */}
       <div className="p-6 bg-white rounded-2xl">
         <motion.div
          className="bg-gradient-to-br  from-white to-slate-200 dark:from-persian-green-900 dark:via-black/40 dark:to-persian-green-950 rounded-lg px-6 py-6 transition-colors  dark:border-gray-700 shadow-lg"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.22, duration: 0.8 }}
        >
          <h2 className="text-xl font-semibold mb-2 text-[#20948f] dark:text-lime-200">🧾 Company Details</h2>
          <div className="space-y-1 text-gray-800 dark:text-gray-100">
            <div>
              <span className="font-bold">Company Name:</span> TechNova Solutions
            </div>
            <div>
              <span className="font-bold">Founded:</span> 2021
            </div>
            <div>
              <span className="font-bold">Headquarters:</span> Bandhua Kalan, Sultanpur, Uttar Pradesh, India
            </div>
            <div>
              <span className="font-bold">Email:</span>{" "}
              <a href="mailto:contact@technovasolutions.com" className="text-cyan-600 hover:underline dark:text-pink-300">
                contact@technovasolutions.com
              </a>
            </div>
            <div>
              <span className="font-bold">Phone:</span>{" "}
              <span className="text-[#20948f] dark:text-cyan-200">+91-9876543210</span>
            </div>
            <div>
              <span className="font-bold">Legal Entity:</span>{" "}
              Registered under Indian Companies Act, MSME ID:{" "}
              <span className="">IN-UP-123456789</span>
            </div>
          </div>
        </motion.div>
       </div>
      </motion.div>
      <motion.footer
        className="text-center mt-8 text-gray-400 dark:text-slate-400 transition-colors"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        © 2024 TechNova Solutions — All Rights Reserved.
      </motion.footer>
    </div>
  );
}

export default Page;
