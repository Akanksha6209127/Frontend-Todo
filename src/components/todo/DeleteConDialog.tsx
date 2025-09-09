"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteConfirmDialog({ open, onConfirm, onCancel }: Props) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Are you sure you want to delete?
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 mt-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors duration-200"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border border-gray-400 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>

  );
}
