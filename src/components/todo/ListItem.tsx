
"use client";
import { useState } from "react";
import axiosClient from "@/lib/axiosClient";
import { Edit, Trash } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";

type ListType = { _id: string; name: string; completed?: boolean };

export default function ListItem({
  list,
  onUpdate,
  onDelete,
  index,
}: {
  list: ListType;
  onUpdate: (l: ListType) => void;
  onDelete: (id: string) => void;
  index: number;
}) {
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(list.name);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const toggleComplete = async () => {
    const res = await axiosClient.put(`/api/lists/${list._id}`, {
      completed: !list.completed,
    });
    onUpdate(res.data);
  };

  const saveEdit = async () => {
    const res = await axiosClient.put(`/api/lists/${list._id}`, {
      name: editName,
    });
    onUpdate(res.data);
    setEditMode(false);
  };

  const deleteList = async () => {
    await axiosClient.delete(`/api/lists/${list._id}`);
    onDelete(list._id);
  };

  return (
    <TableRow>
      <TableCell>{index}</TableCell>

      {/* Todo Name */}
      <TableCell>
        {editMode ? (
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="rounded border px-2 py-1 w-full"
          />
        ) : (
          <span
            className={`${
              list.completed ? "line-through text-gray-500" : "font-medium"
            }`}
          >
            {list.name}
          </span>
        )}
      </TableCell>

      {/* Status */}
      <TableCell>
        <input
          type="checkbox"
          checked={!!list.completed}
          onChange={toggleComplete}
          className="h-4 w-4"
        />
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        {editMode ? (
          <div className="flex justify-end gap-2">
            <button
              onClick={saveEdit}
              className="bg-green-600 text-white px-3 py-1 text-sm rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-500 px-3 py-1 text-sm rounded text-white"
            >
              Cancel
            </button>
          </div>
        ) : confirmDelete ? (
          <div className="flex justify-end gap-2 items-center">
            <span className="text-sm">Confirm?</span>
            <button
              onClick={deleteList}
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
          </div>
        ) : (
          <div className="flex justify-end gap-2">
            <button onClick={() => setEditMode(true)} className="text-blue-600">
              <Edit size={16} />
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              className="text-red-600"
            >
              <Trash size={16} />
            </button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}
