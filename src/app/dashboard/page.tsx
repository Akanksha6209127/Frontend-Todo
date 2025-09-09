
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/axiosClient";

import CreateBoxDialog from "@/components/todo/CreateBoxDialog";
import BoxGrid from "@/components/todo/BoxGrid";
import DeleteConfirmDialog from "@/components/todo/DeleteConDialog";
import LogoutButton from "@/components/logout";

import type { GroupType } from "@/types";

type UserType = { _id: string; name: string; email: string; role: string };

export default function DashboardPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [deleteGroupId, setDeleteGroupId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // ✅ Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosClient.get<UserType>("/api/auth/me");
        if (res.data?._id) {
          setUser(res.data);
        } else {
          router.replace("/signin");
        }
      } catch {
        router.replace("/signin");
      }
    };
    fetchUser();
  }, [router]);

  //  Fetch groups after user loads
  useEffect(() => {
    if (!user) return;
    const fetchGroups = async () => {
      try {
        const res = await axiosClient.get<GroupType[]>("/api/groups");
        setGroups(res.data);
      } catch (err) {
        console.error("Failed to fetch groups:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, [user]);

  if (!user) return null;

  //  Create Group
  const handleCreate = async (newTitle: string, type: "list" | "todo") => {
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

  //  Delete Group
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

  //  Separate Groups
  const todoGroups = groups.filter((g) => g.type === "todo");
  const listGroups = groups.filter((g) => g.type === "list");

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user.name} 👋</h1>
          <p className="text-gray-600 mt-1">Your role: {user.role}</p>
        </div>
        <div className="flex items-center gap-4">
          <CreateBoxDialog onCreate={handleCreate} />
          <LogoutButton />
        </div>
        
      </div>

      {/* Loader */}
      {loading ? (
        <p className="text-center text-gray-500">Loading your groups...</p>
      ) : (
        <>
          
          <BoxGrid
            title="List Groups"
            groups={todoGroups}
            image="/images/list.jpg"
            onExpand={(id) => router.push(`/dashboard/todo/${id}`)}
            onDelete={setDeleteGroupId}
            onShare={(group) => {
              const shareUrl = `${window.location.origin}/dashboard/todo/${group._id}`;
              navigator.share
                ? navigator.share({ title: group.title, text: `Check out my todo group`, url: shareUrl })
                : alert(`Share this link: ${shareUrl}`);
            }}
          />

          <BoxGrid
            title="Todo Groups"
            groups={listGroups}
            image="/images/todo.avif"
            onExpand={(id) => router.push(`/dashboard/list/${id}`)}
            onDelete={setDeleteGroupId}
            onShare={(group) => {
              const shareUrl = `${window.location.origin}/dashboard/list/${group._id}`;
              navigator.share
                ? navigator.share({ title: group.title, text: `Check out my list group`, url: shareUrl })
                : alert(`Share this link: ${shareUrl}`);
            }}
          />


        </>
      )}

      {/* ✅ Delete confirm */}
      <DeleteConfirmDialog
        open={!!deleteGroupId}
        onConfirm={handleDelete}
        onCancel={() => setDeleteGroupId(null)}
      />
    </>
  );
}
