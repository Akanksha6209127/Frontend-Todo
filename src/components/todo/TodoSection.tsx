
// // "use client";
// // import { useEffect, useState } from "react";
// // import axiosClient from "@/lib/axiosClient";
// // import TodoItem from "@/components/todo/TodoItem";
// // import { Plus } from "lucide-react";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table";

// // type TodoType = {
// //   _id: string;
// //   title: string;
// //   amount: number;
// //   unit: string;
// //   completed?: boolean;
// // };

// // export default function TodoSection() {
// //   const [todos, setTodos] = useState<TodoType[]>([]);
// //   const [newTodo, setNewTodo] = useState("");
// //   const [newAmount, setNewAmount] = useState<number>(1);
// //   const [newUnit, setNewUnit] = useState<string>("piece");

// //   const newUnits = [
// //     "piece", "kg", "g", "packet", "litre", "ml", "dozen", "meter", "box",
// //     "set", "bag", "cup", "bottle", "can", "mg", "g", "kg", "quintal", "tonne",
// //     "ml", "tablespoon", "teaspoon",
// //   ];

// //   useEffect(() => {
// //     fetchTodos();
// //   }, []);

// //   const fetchTodos = async () => {
// //     try {
// //       const res = await axiosClient.get("/api/todos"); // Correct endpoint
// //       setTodos(res.data);
// //     } catch (error) {
// //       console.error("Error fetching todos:", error);
// //     }
// //   };

// //   const addTodo = async () => {
// //     if (!newTodo.trim()) return;
// //     try {
// //       const res = await axiosClient.post("/api/todos", {
// //         title: newTodo,
// //         amount: newAmount,
// //         unit: newUnit,
// //       });
// //       setTodos((prev) => [res.data, ...prev]);
// //       setNewTodo("");
// //       setNewAmount(1);
// //       setNewUnit("piece");
// //     } catch (error) {
// //       console.error("Error adding todo:", error);
// //     }
// //   };

// //   const updateTodo = (updated: TodoType) => {
// //     setTodos((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
// //   };

// //   const deleteTodo = (id: string) => {
// //     setTodos((prev) => prev.filter((t) => t._id !== id));
// //   };

// //   return (
// //     <div className="grid gap-4 md:grid-cols-2">
// //       {/* Add Todo Section */}
// //       <section className="rounded-2xl border p-6 shadow-sm bg-gray-50 dark:bg-gray-800/40">
// //         <h2 className="text-xl font-semibold mb-4">Add Lists</h2>
// //         <div className="flex flex-col gap-4">
// //           <div className="flex gap-3">
// //             <input
// //               value={newTodo}
// //               onChange={(e) => setNewTodo(e.target.value)}
// //               placeholder="Write your todo here"
// //               className="flex-1 rounded-lg border px-3 py-2 h-10"
// //             />
// //             <input
// //               type="number"
// //               min={1}
// //               value={newAmount}
// //               onChange={(e) => setNewAmount(Number(e.target.value))}
// //               className="w-24 rounded-lg border px-3 py-2"
// //             />
            
// //             <Select
// //               value={newUnit}
// //               onValueChange={(value) => setNewUnit(value)}
// //             >
// //               <SelectTrigger className="w-24">
// //                 <SelectValue placeholder="-- Select Unit --" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 {newUnits.map((unit) => (
// //                   <SelectItem key={unit} value={unit}>
// //                     {unit}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>



// //           </div>
          

// //           <div>
// //             <button
// //             onClick={addTodo}
// //             className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm flex items-center gap-1"
// //             >
// //             <Plus className="w-4 h-4" />
// //             Add
// //             </button>
// //           </div>
        
// //         </div>

        
          
// //       </section>

// //       {/* Todos Table Section */}
// //       <section className="rounded-2xl border p-6 shadow-sm bg-gray-50 dark:bg-gray-800/40">
// //         <h2 className="text-xl font-semibold mb-4">Your Lists</h2>
// //         <Table>
// //           <TableHeader>
// //             <TableRow>
// //               <TableHead className="w-[50px]">#</TableHead>
// //               <TableHead>Todo</TableHead>
// //               <TableHead>Amount</TableHead>
// //               <TableHead>Unit</TableHead>
              
// //               <TableHead className="text-right">Actions</TableHead>
// //             </TableRow>
// //           </TableHeader>
// //           <TableBody>
// //             {todos.length === 0 ? (
// //               <TableRow>
// //                 <TableCell colSpan={6} className="text-center py-6">
// //                   No todos yet. Add your first one!
// //                 </TableCell>
// //               </TableRow>
// //             ) : (
// //               todos.map((todo, index) => (
// //                 <TodoItem
// //                   key={todo._id}
// //                   todo={todo}
// //                   onUpdate={updateTodo}
// //                   onDelete={deleteTodo}
// //                   // index={index + 1}
// //                 />
// //               ))
// //             )}
// //           </TableBody>
// //         </Table>
// //       </section>
// //     </div>
// //   );
// // }


// "use client";

// import { useEffect, useState } from "react";
// import axiosClient from "@/lib/axiosClient";
// import TodoItem from "@/components/todo/TodoItem";
// import { Plus } from "lucide-react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// type TodoType = {
//   _id: string;
//   title: string;
//   amount: number;
//   unit: string;
//   completed?: boolean;
// };

// export default function TodoSection() {
//   const [todos, setTodos] = useState<TodoType[]>([]);
//   const [newTodo, setNewTodo] = useState("");
//   const [newAmount, setNewAmount] = useState<number>(1);
//   const [newUnit, setNewUnit] = useState<string>("piece");

//   const newUnits = [
//     "piece", "kg", "g", "packet", "litre", "ml", "dozen", "meter", "box",
//     "set", "bag", "cup", "bottle", "can", "mg", "quintal", "tonne", "tablespoon", "teaspoon",
//   ];

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const fetchTodos = async () => {
//     try {
//       const res = await axiosClient.get("/api/todos"); // token automatically attach hoga
//       setTodos(res.data);
//     } catch (error: any) {
//       console.error("Error fetching todos:", error.response?.data || error.message);
//     }
//   };

//   // const addTodo = async () => {
//   //   if (!newTodo.trim()) return;

//   //   try {
//   //     const res = await axiosClient.post("/api/todos", {
//   //       title: newTodo,
//   //       amount: newAmount,
//   //       unit: newUnit,
//   //     });

//   //     setTodos((prev) => [res.data, ...prev]);
//   //     setNewTodo("");
//   //     setNewAmount(1);
//   //     setNewUnit("piece");
//   //   } catch (error: any) {
//   //     console.error("Error adding todo:", error.response?.data || error.message);
//   //     alert(error.response?.data?.message || "Failed to add todo");
//   //   }
//   // };

//   const addTodo = async () => {
//   if (!newTodo.trim()) return;

//   try {
//     // Make POST request with axiosClient (token automatically attached from cookie)
//     const res = await axiosClient.post("/api/todos", {
//       title: newTodo,
//       amount: newAmount,
//       unit: newUnit,
//     });

//     // Add new todo to state
//     setTodos((prev) => [res.data, ...prev]);

//     // Reset input fields
//     setNewTodo("");
//     setNewAmount(1);
//     setNewUnit("piece");
//   } catch (error: unknown) {
//     // TypeScript-safe error handling
//       if (axiosClient.isAxiosError(error)) {
//         console.error("Error adding todo:", error.response?.data || error.message);
//         alert(error.response?.data?.message || "Failed to add todo");
//       } else {
//         console.error("Unexpected error:", error);
//         alert("An unexpected error occurred");
//       }
//     }
//   };


//   const updateTodo = (updated: TodoType) => {
//     setTodos((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
//   };

//   const deleteTodo = (id: string) => {
//     setTodos((prev) => prev.filter((t) => t._id !== id));
//   };

//   return (
//     <div className="grid gap-4 md:grid-cols-2">
//       {/* Add Todo Section */}
//       <section className="rounded-2xl border p-6 shadow-sm bg-gray-50 dark:bg-gray-800/40">
//         <h2 className="text-xl font-semibold mb-4">Add Lists</h2>
//         <div className="flex flex-col gap-4">
//           <div className="flex gap-3">
//             <input
//               value={newTodo}
//               onChange={(e) => setNewTodo(e.target.value)}
//               placeholder="Write your todo here"
//               className="flex-1 rounded-lg border px-3 py-2 h-10"
//             />
//             <input
//               type="number"
//               min={1}
//               value={newAmount}
//               onChange={(e) => setNewAmount(Number(e.target.value))}
//               className="w-24 rounded-lg border px-3 py-2"
//             />
            
//             <Select value={newUnit} onValueChange={setNewUnit}>
//               <SelectTrigger className="w-24">
//                 <SelectValue placeholder="-- Select Unit --" />
//               </SelectTrigger>
//               <SelectContent>
//                 {newUnits.map((unit) => (
//                   <SelectItem key={unit} value={unit}>
//                     {unit}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <button
//               onClick={addTodo}
//               className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm flex items-center gap-1"
//             >
//               <Plus className="w-4 h-4" />
//               Add
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Todos Table Section */}
//       <section className="rounded-2xl border p-6 shadow-sm bg-gray-50 dark:bg-gray-800/40">
//         <h2 className="text-xl font-semibold mb-4">Your Lists</h2>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[50px]">#</TableHead>
//               <TableHead>Todo</TableHead>
//               <TableHead>Amount</TableHead>
//               <TableHead>Unit</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {todos.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={6} className="text-center py-6">
//                   No todos yet. Add your first one!
//                 </TableCell>
//               </TableRow>
//             ) : (
//               todos.map((todo, index) => (
//                 <TodoItem
//                   key={todo._id}
//                   todo={todo}
//                   onUpdate={updateTodo}
//                   onDelete={deleteTodo}
//                 />
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </section>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import axiosClient from "@/lib/axiosClient";
import TodoItem from "@/components/todo/TodoItem";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TodoType = {
  _id: string;
  title: string;
  amount: number;
  unit: string;
  completed?: boolean;
};



export default function TodoSection() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [newAmount, setNewAmount] = useState<number>(1);
  const [newUnit, setNewUnit] = useState<string>("piece");
  const [loading, setLoading] = useState(false);

  const newUnits = [
    "piece", "kg", "g", "packet", "litre", "ml", "dozen", "meter", "box",
    "set", "bag", "cup", "bottle", "can", "mg", "quintal", "tonne", "tablespoon", "teaspoon",
  ];

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/api/todos"); // token from cookies attached
      setTodos(res.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching todos:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Failed to fetch todos");
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      const res = await axiosClient.post("/api/todos", {
        title: newTodo,
        amount: newAmount,
        unit: newUnit,
      });

      setTodos((prev) => [res.data, ...prev]);
      setNewTodo("");
      setNewAmount(1);
      setNewUnit("piece");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error adding todo:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Failed to add todo");
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred");
      }
    }
  };

  const updateTodo = (updated: TodoType) => {
    setTodos((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Add Todo Section */}
      <section className="rounded-2xl border p-6 shadow-sm bg-gray-50 dark:bg-gray-800/40">
        <h2 className="text-xl font-semibold mb-4">Add Lists</h2>
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Write your todo here"
              className="flex-1 rounded-lg border px-3 py-2 h-10"
            />
            <input
              type="number"
              min={1}
              value={newAmount}
              onChange={(e) => setNewAmount(Number(e.target.value))}
              className="w-24 rounded-lg border px-3 py-2"
            />
            <Select value={newUnit} onValueChange={setNewUnit}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="-- Select Unit --" />
              </SelectTrigger>
              <SelectContent>
                {newUnits.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <button
              onClick={addTodo}
              className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
      </section>

      {/* Todos Table Section */}
      <section className="rounded-2xl border p-6 shadow-sm bg-gray-50 dark:bg-gray-800/40">
        <h2 className="text-xl font-semibold mb-4">Your Lists</h2>
        {loading ? (
          <p className="text-center py-6">Loading todos...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Todo</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    No todos yet. Add your first one!
                  </TableCell>
                </TableRow>
              ) : (
                todos.map((todo, index) => (
                  <TodoItem
                    key={todo._id}
                    todo={todo}
                    onUpdate={updateTodo}
                    onDelete={deleteTodo}
                  />
                ))
              )}
            </TableBody>
          </Table>
        )}
      </section>
    </div>
  );
}


