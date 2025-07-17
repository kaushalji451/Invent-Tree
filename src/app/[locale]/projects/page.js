"use client";

import React from "react";
import { motion } from "framer-motion";  // Importing framer-motion for animations
import { useState, useEffect } from "react";
import ProjectPost from "./ProejctPost";  // Importing the ProjectPost component
import EditProject from "./EditProject";
import Loading from "../../../components/loading";
import Navbar from "../../../components/Navbar";
const Page = () => {
  // Animation variants
  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } },
  };

  const [loading, setLoading] = useState(true);
  const [projects, setprojects] = useState([]);

  let projectsData = async () => {
    let data = await fetch("/api/projects");
    let res = await data.json();
    console.log("projects Data:", res);
    return res.data;  // <-- Add this line
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    projectsData().then((data) => {
      setprojects(data);
      setLoading(false);  // Set loading to false after data is fetched
    });
  }, []);

  let handleDelete = async (id) => {
    let res = await fetch(`/api/projects?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setprojects(projects.filter((project) => project._id !== id));
      alert("Project deleted successfully");

      projectsData().then((data) => {
        setprojects(data);
      });

    } else {
      alert("Failed to delete project");
    }

  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen mb-10  bg-[#f3f7ff] text-gray-900 font-sans">
        {/* Header Section */}
        <header className="relative bg-slate-200 bg-top bg-no-repeat bg-contain">
          <div className="h-80"></div>
          <div className="max-w-7xl mx-auto px-6 py-30 flex justify-end pe-50 text-[#08807a] font-bold select-none">
            <div className="flex items-center gap-4 flex-col absolute z-50">
              <span className="text-lg py-2 px-4 border-l-4 border-[#08807a] font-normal relative left-3 select-text bg-white rounded-md shadow-sm cursor-default">
                Home Services
              </span>
              <ProjectPost />
            </div>
          </div>
        </header>

        {/* projects Section */}
        {projects && projects.map((projects, index) => (
          <motion.section
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`max-w-7xl mx-auto px-6 py-10 bg-white rounded-xl shadow-md ${index === 0 ? "-mt-12 relative z-10" : "mt-10"
              }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="flex items-center text-4xl text-[#08807a] font-light">
                <span className="border-l-4 border-[#08807a] pl-2">Proejcts {index + 1}</span>
                <span className="ml-4 text-lg font-normal">{projects.title.en}</span>
                <span className="inline-block ml-2 text-sm text-[#08807a]">»</span>
              </h2>
              <div className="flex items-center gap-2">
                <EditProject id={projects._id} initialData={projects} />
                <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => handleDelete(projects._id)}>Delete</button>
              </div>

            </div>
            <div className="flex flex-col md:flex-row mt-8 gap-8">
              <img
                src={projects.image}
                alt={projects.title.en}
                className="rounded-lg shadow-lg w-full md:w-1/2 h-auto object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/600x300?text=Image+Not+Available";
                }}
              />
              <div className="flex-1 text-gray-700">
                <p className="mb-3 text-xl font-semibold text-indigo-600">{projects.description.en}</p>
                {projects.category && (
                  <p className="mb-2 text-sm text-gray-500">Category: {projects.category}</p>
                )}
              </div>
            </div>
          </motion.section>
        ))}


      </div>
    </>

  );
};

export default Page;
