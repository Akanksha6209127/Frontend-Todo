


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserButton from "@/components/user-button";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      router.push("/login"); //  UI login page
    } else {
      //Agar token hai, dashboard route pe bhejo
      router.push("/dashboard");
    }

    setLoading(false);
  }, [router]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <UserButton />
    </div>
  );
}
