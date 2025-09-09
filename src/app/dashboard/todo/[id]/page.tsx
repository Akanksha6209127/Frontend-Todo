"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosClient from "@/lib/axiosClient";
import TodoSection from "@/components/todo/TodoSection";
import type { GroupType } from "@/types";

export default function TodoGroupPage() {
  const { id } = useParams();
  const router = useRouter();

  const [group, setGroup] = useState<GroupType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchGroup = async () => {
      try {
        const res = await axiosClient.get<GroupType>(`/api/groups/${id}`);
        setGroup(res.data);
      } catch (err) {
        console.error("Failed to fetch group", err);
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [id, router]);

  if (loading) return <p className="p-6 text-center">Loading list...</p>;
  if (!group) return <p className="p-6 text-center">Group not found</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => router.push("/dashboard")}
        className="mb-4 px-4 py-2 rounded
            bg-gray-300 dark:bg-gray-700 
            text-gray-900 dark:text-gray-100
            hover:bg-gray-400 dark:hover:bg-gray-600
            transition-colors duration-200"
        >
        ← Back to Home
      </button>
      <h1 className="text-2xl font-bold mb-6">{group.title}</h1>

      <TodoSection
        expandedTodoGroupId={group._id}
        todoGroups={[group]}
        scrollToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        setExpandedTodoGroupId={() => {}}
      />
    </div>
  );
}