


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/axiosClient";

import LayoutWrapper from "@/components/todo/LayoutWrapper";
import TodoSection from "@/components/todo/TodoSection";
import ListSection from "@/components/todo/ListSection";
import CreateBoxDialog from "@/components/todo/CreateBoxDialog";
import BoxGrid from "@/components/todo/BoxGrid";
import DeleteConfirmDialog from "@/components/todo/DeleteConDialog";
import Breadcrumb from "@/components/todo/Breadcrumb";

import type { GroupType } from "@/types";


type UserType = { _id: string; name: string; email: string; role: string };

export default function DashboardPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [expandedTodoGroupId, setExpandedTodoGroupId] = useState<string | null>(null);
  const [expandedListGroupId, setExpandedListGroupId] = useState<string | null>(null);
  const [deleteGroupId, setDeleteGroupId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosClient.get<UserType>("/api/auth/me");
        if (res.data?._id) setUser(res.data);
        else router.replace("/signin");
      } catch {
        router.replace("/signin");
      }
    };
    fetchUser();
  }, [router]);

  
  useEffect(() => {
    if (!user) return;

    const fetchGroups = async () => {
      try {
        const res = await axiosClient.get<GroupType[]>("/api/groups");
        setGroups(res.data);
      } catch (err) {
        console.error("Failed to fetch groups:", err);
      }
    };

    fetchGroups();
  }, [user]);

  if (!user) return null;

  
  const handleCreate = async (newTitle: string, type: "todo" | "list") => {
    try {
      const res = await axiosClient.post<GroupType>("/api/groups", {
        
        title: newTitle,
        type,
          
      });
      setGroups((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Failed to create group:", err);
      alert("Failed to create group. Check console for details.");
    }
  };

  // ---------- Delete Group ----------
  const handleDelete = async () => {
    if (!deleteGroupId) return;

    try {
      await axiosClient.delete(`/api/groups/${deleteGroupId}`);
      setGroups((prev) => prev.filter((g) => g._id !== deleteGroupId));
      setDeleteGroupId(null);
    } catch (err) {
      console.error("Failed to delete group:", err);
      alert("Failed to delete group. Check console.");
    }
  };

  // ---------- Separate Groups ----------
  const todoGroups = groups.filter((g) => g.type === "todo");
  const listGroups = groups.filter((g) => g.type === "list");

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user.name} 👋</h1>
          <p className="text-gray-600 mt-1">Your role: {user.role}</p>
        </div>
        <CreateBoxDialog onCreate={handleCreate} />
      </div>

      {/* Breadcrumb (optional for back navigation) */}
      <Breadcrumb
        expandedListGroupId={expandedListGroupId}
        expandedTodoGroupId={expandedTodoGroupId}
        listGroups={listGroups}
        todoGroups={todoGroups}
        scrollToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        setExpandedListGroupId={setExpandedListGroupId}
        setExpandedTodoGroupId={setExpandedTodoGroupId}
      />
      {expandedTodoGroupId ? (
        <TodoSection
          expandedTodoGroupId={expandedTodoGroupId}
          todoGroups={todoGroups}
          scrollToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          setExpandedTodoGroupId={setExpandedTodoGroupId}
        />
        ) : expandedListGroupId ? (
          <ListSection
            expandedListGroupId={expandedListGroupId}
            listGroups={listGroups}
            scrollToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            setExpandedListGroupId={setExpandedListGroupId}
          />
        ) : (
        <>
          <BoxGrid
            title="Todo Groups"
            groups={todoGroups}
            image="/images/todo.avif"
            onExpand={setExpandedTodoGroupId}
            onDelete={setDeleteGroupId}
            onShare={(group) => {
              if (typeof window === "undefined" || !navigator.share) {
                alert(`Share this link: /dashboard/${group._id}`);
                return;
              }
              const shareUrl = `${window.location.origin}/dashboard/${group._id}`;
              navigator.share({
                title: group.title,
                text: `Check out my todo group: ${group.title}`,
                url: shareUrl,
              });
            }}
          />

          <BoxGrid
            title="List Groups"
            groups={listGroups}
            image="/images/list.jpg"
            onExpand={setExpandedListGroupId}
            onDelete={setDeleteGroupId}
            onShare={(group) => {
              if (typeof window === "undefined" || !navigator.share) {
                alert(`Share this link: /dashboard/${group._id}`);
                return;
              }
              const shareUrl = `${window.location.origin}/dashboard/${group._id}`;
              navigator.share({
                title: group.title,
                text: `Check out my list group: ${group.title}`,
                url: shareUrl,
              });
            }}
          />

        </>
      )}


      {/* Delete confirm */}
      <DeleteConfirmDialog
        open={!!deleteGroupId}
        onConfirm={handleDelete}
        onCancel={() => setDeleteGroupId(null)}
      />
    </>
  );
}
