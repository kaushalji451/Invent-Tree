"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema } from "../../../../../schema/auth.schema";
import { motion } from "framer-motion";

const SignUp = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // 🟡 Guard: Redirect unauthenticated users to login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("admin/login");
    }
  }, [status, router]);

  // 🟢 Loading spinner while checking session
  if (status === "loading") {
    return <p className="text-center mt-20 text-white">Loading...</p>;
  }

  // ✅ Show form only when authenticated
  if (status !== "authenticated") {
    return null;
  }

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      const loginRes = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
      });

      if (loginRes.ok) {
        alert("Signup successful");
        router.replace("/admin/dashboard");
      } else {
        alert("Signup successful but login failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong");
    }
  }

  // Animations
  const inputVariants = {
    focus: { scale: 1.02, borderColor: "#059669" },
    blur: { scale: 1, borderColor: "#0f766e" },
  };
  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: "#059669" },
    tap: { scale: 0.95 },
  };
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };
  const inputContainerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-persian-green-950 p-4">
      <motion.div
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-persian-green-700">
          Create Your Account
        </h2>

        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          variants={formVariants}
        >
          {/* Name */}
          <motion.div variants={inputContainerVariants}>
            <motion.input
              type="text"
              placeholder="Name"
              className="w-full rounded-md border border-persian-green-700 bg-persian-green-50 p-3 text-persian-green-700 placeholder-persian-green-400 focus:outline-none"
              {...form.register("name")}
              variants={inputVariants}
              whileFocus="focus"
              initial="blur"
            />
            {form.formState.errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </motion.div>

          {/* Email */}
          <motion.div variants={inputContainerVariants}>
            <motion.input
              type="email"
              placeholder="Email"
              className="w-full rounded-md border border-persian-green-700 bg-persian-green-50 p-3 text-persian-green-700 placeholder-persian-green-400 focus:outline-none"
              {...form.register("email")}
              variants={inputVariants}
              whileFocus="focus"
              initial="blur"
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </motion.div>

          {/* Username */}
          <motion.div variants={inputContainerVariants}>
            <motion.input
              type="text"
              placeholder="Username"
              className="w-full rounded-md border border-persian-green-700 bg-persian-green-50 p-3 text-persian-green-700 placeholder-persian-green-400 focus:outline-none"
              {...form.register("username")}
              variants={inputVariants}
              whileFocus="focus"
              initial="blur"
            />
            {form.formState.errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.username.message}
              </p>
            )}
          </motion.div>

          {/* Password */}
          <motion.div variants={inputContainerVariants}>
            <motion.input
              type="password"
              placeholder="Password"
              className="w-full rounded-md border border-persian-green-700 bg-persian-green-50 p-3 text-persian-green-700 placeholder-persian-green-400 focus:outline-none"
              {...form.register("password")}
              variants={inputVariants}
              whileFocus="focus"
              initial="blur"
            />
            {form.formState.errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </motion.div>

          <motion.button
            type="submit"
            className="w-full rounded-md bg-persian-green-700 py-3 text-white transition-colors"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Sign Up
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default SignUp;
