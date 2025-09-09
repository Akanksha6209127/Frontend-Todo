

"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  onCreate: (title: string, type: "todo" | "list") => void;
};

export default function CreateBoxDialog({ onCreate }: Props) {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [type, setType] = useState<"todo" | "list">("todo");
 

  const handleSave = () => {
    if (!newTitle.trim() ) {
      alert("Title are required");
      return;
    }

    onCreate(newTitle.trim(), type);
    setNewTitle("");
    setType("todo" ); 
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">Create</Button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Create New {type === "todo" ? "Todo" : "List"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 my-2">
          <label className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300">
            <input
              type="radio"
              checked={type === "todo"}
              onChange={() => setType("todo")}
              className="accent-blue-600 dark:accent-blue-400"
            />
            List
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300">
            <input
              type="radio"
              checked={type === "list"}
              onChange={() => setType("list")}
              className="accent-green-600 dark:accent-green-400"
            />
            Todo
          </label>
        </div>

        {/* Input box */}
        <input
          type="text"
          placeholder={`Enter ${type} title`}
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 
                    text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 
                    p-2 rounded my-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        {/* Save button */}
        <Button
          className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700 
                    dark:bg-blue-500 dark:hover:bg-blue-600"
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}
    