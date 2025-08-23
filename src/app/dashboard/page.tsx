


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/axiosClient";

type UserType = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await axiosClient.get("/api/auth/me");
          if (res.data && res.data._id) {
            setUser(res.data);
          } else {
            router.replace("/login");
            return;
          }
        } catch (err) {
          router.replace("/login");
          return;
        } finally {
          setLoading(false);
        }
      };
    fetchUser();
  }, []); // run once on mount



  if (loading) return <p>Loading...</p>;

  if (!user) return null; // jab tak redirect ho raha hai tab tak blank

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Welcome, {user.name} 👋
      </h1>
      <p className="text-gray-600 mt-2">Your role: {user.role}</p>

      {/* Example dashboard content */}
      <div className="mt-6 space-y-4">
        <button
          onClick={() => router.push("/todos")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Go to Todos
        </button>

        <button
          onClick={() => router.push("/profile")}
          className="bg-green-600 text-white px-4 py-2 rounded-md"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}
