"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Loading from "../../../components/loading"

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

const AdminDashboard = () => {
  const router = useRouter()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        <Loading></Loading>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-10">Blog Articles</h1>
      <div className="max-w-4xl mx-auto space-y-6">
        {data.map((item, i) => (
          <motion.div
            key={item._id}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row gap-4 p-4 hover:scale-103 transition-all duration-100 ease-in-out cursor-pointer"
          onClick={()=>{
            router.push("/admin/dashboard")
          }}
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.title || "Blog Image"}
                className="w-full md:w-52 h-40 object-cover rounded-xl"
              />
            )}
            <div className="flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 line-clamp-2">
                  {item.title || item.slug}
                </h2>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {item.excerpt?.plainText || item.content || "No description available."}
                </p>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Category: <span className="font-medium">{item.category || "Uncategorized"}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
