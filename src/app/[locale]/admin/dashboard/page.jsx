"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Loading from "../../../../components/loading";

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
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get("/api/blog");
        setData(response.data.message);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        console.log(data);
      }
    };
    getUserData();
  }, []);

  const handleDeleteBlog = async (id) => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(`/api/blog?id=${id}`);
      if (response.status === 200) {
        setIsDeleting(false);
      } else {
        console.error(response.data);
        setIsDeleting(false);
      }
    } catch (error) {
      console.error(error)
    }finally{
      setIsDeleting(false)
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl">
        <Loading></Loading>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-neutral-900 dark:text-neutral-300">
      <h1 className="mb-10 text-center text-4xl font-bold">Blog Articles</h1>
      <div className="mx-auto max-w-4xl space-y-6">
        {data.map((item, i) => (
          <motion.div
            key={item._id}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="flex flex-col gap-4 overflow-hidden rounded-2xl bg-white p-4 shadow-lg transition-all duration-100 ease-in-out hover:scale-103 active:scale-100 md:flex-row"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.title || "Blog Image"}
                className="h-40 w-full rounded-xl object-cover md:w-52"
              />
            )}
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h2 className="line-clamp-2 text-xl font-semibold text-gray-800 md:text-2xl">
                  {item.title || item.slug}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                  {item.excerpt?.plainText ||
                    item.content ||
                    "No description available."}
                </p>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Category:{" "}
                <span className="font-medium">
                  {item.category || "Uncategorized"}
                </span>
              </div>
              <button
                className="cursor-pointer bg-blue-400"
                onClick={() => {
                  router.push(`/en/admin/blogs/${item.slug}`);
                }}
              >
                Edit
              </button>
              <button
                className="cursor-pointer bg-blue-400"
                onClick={() => {
                  handleDeleteBlog(item._id);
                }}
              >
                {isDeleting ? "Deleting" : "Delete"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
