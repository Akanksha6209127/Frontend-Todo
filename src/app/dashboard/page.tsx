
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import axiosClient from "@/lib/axiosClient";

// import { TodoProvider } from "@/components/todo/TodoContext";
// import LayoutWrapper from "@/components/todo/LayoutWrapper";
// import TodoSection from "@/components/todo/TodoSection";
// import ListSection from "@/components/todo/ListSection";

// import {
//   Tabs,
//   TabsList,
//   TabsTrigger,
//   TabsContent,
// } from "@/components/ui/tabs"; 

// type UserType = {
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
// };

// export default function Dashboard() {
//   const [user, setUser] = useState<UserType | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axiosClient.get("/api/auth/me");
//         if (res.data && res.data._id) {
//           setUser(res.data);
//         } else {
//           router.replace("/signin");
//           return;
//         }
//       } catch (err) {
//         router.replace("/signin");
//         return;
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [router]);

//   if (loading) return <p>Loading...</p>;
//   if (!user) return null; // redirect hone tak blank

//   return (
//     <TodoProvider>
//       <LayoutWrapper>
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-2xl font-bold">
//               Welcome, {user.name} 👋
//             </h1>
//             <p className="text-gray-600 mt-1">Your role: {user.role}</p>
//           </div>
//         </div>

//         {/*  ShadCN Tabs */}
//         <Tabs defaultValue="todos" className="w-full mt-6">
//           <TabsList className="flex space-x-2">
//             <TabsTrigger value="todos">Lists</TabsTrigger>
//             <TabsTrigger value="lists">Todos</TabsTrigger>
//           </TabsList>

//           <div className="mt-6">
//             <TabsContent value="todos">
//               <TodoSection />
//             </TabsContent>

//             <TabsContent value="lists">
//               <ListSection />
//             </TabsContent>
//           </div>
//         </Tabs>
//       </LayoutWrapper>
//     </TodoProvider>
//   );
// }







"use client";

import { useEffect, useState } from "react";
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

type UserType = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

type BoxType = {
  id: string;
  title: string;
  type: "list" | "todo";
};

export default function Dashboard() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [boxes, setBoxes] = useState<BoxType[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [type, setType] = useState<"list" | "todo">("list");
  const [openDialog, setOpenDialog] = useState(false);
  const [activeBoxId, setActiveBoxId] = useState<string | null>(null);

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
  if (!user) return null;

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    const newBox: BoxType = {
      id: Date.now().toString(),
      title: newTitle,
      type,
    };
    setBoxes([...boxes, newBox]);
    setNewTitle("");
    setOpenDialog(false); // create ke baad popup close ho jaye
  };

  const toggleBox = (id: string) => {
    if (activeBoxId === id) {
      setActiveBoxId(null); // agar already open hai toh band kar do
    } else {
      setActiveBoxId(id); // nahi toh open karo
    }
  };

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

          {/* Create Button with Dialog */}
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>Create</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Create New {type === "list" ? "List" : "Todo"}
                </DialogTitle>
              </DialogHeader>

              {/* Toggle for List / Todo */}
              <div className="flex gap-4 my-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={type === "list"}
                    onChange={() => setType("list")}
                  />
                  List
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={type === "todo"}
                    onChange={() => setType("todo")}
                  />
                  Todo
                </label>
              </div>

              {/* Input field */}
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

        {/* Show created Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {boxes.map((box) => (
            <Card
              key={box.id}
              className="p-4 cursor-pointer hover:shadow-lg flex flex-col items-center text-center"
              onClick={() => toggleBox(box.id)}
            >
              {/* Image icon */}
              <Image
                src={box.type === "list" ? "/list-icon.png" : "/todo-icon.png"}
                alt={box.type}
                width={40}
                height={40}
                className="mb-2"
              />
              <h2 className="font-semibold">{box.title}</h2>
              <p className="text-xs text-gray-500">{box.type}</p>
            </Card>
          ))}
        </div>

        {/* Open Section based on activeBoxId */}
        <div className="mt-6">
          {boxes.map(
            (box) =>
              activeBoxId === box.id && (
                <div key={box.id} className="mb-4">
                  {box.type === "list" && <ListSection />}
                  {box.type === "todo" && <TodoSection />}
                </div>
              )
          )}
        </div>
      </LayoutWrapper>
    </TodoProvider>
  );
}


