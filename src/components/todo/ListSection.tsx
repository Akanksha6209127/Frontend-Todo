
// "use client";
// import { useEffect, useState } from "react";
// import axiosClient from "@/lib/axiosClient";
// import ListItem from "@/components/todo/ListItem";
// import { Plus } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// type ListType = { _id: string; name: string; completed?: boolean };

// type ListSectionProps = {
//   boxId: string;
// };


// export default function ListSection({boxId}:ListSectionProps) {
//   const [lists, setLists] = useState<ListType[]>([]);
//   const [newList, setNewList] = useState("");

//   useEffect(() => {
//     const fetchLists = async () => {
//       try {
//         const res = await axiosClient.get(`/api/lists?boxId=${boxId}`);
//         setLists(res.data);
//       } catch (err) {
//         console.error("Error fetching lists:", err);
//       }
//     };
//     fetchLists();
//   }, [boxId]);

  

//   const addList = async () => {
//     if (!newList.trim()) return;
//     try {
//         const res = await axiosClient.post("/api/lists", {
//           name: newList,
//           boxId,
//         });
//         setLists((prev) => [res.data, ...prev]);
//         setNewList("");
//       } catch (err: any) {
//       console.error("Error adding list:", err.response?.data || err.message);
//     }
//   };


//   const updateList = (updated: ListType) => {
//     setLists((prev) => prev.map((l) => (l._id === updated._id ? updated : l)));
//   };

//   const deleteList = (id: string) => {
//     setLists((prev) => prev.filter((l) => l._id !== id));
//   };

//   return (
//     <div className="grid gap-4 md:grid-cols-2">
//       {/* Add Todo */}
//       <section className="rounded-2xl border p-6 shadow-sm bg-gray-50 dark:bg-gray-800/40">
//         <h2 className="text-xl font-semibold mb-4">Add Todo</h2>
		
// 		<div className="flex flex-col gap-4">
//   		{/* Input Row */}
// 		<div className="flex gap-3">
// 			<input
// 			value={newList}
// 			onChange={(e) => setNewList(e.target.value)}
// 			placeholder="Write your todo here"
// 			className="flex-1 rounded-lg border px-3 py-2 h-10"
// 			/>
// 		</div>

// 		{/* Button Row */}
// 		<div>
// 			<button
// 			onClick={addList}
// 			className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm flex items-center gap-1"
// 			>
// 			<Plus className="w-4 h-4" />
// 			Create
// 			</button>
// 		</div>
// 		</div>

//       </section>

//       {/* Todos Table */}
//       <section className="rounded-2xl border p-6 shadow-sm">
//         <h2 className="text-xl font-semibold mb-4">Your Todos</h2>

//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[50px]">#</TableHead>
//               <TableHead>Todo</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {lists.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={4} className="text-center py-6">
//                   No todos yet. Add your first one!
//                 </TableCell>
//               </TableRow>
//             ) : (
//               lists.map((list, index) => (
//                 <ListItem
//                   key={list._id}
//                   list={list}
//                   onUpdate={updateList}
//                   onDelete={deleteList}
//                   index={index + 1}
//                 />
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </section>
//     </div>
//   );
// }


// "use client";
// import { useEffect, useState } from "react";
// import axiosClient from "@/lib/axiosClient";
// import ListItem from "@/components/todo/ListItem";
// import { Plus } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// type ListType = { _id: string; name: string; completed?: boolean };

// type ListSectionProps = {
//   boxId: string;
// };

// export default function ListSection({ boxId }: ListSectionProps) {
//   const [lists, setLists] = useState<ListType[]>([]);
//   const [newList, setNewList] = useState("");

//   // Fetch lists on mount
//   useEffect(() => {
//     const fetchLists = async () => {
//       try {
//         const res = await axiosClient.get(`/api/lists?boxId=${boxId}`);
//         setLists(res.data);
//       } catch (err) {
//         console.error("Error fetching lists:", err);
//       }
//     };
//     fetchLists();
//   }, [boxId]);

//   const addList = async () => {
//     if (!newList.trim()) return;
//     try {
//       const res = await axiosClient.post("/api/lists", {
//         name: newList,
//         boxId,
//       });
//       setLists((prev) => [res.data, ...prev]);
//       setNewList("");
//     } catch (err: any) {
//       console.error("Error adding list:", err.response?.data || err.message);
//     }
//   };

//   const updateList = (updated: ListType) => {
//     setLists((prev) => prev.map((l) => (l._id === updated._id ? updated : l)));
//   };

//   const deleteList = (id: string) => {
//     setLists((prev) => prev.filter((l) => l._id !== id));
//   };

//   return (
//     <div
//       className={`grid gap-4 ${
//         lists.length > 0 ? "md:grid-cols-2" : "grid-cols-1"
//       }`}
//     >
//       {/* Add Todo */}
//       <section className="rounded-2xl border p-6 shadow-sm bg-gray-50 dark:bg-gray-800/40">
//         <h2 className="text-xl font-semibold mb-4">Add Todo</h2>

//         <div className="flex flex-col gap-4">
//           {/* Input Row */}
//           <div className="flex flex-col gap-3">
//             <input
//               value={newList}
//               onChange={(e) => setNewList(e.target.value)}
//               placeholder="Write your todo here"
//               className="flex-1 rounded-lg border px-3 py-2 h-10"
//             />
//           </div>

//           {/* Button Row */}
//           <div>
//             <button
//               onClick={addList}
//               className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm flex items-center gap-1"
//             >
//               <Plus className="w-4 h-4" />
//               Create
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Your Todos - Only show if list exists */}
//       {lists.length > 0 && (
//         <section className="rounded-2xl border p-6 shadow-sm">
//           <h2 className="text-xl font-semibold mb-4">Your Todos</h2>

//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="w-[50px]">#</TableHead>
//                 <TableHead>Todo</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {lists.map((list, index) => (
//                 <ListItem
//                   key={list._id}
//                   list={list}
//                   onUpdate={updateList}
//                   onDelete={deleteList}
//                   index={index + 1}
//                 />
//               ))}
//             </TableBody>
//           </Table>
//         </section>
//       )}
//     </div>
//   );
// }





"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import ListItem from "@/components/todo/ListItem";
import Breadcrumb from "@/components/todo/Breadcrumb";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LayoutWrapper from "@/components/todo/LayoutWrapper";
import { TodoProvider } from "@/components/todo/TodoContext";

type ListType = { _id: string; name: string; completed?: boolean };

type ListSectionProps = {
  boxId: string;
};

export default function ListSection({ boxId }: ListSectionProps) {
  const [lists, setLists] = useState<ListType[]>([]);
  const [newList, setNewList] = useState("");

  // ✅ Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    // { label: "Dashboard", href: "/dashboard" },
    { label: "Todos" },
  ];

  // Fetch lists on mount
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const res = await axiosClient.get(`/api/lists?boxId=${boxId}`);
        setLists(res.data);
      } catch (err) {
        console.error("Error fetching lists:", err);
      }
    };
    fetchLists();
  }, [boxId]);

  const addList = async () => {
    if (!newList.trim()) return;
    try {
      const res = await axiosClient.post("/api/lists", {
        name: newList,
        boxId,
      });
      setLists((prev) => [res.data, ...prev]);
      setNewList("");
    } catch (err: any) {
      console.error("Error adding list:", err.response?.data || err.message);
    }
  };

  const updateList = (updated: ListType) => {
    setLists((prev) => prev.map((l) => (l._id === updated._id ? updated : l)));
  };

  const deleteList = (id: string) => {
    setLists((prev) => prev.filter((l) => l._id !== id));
  };

  return (
   
    <div className="space-y-6">
      {/* ✅ Breadcrumb Top pe */}
      <Breadcrumb items={breadcrumbItems} />

      <div
        className={`grid gap-4 ${
          lists.length > 0 ? "md:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {/* Add List Section */}
        <section className="rounded-2xl border p-6 shadow-sm bg-gray-50 dark:bg-gray-800/40">
          <h2 className="text-xl font-semibold mb-4">Add Todo</h2>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <input
                value={newList}
                onChange={(e) => setNewList(e.target.value)}
                placeholder="Write your todo here"
                className="flex-1 rounded-lg border px-3 py-2 h-10"
              />
            </div>

            <div>
              <button
                onClick={addList}
                className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Create
              </button>
            </div>
          </div>
        </section>

        {/* Lists Table */}
        {lists.length > 0 && (
          <section className="rounded-2xl border p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Your Todos</h2>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Todo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lists.map((list, index) => (
                  <ListItem
                    key={list._id}
                    list={list}
                    onUpdate={updateList}
                    onDelete={deleteList}
                    index={index + 1}
                  />
                ))}
              </TableBody>
            </Table>
          </section>
        )}
      </div>
    </div>
     
  );
}
