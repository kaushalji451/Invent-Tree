"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
    });

    if (result?.error) {
      alert("Login failed");
    }
    if (result?.url) {
      console.log(result.url);
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-persian-green-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-persian-green-200"
      >
        <h1 className="text-3xl font-bold text-center text-persian-green-700 mb-8 tracking-tight">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              {...register("username")}
              className="w-full px-4 py-2 border dark:text-black border-persian-green-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-persian-green-400 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 border dark:text-black border-persian-green-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-persian-green-400 transition"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-persian-green-600 hover:bg-persian-green-700 text-white font-semibold py-2 rounded-xl transition duration-200 disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
