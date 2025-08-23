// "use client";
// import { useEffect, useState } from "react";
// import axiosClient from "@/lib/axiosClient";
// import ListItem from "@/components/todo/ListItem";
// import { Plus } from "lucide-react";

// type ListType = { _id: string; name: string; completed?: boolean };

// export default function ListSection() {
// 	const [lists, setLists] = useState<ListType[]>([]);
// 	const [newList, setNewList] = useState("");

// 	// Load lists on mount
// 	useEffect(() => {
// 		const fetchLists = async () => {
// 			try {
// 				const res = await axiosClient.get("/lists");
// 				setLists(res.data);
// 			} catch (err) {
// 				console.error("Error fetching lists:", err);
// 			}
// 		};
// 		fetchLists();
// 	}, []);

// 	// Add new list
// 	const addList = async () => {
// 		if (!newList.trim()) return;
// 		try {
// 			const res = await axiosClient.post("/lists", { name: newList });
// 			setLists((prev) => [res.data, ...prev]);
// 			setNewList("");
// 		} catch (err) {
// 			console.error("Error adding list:", err);
// 		}
// 	};

// 	// Update list
// 	const updateList = (updated: ListType) => {
// 		setLists((prev) => prev.map((l) => (l._id === updated._id ? updated : l)));
// 	};

// 	// Delete list
// 	const deleteList = (id: string) => {
// 		setLists((prev) => prev.filter((l) => l._id !== id));
// 	};

// 	return (
// 		<div className="grid gap-4 md:grid-cols-2 ">
// 			{/* Add List */}
// 			<section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 p-3 sm:p-5 md:p-6 lg:p-8 shadow-sm">
// 				<h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
// 					Add Todos
// 				</h2>
// 	            <div className="flex gap-3">
// 					<input
// 						value={newList}
// 						onChange={(e) => setNewList(e.target.value)}
// 						placeholder="Write your todo here"
// 						className="flex-1 rounded-lg border px-3 py-2 h-10 sm:h-12 md:h-14 lg:h-16 "
// 					/>
// 				</div>
// 				<div className="p-4">
// 					<button
// 						onClick={addList}
// 						className="rounded-lg bg-blue-600 text-white px-6 py-2 text-sm sm:text-base md:text-lg lg:text-xl flex items-center gap-2"
// 						>
						
// 						<Plus className="w-4 h-4 gap-2 "/>
// 						Create
						
// 					</button>
// 				</div>
			    
// 			</section>

// 			{/* List of Todos */}
// 			<section className="rounded-2xl border  p-3 sm:p-5 md:p-6 lg:p-8 shadow-sm mt-6">
// 				<h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
// 					Your Todos
// 				</h2>
// 				<ul className="flex flex-col gap-2 text-sm sm:text-base md:text-lg lg:text-xl">
// 					{lists.length === 0 && (
// 						<li className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-700">
// 							No todos yet. Add your first one!
// 						</li>
// 					)}
// 					{lists.map((list) => (
// 						<ListItem
// 							key={list._id}
// 							list={list}
// 							onUpdate={updateList}
// 							onDelete={deleteList}
// 						/>
// 					))}
// 				</ul>
// 			</section>
// 		</div>
// 	);
// }



"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import ListItem from "@/components/todo/ListItem";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ListType = { _id: string; name: string; completed?: boolean };

export default function ListSection() {
  const [lists, setLists] = useState<ListType[]>([]);
  const [newList, setNewList] = useState("");

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const res = await axiosClient.get("/api/lists");
        setLists(res.data);
      } catch (err) {
        console.error("Error fetching lists:", err);
      }
    };
    fetchLists();
  }, []);

  const addList = async () => {
    if (!newList.trim()) return;
    try {
      const res = await axiosClient.post("/api/lists", { name: newList });
      setLists((prev) => [res.data, ...prev]);
      setNewList("");
    } catch (err) {
      console.error("Error adding list:", err);
    }
  };

  const updateList = (updated: ListType) => {
    setLists((prev) => prev.map((l) => (l._id === updated._id ? updated : l)));
  };

  const deleteList = (id: string) => {
    setLists((prev) => prev.filter((l) => l._id !== id));
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Add Todo */}
      <section className="rounded-2xl border p-6 shadow-sm bg-gray-50 dark:bg-gray-800/40">
        <h2 className="text-xl font-semibold mb-4">Add Todo</h2>
		{/* <div  flex-col gap-4>
			<div className="flex  gap-3">
				<input
					value={newList}
					onChange={(e) => setNewList(e.target.value)}
					placeholder="Write your todo here"
					className="flex-1 rounded-lg border px-3 py-2 h-10"
				/>
			
			</div>
			<div  flex-col gap-4>
				<button
					onClick={addList}
					className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm flex items-center gap-1"
				>
					<Plus className="w-4 h-4" />
					Create
				</button>
			</div>

		</div> */}
		<div className="flex flex-col gap-4">
  		{/* Input Row */}
		<div className="flex gap-3">
			<input
			value={newList}
			onChange={(e) => setNewList(e.target.value)}
			placeholder="Write your todo here"
			className="flex-1 rounded-lg border px-3 py-2 h-10"
			/>
		</div>

		{/* Button Row */}
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

      {/* Todos Table */}
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
            {lists.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  No todos yet. Add your first one!
                </TableCell>
              </TableRow>
            ) : (
              lists.map((list, index) => (
                <ListItem
                  key={list._id}
                  list={list}
                  onUpdate={updateList}
                  onDelete={deleteList}
                  index={index + 1}
                />
              ))
            )}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
