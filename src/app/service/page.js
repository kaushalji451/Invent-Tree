"use client";

import React from "react";
import { motion } from "framer-motion";  // Importing framer-motion for animations
import { useState, useEffect } from "react";
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



    const [services, setServices] = useState([]);

    let servicesData = async () => {
        let data = await fetch("/api/services");
        let res = await data.json();
        console.log("Services Data:", res.message);
        return res.message;  // <-- Add this line
    };

    useEffect(() => {
        servicesData().then((data) => {
            setServices(data);
        });
    }, []);

    return (
        <div className="min-h-screen  bg-[#f3f7ff] text-gray-900 font-sans">
            {/* Header Section */}
            <header className="relative bg-slate-200 bg-top bg-no-repeat bg-contain">
                <div className="h-80"></div>
                <div className="max-w-7xl mx-auto px-6 py-20 flex justify-end pe-50 text-[#08807a] font-bold select-none">
                    <span className="text-lg py-2 px-4 border-l-4 border-[#08807a] font-normal relative left-3 select-text bg-white rounded-md shadow-sm cursor-default">
                        Home Services
                    </span>
                </div>
            </header>

            {/* Services Section */}
            {services && services.map((service, index) => (
                <motion.section
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`max-w-7xl mx-auto px-6 py-10 bg-white rounded-xl shadow-md ${index === 0 ? "-mt-12 relative z-10" : "mt-10"
                        }`}
                >
                    <h2 className="flex items-center text-4xl text-[#08807a] font-light">
                        <span className="border-l-4 border-[#08807a] pl-2">Service {index + 1}</span>
                        <span className="ml-4 text-lg font-normal">{service.title.en}</span>
                        <span className="inline-block ml-2 text-sm text-[#08807a]">»</span>
                    </h2>
                    <div className="flex flex-col md:flex-row mt-8 gap-8">
                        <img
                            src={service.image}
                            alt={service.title.en}
                            className="rounded-lg shadow-lg w-full md:w-1/2 h-auto object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/600x300?text=Image+Not+Available";
                            }}
                        />
                        <div className="flex-1 text-gray-700">
                            <p className="mb-3 text-xl font-semibold text-indigo-600">{service.description.en}</p>
                            {service.category && (
                                <p className="mb-2 text-sm text-gray-500">Category: {service.category}</p>
                            )}
                        </div>
                    </div>
                </motion.section>
            ))}

            {/* PE and PP Difference Table Section */}
           <section className="max-w-7xl mx-auto px-6 py-10 rounded-xl bg-[#f0f4ff] text-gray-700 mt-10 shadow-lg">
    <h3 className="text-center mb-6 font-semibold text-2xl text-[#08807a]">Our Core Service Comparison</h3>
    <div className="overflow-auto">
        <table className="w-full table-fixed border-collapse border border-gray-300">
            <thead className="bg-[#08807a] text-white text-center">
                <tr>
                    <th className="w-1/4 border border-gray-300 py-4">Service</th>
                    <th className="border border-gray-300 py-4">Political Consulting</th>
                    <th className="border border-gray-300 py-4">Geospatial Analysis</th>
                    <th className="border border-gray-300 py-4">Survey Research</th>
                </tr>
            </thead>
            <tbody className="text-center text-gray-800">
                <tr>
                    <td className="border border-gray-300 bg-[#08807a] text-white font-semibold py-3">Focus Areas</td>
                    <td className="border border-gray-300 py-3">Campaign strategy, voter profiling, media management</td>
                    <td className="border border-gray-300 py-3">GIS mapping, satellite data, location intelligence</td>
                    <td className="border border-gray-300 py-3">Public opinion surveys, exit polls, demographic insights</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 bg-[#08807a] text-white font-semibold py-3">Key Tools</td>
                    <td className="border border-gray-300 py-3">CRM, analytics dashboards</td>
                    <td className="border border-gray-300 py-3">QGIS, Google Earth Engine</td>
                    <td className="border border-gray-300 py-3">Custom forms, mobile data collection apps</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 bg-[#08807a] text-white font-semibold py-3">Client Impact</td>
                    <td className="border border-gray-300 py-3">Increased vote share, targeted outreach</td>
                    <td className="border border-gray-300 py-3">Improved planning, real-time insights</td>
                    <td className="border border-gray-300 py-3">Accurate feedback, data-driven decisions</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>



        </div>
        
    );
};

export default Page;
