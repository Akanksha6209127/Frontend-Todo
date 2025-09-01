"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/axiosClient";

import { TodoProvider } from "@/components/todo/TodoContext";
import LayoutWrapper from "@/components/todo/LayoutWrapper";
import TodoSection from "@/components/todo/TodoSection";
import ListSection from "@/components/todo/ListSection";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { X, Share2, ChevronRight, Home } from "lucide-react";

// ---------- Types ----------
type UserType = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

type BoxType = {
  _id: string;
  title: string;           // normalized for UI
  type: "todo" | "list";   // normalized type
};

// Raw API doc shapes
type TodoDoc = { _id: string; title: string };
type ListDoc = { _id: string; name: string };

// ---------- Breadcrumb ----------
function Breadcrumb({
  expandedBoxId,
  boxes,
  setExpandedBoxId,
  scrollToSection,
}: {
  expandedBoxId: string | null;
  boxes: BoxType[];
  setExpandedBoxId: (id: string | null) => void;
  scrollToSection: (type: "todo" | "list") => void;
}) {
  let crumbs: { label: string; onClick?: () => void }[] = [
    { label: "Home", onClick: () => setExpandedBoxId(null) },
  ];

  if (expandedBoxId) {
    const box = boxes.find((b) => b._id === expandedBoxId);
    if (box) {
      // You wanted inverted labels here:
      const sectionLabel = box.type === "todo" ? "List" : "Todo";
      crumbs.push({
        label: sectionLabel,
        onClick: () => {
          setExpandedBoxId(null);
          scrollToSection(box.type);
        },
      });
      crumbs.push({ label: box.title });
    }
  }

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
      {crumbs.map((c, i) => (
        <span
          key={i}
          className={`flex items-center gap-2 ${c.onClick ? "cursor-pointer hover:underline" : ""}`}
          onClick={c.onClick}
        >
          {i > 0 && <ChevronRight size={14} />}
          {i === 0 ? <Home size={16} className="mr-1" /> : null}
          <span>{c.label}</span>
        </span>
      ))}
    </div>
  );
}

// ---------- Page ----------
export default function DashboardPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [boxes, setBoxes] = useState<BoxType[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [type, setType] = useState<"todo" | "list">("todo");
  const [openDialog, setOpenDialog] = useState(false);
  const [expandedBoxId, setExpandedBoxId] = useState<string | null>(null);
  const [deleteBoxId, setDeleteBoxId] = useState<string | null>(null);

  const router = useRouter();

  const todoSectionRef = useRef<HTMLDivElement>(null);
  const listSectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (t: "todo" | "list") => {
    if (t === "todo" && todoSectionRef.current) {
      todoSectionRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (t === "list" && listSectionRef.current) {
      listSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Fetch logged in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosClient.get<UserType>("/api/auth/me");
        if (res.data && res.data._id) {
          setUser(res.data);
        } else {
          router.replace("/signin");
        }
      } catch {
        router.replace("/signin");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  // Fetch boxes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [todoRes, listRes] = await Promise.all([
          axiosClient.get<TodoDoc[]>("/api/todos"),
          axiosClient.get<ListDoc[]>("/api/lists"),
        ]);

        // Normalize to BoxType
        const allBoxes: BoxType[] = [
          ...todoRes.data.map((t) => ({
            _id: t._id,
            title: t.title,     // todos -> title
            type: "todo" as const,
          })),
          ...listRes.data.map((l) => ({
            _id: l._id,
            title: l.name,      // lists -> name (normalize to title)
            type: "list" as const,
          })),
        ];

        setBoxes(allBoxes);
      } catch (err) {
        console.error("Error fetching boxes", err);
      }
    };
    if (user) fetchData();
  }, [user]);

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );

  if (!user) return null;

  // Create
  const handleCreate = async () => {
    if (!newTitle.trim()) return;

    try {
      if (type === "todo") {
        // ✅ Correct: create a TODO
        const res = await axiosClient.post<TodoDoc>("/api/todos", {
          title: newTitle,
          amount: 1,
          unit: "piece",
          boxId: "defaultBox",
        });

        const newBox: BoxType = {
          _id: res.data._id,
          title: res.data.title,
          type: "todo",
        };
        setBoxes((prev) => [...prev, newBox]);
      } else if (type === "list") {
        // ✅ Correct: create a LIST
        const res = await axiosClient.post<ListDoc>("/api/lists", {
          name: newTitle,
          boxId: "defaultBox",
        });

        const newBox: BoxType = {
          _id: res.data._id,
          title: res.data.name, // normalize
          type: "list",
        };
        setBoxes((prev) => [...prev, newBox]);
      }

      setNewTitle("");
      setOpenDialog(false);
    } catch (error: any) {
      console.error("❌ Error creating item:", error?.response?.data || error?.message || error);
      alert(error?.response?.data?.message || "Failed to create. Please check server payload.");
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!deleteBoxId) return;
    try {
      const box = boxes.find((b) => b._id === deleteBoxId);
      if (!box) return;

      await axiosClient.delete(
        box.type === "todo"
          ? `/api/todos/${deleteBoxId}`
          : `/api/lists/${deleteBoxId}`
      );

      setBoxes((prev) => prev.filter((b) => b._id !== deleteBoxId));
      setDeleteBoxId(null);
    } catch (err) {
      console.error("Error deleting box", err);
      alert("Failed to delete. Please try again.");
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedBoxId((prev) => (prev === id ? null : id));
  };

  const handleShare = (box: BoxType) => {
    const shareUrl = `${window.location.origin}/dashboard/${box._id}`;
    if (navigator.share) {
      navigator.share({
        title: box.title,
        text: `Check out my ${box.type}: ${box.title}`,
        url: shareUrl,
      });
    } else {
      alert(`Share this link: ${shareUrl}`);
    }
  };

  // Split boxes (inverted display per your codebase)
  const listBoxes = boxes.filter((b) => b.type === "todo"); // shown under "Todos"
  const todoBoxes = boxes.filter((b) => b.type === "list"); // shown under "Groceries"

  return (
    <TodoProvider>
      <LayoutWrapper>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user.name} 👋</h1>
            <p className="text-gray-600 mt-1">Your role: {user.role}</p>
          </div>

          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button aria-label="Create new box">Create</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Create New {type === "todo" ? "Todo" : "List"}
                </DialogTitle>
              </DialogHeader>

              <div className="flex gap-4 my-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={type === "todo"}
                    onChange={() => setType("todo")}
                  />
                  Todo
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={type === "list"}
                    onChange={() => setType("list")}
                  />
                  List
                </label>
              </div>

              <input
                type="text"
                placeholder={`Enter ${type} title`}
                className="w-full border p-2 rounded"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />

              <Button className="mt-4 w-full" onClick={handleCreate}>
                Save
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* Breadcrumb */}
        <Breadcrumb
          expandedBoxId={expandedBoxId}
          boxes={boxes}
          setExpandedBoxId={setExpandedBoxId}
          scrollToSection={scrollToSection}
        />

        {/* Expanded view */}
        {expandedBoxId ? (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto p-6">
            <button
              aria-label="Close expanded view"
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
              onClick={() => setExpandedBoxId(null)}
            >
              <X className="h-6 w-6" />
            </button>

            {boxes.find((b) => b._id === expandedBoxId)?.type === "todo" ? (
              <ListSection boxId={expandedBoxId} />
            ) : (
              <TodoSection boxId={expandedBoxId} />
            )}
          </div>
        ) : (
          <>
            {/* List Section (shows TODOS) */}
            <div ref={listSectionRef} className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Todos</h2>
              <div className="flex flex-wrap gap-3">
                {listBoxes.map((box) => (
                  <Card
                    key={box._id}
                    // Rectangle: width > height, no rounded corners
                    className="relative p-4 flex flex-col items-center justify-between text-center w-64 h-28 shadow hover:shadow-lg cursor-pointer rounded-none"
                    onClick={() => toggleExpand(box._id)}
                  >
                    {/* Stacked icons (top-right, vertical) */}
                    <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteBoxId(box._id);
                        }}
                        className="p-1 hover:bg-gray-100"
                        aria-label="Delete"
                      >
                        <X className="w-5 h-5 text-red-600" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(box);
                        }}
                        className="p-1 hover:bg-gray-100"
                        aria-label="Share"
                      >
                        <Share2 className="w-5 h-5 text-blue-600" />
                      </button>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                      <Image
                        src="/images/todo.avif"
                        alt="todo"
                        width={64}
                        height={64}
                        className="mb-1"
                      />
                      <h2 className="font-medium text-sm">{box.title}</h2>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Todo Section (shows LISTS) */}
            <div ref={todoSectionRef}>
              <h2 className="text-xl font-semibold mb-3">Groceries</h2>
              <div className="flex flex-wrap gap-3">
                {todoBoxes.map((box) => (
                  <Card
                    key={box._id}
                    // Match rectangle style here too
                    className="relative p-4 flex flex-col items-center justify-between text-center w-64 h-28 shadow hover:shadow-lg cursor-pointer rounded-none"
                    onClick={() => toggleExpand(box._id)}
                  >
                    <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteBoxId(box._id);
                        }}
                        className="p-1 hover:bg-gray-100"
                        aria-label="Delete"
                      >
                        <X className="w-5 h-5 text-red-600" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(box);
                        }}
                        className="p-1 hover:bg-gray-100"
                        aria-label="Share"
                      >
                        <Share2 className="w-5 h-5 text-blue-600" />
                      </button>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                      <Image
                        src="/images/list.jpg"
                        alt="list"
                        width={64}
                        height={64}
                        className="mb-1"
                      />
                      <h2 className="font-medium text-sm">{box.title}</h2>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Delete dialog */}
        <Dialog open={!!deleteBoxId} onOpenChange={() => setDeleteBoxId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to delete?</DialogTitle>
            </DialogHeader>
            <div className="flex gap-4 mt-4">
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="outline" onClick={() => setDeleteBoxId(null)}>
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </LayoutWrapper>
    </TodoProvider>
  );
}
