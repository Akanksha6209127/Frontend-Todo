

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
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New {type === "todo" ? "Todo" : "List"}</DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 my-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" checked={type === "todo"} onChange={() => setType("todo")} />
            List
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" checked={type === "list"} onChange={() => setType("list")} />
            Todo
          </label>
        </div>

        <input
          type="text"
          placeholder={`Enter ${type} title`}
          className="w-full border p-2 rounded my-2"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <Button className="mt-4 w-full" onClick={handleSave}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}
