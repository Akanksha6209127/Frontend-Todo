"use client";
import { useState } from "react";
import axiosClient from "@/lib/axiosClient";
import { Edit, Trash } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import EditItemModal from "./EditItemModal"; // 

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
           
            <EditItemModal item={todo} onSave={onUpdate} />

            
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





