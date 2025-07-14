"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema } from "../../../../schema/auth.schema";
const SignUp = () => {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <input type="text" placeholder="Name" {...form.register("name")} />
        <input type="email" placeholder="Email" {...form.register("email")} />
        <input
          type="text"
          placeholderhello="Username"
          {...form.register("username")}
        />
        <input
          type="password"
          placeholder="Password"
          {...form.register("password")}
        />
       <button type="submit">Sign Up</button>
      </form>
      {form.formState.errors.name && (
        <p>{form.formState.errors.name.message}</p>
      )}
      {form.formState.errors.email && (
        <p>{form.formState.errors.email.message}</p>
      )}
      {form.formState.errors.username && (
        <p>{form.formState.errors.username.message}</p>
      )}
      {form.formState.errors.password && (
        <p>{form.formState.errors.password.message}</p>
      )}
    </div>
  );
};

export default SignUp;

