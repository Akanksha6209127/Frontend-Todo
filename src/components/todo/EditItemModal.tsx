
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit } from "lucide-react";
import axiosClient from "@/lib/axiosClient";

type TodoType = {
  _id: string;
  title: string;
  amount: number;
  unit: string;
};

export default function EditItemModal({
  item,
  onSave,
}: {
  item: TodoType;
  onSave: (updated: TodoType) => void;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [amount, setAmount] = useState(item.amount);
  const [unit, setUnit] = useState(item.unit);
  const [loading, setLoading] = useState(false);

  const newUnits = [
    "piece", "kg", "g", "packet", "litre", "ml", "dozen",
    "meter", "box", "set", "bag", "cup", "bottle",
    "can", "mg", "quintal", "tonne", "tablespoon", "teaspoon",
  ];

  // reset values when modal opens
  useEffect(() => {
    if (open) {
      setTitle(item.title);
      setAmount(item.amount);
      setUnit(item.unit);
    }
  }, [open, item]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.put(`/api/todos/${item._id}`, {
        title,
        amount,
        unit,
      });
      onSave(res.data);
      setOpen(false);
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Failed to update todo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/*  Edit button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="text-blue-600"
      >
        <Edit className="w-4 h-4" />
      </Button>

      {/*  Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            {/* Item Name */}
            <div>
              <label className="text-sm font-medium">Item Name</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter item name"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="text-sm font-medium">Amount</label>
              <Input
                type="number"
                min={1}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>

            {/* Unit (shadcn Select) */}
            <div>
              <label className="text-sm font-medium">Unit</label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Unit" />
                </SelectTrigger>
                <SelectContent>
                  {newUnits.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Footer buttons */}
          <DialogFooter className="mt-4">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
