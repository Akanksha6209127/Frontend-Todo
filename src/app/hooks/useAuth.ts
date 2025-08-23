"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";

type UserType = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export function useAuth() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosClient.get("/api/auth/me"); // backend API
        setUser(res.data);
      } catch (error) {
        setUser(null); // not logged in
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { user, loading };
}
