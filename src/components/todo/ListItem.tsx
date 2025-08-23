// "use client";
// import { useState } from "react";
// import axiosClient from "@/lib/axiosClient";
// import { Edit, Trash } from "lucide-react";

// type ListType = { _id: string; name: string; completed?: boolean };

// export default function ListItem({
//     list,
//     onUpdate,
//     onDelete,
//   }: {
//     list: ListType;
//     onUpdate: (l: ListType) => void;
//     onDelete: (id: string) => void;
//   }) {
//   const [editMode, setEditMode] = useState(false);
//   const [editName, setEditName] = useState(list.name);
//   const [confirmDelete, setConfirmDelete] = useState(false);
  

//   const toggleComplete = async () => {
//     const res = await axiosClient.put(`/lists/${list._id}`, {
//       completed: !list.completed,
//     });
//     onUpdate(res.data);
//   };

//   const saveEdit = async () => {
//     const res = await axiosClient.put(`/lists/${list._id}`, {
//       name: editName,
//     });
//     onUpdate(res.data);
//     setEditMode(false);
//   };

//   const deleteList = async () => {
//     await axiosClient.delete(`/lists/${list._id}`);
//     onDelete(list._id);
//   };

//   return (
//     <li
//       className={`flex items-center justify-between gap-3 rounded-xl border p-3 ${
//         list.completed
//           ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
//           : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
//       }`}
//     >
//       <div className="flex items-center gap-3 min-w-0">
//         <input
//           type="checkbox"
//           checked={!!list.completed}
//           onChange={toggleComplete}
//           className="h-5 w-5"
//         />
        
//         {editMode ? (
//           <input
//             value={editName}
//             onChange={(e) => setEditName(e.target.value)}
//             className="w-44 sm:w-56 rounded border px-2 py-1"
//           />
//         ) : (
//           <span
//             className={`truncate ${
//               list.completed ? "line-through text-gray-500" : "font-medium"
//             }`}
//           >
//             {list.name}
//           </span>
//         )}
//       </div>
//       <div className="flex items-center gap-2 shrink-0">
//         {editMode ? (
//           <>
//             <button
//               onClick={saveEdit}
//               className="bg-green-600 text-white px-3 py-1 text-sm rounded"
//             >
//               Save
//             </button>
//             <button
//               onClick={() => setEditMode(false)}
//               className="bg-gray-500 px-3 py-1 text-sm rounded"
//             >
//               Cancel
//             </button>
//           </>
//         ) : confirmDelete ? (
//           <div className="flex gap-2 items-center">
//             <span className="text-sm">Are you sure..? you want to delete...!</span>
//             <button
//               onClick={deleteList}
//               className="bg-red-600 text-white px-2 py-1 text-sm rounded"
//             >
//               Yes
//             </button>
//             <button
//               onClick={() => setConfirmDelete(false)}
//               className="bg-gray-500 px-2 py-1 text-sm rounded"
//             >
//               No
//             </button>
//           </div>
//         ) : (
//           <>
//             <button
//               onClick={() => setEditMode(true)}
//               className="text-blue-600"
//             >
//               <Edit size={16} />
//             </button>
//             <button
//               onClick={() => setConfirmDelete(true)}
//               className="text-red-600"
//             >
//               <Trash size={16} />
//             </button>
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
