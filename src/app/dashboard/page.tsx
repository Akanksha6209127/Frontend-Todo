
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/axiosClient";

import { TodoProvider } from "@/components/todo/TodoContext";
import LayoutWrapper from "@/components/todo/LayoutWrapper";
import TodoSection from "@/components/todo/TodoSection";
import ListSection from "@/components/todo/ListSection";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"; 

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
          router.replace("/signin");
          return;
        }
      } catch (err) {
        router.replace("/signin");
        return;
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (!user) return null; // redirect hone tak blank

  return (
    <TodoProvider>
      <LayoutWrapper>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome, {user.name} 👋
            </h1>
            <p className="text-gray-600 mt-1">Your role: {user.role}</p>
          </div>
        </div>

        {/*  ShadCN Tabs */}
        <Tabs defaultValue="todos" className="w-full mt-6">
          <TabsList className="flex space-x-2">
            <TabsTrigger value="todos">Lists</TabsTrigger>
            <TabsTrigger value="lists">Todos</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="todos">
              <TodoSection />
            </TabsContent>

            <TabsContent value="lists">
              <ListSection />
            </TabsContent>
          </div>
        </Tabs>
      </LayoutWrapper>
    </TodoProvider>
  );
}








