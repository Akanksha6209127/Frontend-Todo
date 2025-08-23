// "use client";
// import { useState } from "react";
// import axiosClient from "@/lib/axiosClient";
// import { Edit, Trash } from "lucide-react";
// import EditItemModal from "./EditItemModal";

// type TodoType = { _id: string; title: string; amount: number; unit: string; completed?: boolean };

// export default function TodoItem({
//   todo,
//   onUpdate,
//   onDelete,
// }: {
//   todo: TodoType;
//   onUpdate: (t: TodoType) => void;
//   onDelete: (id: string) => void;
// }) {
//   const [editMode, setEditMode] = useState(false);
//   const [editTitle, setEditTitle] = useState(todo.title);
//   const [editAmount, setEditAmount] = useState(todo.amount);
//   const [editUnit, setEditUnit] = useState(todo.unit);
//   const [confirmDelete, setConfirmDelete] = useState(false);

//   const toggleComplete = async () => {
//     const res = await axiosClient.put(`/todos/${todo._id}`, { completed: !todo.completed });
//     onUpdate(res.data);
//   };

//   const saveEdit = async () => {
//     const res = await axiosClient.put(`/todos/${todo._id}`, {
//       title: editTitle,
//       amount: editAmount,
//       unit: editUnit,
//     });
//     onUpdate(res.data);
//     setEditMode(false);
//   };

//   const deleteTodo = async () => {
//     await axiosClient.delete(`/todos/${todo._id}`);
//     onDelete(todo._id);
//   };

//   return (
//     <li
//       className={`flex items-center justify-between gap-3 rounded-xl border p-3 ${
//         todo.completed
//           ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
//           : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
//       }`}
//     >
      
     
//       <div className="flex items-center gap-3 min-w-0">  
//         <input type="checkbox" checked={!!todo.completed} onChange={toggleComplete} className="h-5 w-5" />
//         {editMode ? (
//           <input
//             value={editTitle}
//             onChange={(e) => setEditTitle(e.target.value)}
//             className="w-44 sm:w-56 rounded border px-2 py-1"
//           />
//         ) : (
//           <span
//             className={`truncate ${todo.completed ? "line-through text-gray-500" : "font-medium"}`}
//             title={`${todo.title} — ${todo.amount} ${todo.unit}`}
//           >
//             {todo.title} — {todo.amount} {todo.unit}
//           </span>
//         )}
//       </div>

//       <div className="flex items-center gap-2 shrink-0">
      
//         {editMode ? (
//           <>
            
             
//             <button 
//               onClick={saveEdit}
              
//               className="bg-green-600 text-white px-3 py-1 text-sm rounded">
//                 Save
//             </button>
//             <button onClick={() => setEditMode(false)} className="bg-gray-500 px-3 py-1 text-sm rounded">Cancel</button>
//           </>
//         ) : confirmDelete ? (
//           <div className="flex gap-2 items-center">
//             <span className="text-sm">Are you sure..? you want to delete...!</span>
//             <button onClick={deleteTodo} className="bg-red-600 text-white px-2 py-1 text-sm rounded">Yes</button>
//             <button onClick={() => setConfirmDelete(false)} className="bg-gray-500 px-2 py-1 text-sm rounded">No</button>
//           </div>
//         ) : (
//           <>
//             <EditItemModal item={todo} onSave={onUpdate} />
            
//             <button onClick={() => setConfirmDelete(true)} className="text-red-600"><Trash size={16} /></button>
//           </>
//         )}
//       </div>
//     </li>
    
//   );
// }




"use client";
import { useState } from "react";
import axiosClient from "@/lib/axiosClient";
import { Edit, Trash } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import EditItemModal from "./EditItemModal"; // 👈 import modal

type TodoType = {
  _id: string;
  title: string;
  amount: number;
  unit: string;
  completed?: boolean;
};

export default function TodoItem({
  todo,
  onUpdate,
  onDelete,
}: {
  todo: TodoType;
  onUpdate: (t: TodoType) => void;
  onDelete: (id: string) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const toggleComplete = async () => {
    const res = await axiosClient.put(`/api/todos/${todo._id}`, {
      completed: !todo.completed,
    });
    onUpdate(res.data);
  };

  const deleteTodo = async () => {
    await axiosClient.delete(`/api/todos/${todo._id}`);
    onDelete(todo._id);
  };

  return (
    <TableRow
      className={todo.completed ? "bg-green-50 dark:bg-green-900/20" : ""}
    >
      {/*  Complete checkbox */}
      <TableCell>
        <input
          type="checkbox"
          checked={!!todo.completed}
          onChange={toggleComplete}
          className="h-5 w-5"
        />
      </TableCell>

      {/*  Title */}
      <TableCell
        className={`${
          todo.completed ? "line-through text-gray-500" : "font-medium"
        }`}
      >
        {todo.title}
      </TableCell>

      {/*  Amount */}
      <TableCell>{todo.amount}</TableCell>

      {/*  Unit */}
      <TableCell>{todo.unit}</TableCell>

      {/*  Actions */}
      <TableCell className="text-right space-x-2">
        {confirmDelete ? (
          <>
            <span className="text-sm">Delete?</span>
            <button
              onClick={deleteTodo}
              className="bg-red-600 text-white px-2 py-1 text-sm rounded"
            >
              Yes
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="bg-gray-500 text-white px-2 py-1 text-sm rounded"
            >
              No
            </button>
          </>
        ) : (
          <>
            {/* 👇 Edit button opens modal */}
            <EditItemModal item={todo} onSave={onUpdate} />

            {/* 👇 Delete button */}
            <button
              onClick={() => setConfirmDelete(true)}
              className="text-red-600"
            >
              <Trash size={16} />
            </button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}
