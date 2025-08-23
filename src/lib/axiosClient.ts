"use client";

import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use((config) => {
  // Get token from browser cookies
  const token = Cookies.get("token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.get("/auth/me")
  .then((res) => {
    console.log("User data:", res.data);
  })
  .catch((err) => {
    console.error("Error fetching user:", err.response?.data || err.message);
  });

export default axiosClient;
