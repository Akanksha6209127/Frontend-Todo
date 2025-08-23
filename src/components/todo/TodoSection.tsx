


// "use client";
// import { useEffect, useState } from "react";
// import axiosClient from "@/lib/axiosClient";
// import TodoItem from "./TodoItem";
// import { Plus } from "lucide-react";

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
//     "piece",
//     "kg",
//     "g",
//     "packet",
//     "litre",
//     "ml",
//     "dozen",
//     "meter",
//     "box",
//     "set",
//     "bag",
//     "cup",
//     "bottle",
//     "can",
//     "mg",
//     "g",
//     "kg",
//     "quintal",
//     "tonne",
//     "ml",
//     "tablespoon",
//     "teaspoon",
//   ];
  
//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const fetchTodos = async () => {
//     try {
//       const res = await axiosClient.get("/todos");
//       setTodos(res.data);
//     } catch (error) {
//       console.error("Error fetching todos:", error);
//     }
//   };

  
//   const addTodo = async () => {
//     if (!newTodo.trim()) return;
//     try {
//       const res = await axiosClient.post("/todos", {
//         name: newTodo, 
//         title: newTodo,
//         amount: newAmount,
//         unit: newUnit,
//       });
//       setTodos((prev) => [res.data, ...prev]);
//       setNewTodo("");
//       setNewAmount(1);
//       setNewUnit("piece");
//     } catch (error) {
//       console.error("Error adding todo:", error);
//     }
//   };

  
//   const updateTodo = (updated: TodoType) => {
//     setTodos((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
//   };
  

  
//   const deleteTodo = (id: string) => {
//     setTodos((prev) => prev.filter((t) => t._id !== id));
//   };

//   return (
//     <div className="grid gap-6 md:grid-cols-2">
//       {/* Add Todo Section */}
//       <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 p-3 sm:p-5 md:p-6 lg:p-8 shadow-sm mt-6">
//         <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">Add Lists</h2>
//         <div className="flex flex-col gap-4">
//           <input
//             value={newTodo}
//             onChange={(e) => setNewTodo(e.target.value)}
//             placeholder="Write your todo here"
//             className="flex-1 rounded-lg border px-3 py-2 h-10 sm:h-12 md:h-14 lg:h-16"
//           />
//           <div className="flex gap-3">
//             <input
//               type="number"
//               min={1}
//               value={newAmount}
//               onChange={(e) => setNewAmount(Number(e.target.value))}
//               className="w-1/2 rounded-lg border px-3 py-2"
//             />
//             <select
//               value={newUnit}
//               onChange={(e) => setNewUnit(e.target.value)}
//               className="w-1/2 rounded-lg border px-3 py-2 bg-white-300"
//             >
//               {/* <option value="piece">piece</option>
//               <option value="kg">kg</option>
//               <option value="g">g</option>
//               <option value="packet">packet</option>
//               <option value="litre">litre</option> */}
//               <option value="">-- Select Unit --</option>
//               {newUnits.map((unit) => (
//                 <option key={unit} value={unit}>
//                   {unit}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="p-4  ">

//             <button
//               onClick={addTodo}
//               className="rounded-lg bg-blue-600 text-white px-6 py-2 text-sm sm:text-base md:text-lg lg:text-xl flex items-center gap-2"
              
//               >
//               <Plus className="w-4 h-4" />Add
              
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Todos List Section */}
//       <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 p-3 sm:p-5 md:p-6 lg:p-8 shadow-sm mt-6">
//         <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">Your Lists</h2>
//         <ul className="flex flex-col gap-2 text-sm sm:text-base md:text-lg lg:text-xl">
//           {todos.length === 0 && (
//             <li className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-700">
//               No todos yet. Add your first one!
//             </li>
//           )}
//           {todos.map((todo) => (
//             <TodoItem
//               key={todo._id}
//               todo={todo}
//               onUpdate={updateTodo}
//               onDelete={deleteTodo}
//             />
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// }



"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import TodoItem from "./TodoItem";
import { Plus } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

  const newUnits = [
    "piece",
    "kg",
    "g",
    "packet",
    "litre",
    "ml",
    "dozen",
    "meter",
    "box",
    "set",
    "bag",
    "cup",
    "bottle",
    "can",
    "mg",
    "quintal",
    "tonne",
    "tablespoon",
    "teaspoon",
  ];

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axiosClient.get("/api/todos");
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
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
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = (updated: TodoType) => {
    setTodos((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Add Todo Section */}
      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 p-6 shadow-sm mt-6">
        <h2 className="text-xl font-semibold mb-4">Add Lists</h2>
        <div className="flex flex-col gap-4">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Write your todo here"
            className="flex-1 rounded-lg border px-3 py-2 h-12"
          />
          <div className="flex gap-3">
            <input
              type="number"
              min={1}
              value={newAmount}
              onChange={(e) => setNewAmount(Number(e.target.value))}
              className="w-1/2 rounded-lg border px-3 py-2"
            />
            {/* <select
              value={newUnit}
              onChange={(e) => setNewUnit(e.target.value)}
              className="w-1/2 rounded-lg border px-3 py-2"
            >
              <option value="">-- Select Unit --</option>
              {newUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select> */}
            <Select value={newUnit} onValueChange={setNewUnit}>
              <SelectTrigger className="w-1/2 rounded-lg border px-3 py-2">
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
          <div  flex-col gap-4>
            <button
              onClick={addTodo}
              className="rounded-lg bg-blue-600 text-white px-6 py-2 text-base flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          

          
        </div>
          
      </section>

      {/* Todos List Section with Table */}
      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 p-6 shadow-sm mt-6">
        <h2 className="text-xl font-semibold mb-4">Your Lists</h2>

        {todos.length === 0 ? (
          <p className="text-gray-500">No todos yet. Add your first one!</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Done</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </section>
    </div>
  );
}
