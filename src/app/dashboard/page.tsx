
"use client"; 

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/axiosClient";

import { TodoProvider } from "@/components/todo/TodoContext";
import LayoutWrapper from "@/components/todo/LayoutWrapper";
import TodoSection from "@/components/todo/TodoSection";
import ListSection from "@/components/todo/ListSection";


import CreateBoxDialog from "@/components/todo/CreateBoxDialog";
import BoxGrid from "@/components/todo/BoxGrid";
import DeleteConfirmDialog from "@/components/todo/DeleteConDialog";
import Breadcrumb from "@/components/todo/Breadcrumb";

// ---------- Types ----------
type UserType = { _id: string; name: string; email: string; role: string };
type BoxType = { _id: string; title: string; type: "todo" | "list" };
type TodoDoc = { _id: string; title: string };
type ListDoc = { _id: string; name: string };

export default function DashboardPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [boxes, setBoxes] = useState<BoxType[]>([]);
  const [expandedBoxId, setExpandedBoxId] = useState<string | null>(null);
  const [deleteBoxId, setDeleteBoxId] = useState<string | null>(null);

  const router = useRouter();
  const todoSectionRef = useRef<HTMLDivElement>(null);
  const listSectionRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSection = (type: "todo" | "list") => {
    if (type === "todo") todoSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    else listSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ---------- Fetch logged-in user ----------
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

  // ---------- Fetch Boxes ----------
  useEffect(() => {
    if (!user) return;

    const fetchBoxes = async () => {
      try {
        const [todoRes, listRes] = await Promise.all([
          axiosClient.get<TodoDoc[]>("/api/todos"),
          axiosClient.get<ListDoc[]>("/api/lists"),
        ]);

        const combinedBoxes: BoxType[] = [
          ...todoRes.data.map((t) => ({ _id: t._id, title: t.title, type: "todo" as const })),
          ...listRes.data.map((l) => ({ _id: l._id, title: l.name, type: "list" as const })),
        ];

        setBoxes(combinedBoxes);
      } catch (err) {
        console.error("Failed to fetch boxes:", err);
      }
    };

    fetchBoxes();
  }, [user]);

  if (!user) return null;

  // ---------- Create Box ----------
  // const handleCreate = async (newTitle: string, type: "todo" | "list") => {
  //   try {
  //     if (type === "todo") {
  //       const res = await axiosClient.post<TodoDoc>("/api/todos", {
  //         title: newTitle,
  //         amount: 1,
  //         unit: "piece",
  //         boxId: "defaultBox",
  //       });
  //       setBoxes((prev) => [...prev, { _id: res.data._id, title: res.data.title, type: "todo" }]);
  //     } else {
  //       const res = await axiosClient.post<ListDoc>("/api/lists", {
  //         name: newTitle,
  //         boxId: "defaultBox",
  //       });
  //       setBoxes((prev) => [...prev, { _id: res.data._id, title: res.data.name, type: "list" }]);
  //     }
  //   } catch (err) {
  //     console.error("Failed to create box:", err);
  //     alert("Failed to create box. Check console for details.");
  //   }
  // };


  const handleCreate = async (newTitle: string, type: "todo" | "list") => {
    try {
      if (type === "todo") {
        const res = await axiosClient.post<TodoDoc>("/api/todos", {
          title: newTitle,
          amount: 1,
          unit: "piece",
        });
        const newBox = { _id: res.data._id, title: res.data.title, type: "todo" } as BoxType;
        setBoxes((prev) => [...prev, newBox]);
        // scroll to todo section after creation
        scrollToSection("todo");
      } else {
        const res = await axiosClient.post<ListDoc>("/api/lists", {
          name: newTitle,
        });
        const newBox = { _id: res.data._id, title: res.data.name, type: "list" } as BoxType;
        setBoxes((prev) => [...prev, newBox]);
        // scroll to list section after creation
        scrollToSection("list");
      }
    } catch (err) {
      console.error("Failed to create box:", err);
      alert("Failed to create box. Check console for details.");
    }
  };


  // ---------- Delete Box ----------
  const handleDelete = async () => {
    if (!deleteBoxId) return;

    try {
      const box = boxes.find((b) => b._id === deleteBoxId);
      if (!box) return;

      await axiosClient.delete(box.type === "todo" ? `/api/todos/${deleteBoxId}` : `/api/lists/${deleteBoxId}`);
      setBoxes((prev) => prev.filter((b) => b._id !== deleteBoxId));
      setDeleteBoxId(null);
    } catch (err) {
      console.error("Failed to delete box:", err);
      alert("Failed to delete box. Check console.");
    }
  };

  // ---------- Share Box ----------
  const handleShare = (box: BoxType) => {
    if (typeof window === "undefined" || !navigator.share) {
      alert(`Share this link: /dashboard/${box._id}`);
      return;
    }

    const shareUrl = `${window.location.origin}/dashboard/${box._id}`;
    navigator.share({
      title: box.title,
      text: `Check out my ${box.type}: ${box.title}`,
      url: shareUrl,
    });
  };

  // ---------- Separate Boxes ----------
  const todoBoxes = boxes.filter((b) => b.type === "todo");
  const listBoxes = boxes.filter((b) => b.type === "list");

  


  return (
    <TodoProvider>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user.name} 👋</h1>
          <p className="text-gray-600 mt-1">Your role: {user.role}</p>
        </div>
        <CreateBoxDialog onCreate={handleCreate} />
      </div>

      <Breadcrumb
        expandedBoxId={expandedBoxId}
        boxes={boxes}
        scrollToTop={scrollToTop}
        setExpandedBoxId={setExpandedBoxId} 
      />

      


      {expandedBoxId ? (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto p-6">
          <LayoutWrapper>
            {boxes.find((b) => b._id === expandedBoxId)?.type === "todo" ? (
              <TodoSection 
                boxId={expandedBoxId}
                expandedBoxId={expandedBoxId}
                boxes={boxes}
                scrollToTop={scrollToTop}
                setExpandedBoxId={setExpandedBoxId} 
              />
            ) : (
              <ListSection 
                boxId={expandedBoxId} 
                expandedBoxId={expandedBoxId}
                boxes={boxes}
                scrollToTop={scrollToTop}
                setExpandedBoxId={setExpandedBoxId}
              />
            )}
          </LayoutWrapper>
        </div>
      ) : (
        <>
          <div ref={todoSectionRef}>
            <BoxGrid
              title="Todos"
              boxes={todoBoxes}
              image="/images/todo.avif"
              onExpand={setExpandedBoxId}
              onDelete={setDeleteBoxId}
              onShare={handleShare}
            />
          </div>
          <div ref={listSectionRef}>
            <BoxGrid
              title="Groceries"
              boxes={listBoxes}
              image="/images/list.jpg"
              onExpand={setExpandedBoxId}
              onDelete={setDeleteBoxId}
              onShare={handleShare}
            />
          </div>
        </>
      )}

      <DeleteConfirmDialog open={!!deleteBoxId} onConfirm={handleDelete} onCancel={() => setDeleteBoxId(null)} />
    </TodoProvider>
  );
}
