"use client";
import { useState } from "react";

type ConfirmDialogProps = {
  onConfirm: () => void;
  title?: string;
  message?: string;
  trigger: React.ReactNode;
};

export default function ConfirmDialog({
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete?",
  trigger,
}: ConfirmDialogProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className=" rounded-xl shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className="mb-4">{message}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-300 text-black px-4 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
