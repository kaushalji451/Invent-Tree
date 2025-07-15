"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminPage = () => {
  const route = useRouter();
  useEffect(() => {
    route.push("/admin/dashboard");
  }, [route]);
  return null;
};

export default AdminPage;
