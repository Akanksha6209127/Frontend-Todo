

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import axiosClient from "@/lib/axiosClient";
import TodoItem from "@/components/todo/TodoItem";
import { Plus } from "lucide-react";
import Breadcrumb from "@/components/todo/Breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TodoType = {
  _id: string;
  title: string;
  amount: number;
  unit: string;
  completed?: boolean;
};

type TodoSectionProps = {
  boxId: string;
};

export default function TodoSection({ boxId }: TodoSectionProps) {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [newAmount, setNewAmount] = useState<number>(1);
  const [newUnit, setNewUnit] = useState<string>("piece");
  const [loading, setLoading] = useState(false);

  const newUnits = [
    "piece", "kg", "g", "packet", "litre", "ml", "dozen", "meter",
    "box", "set", "bag", "cup", "bottle", "can", "mg", "quintal",
    "tonne", "tablespoon", "teaspoon",
  ];

  // Fetch todos when boxId changes
  useEffect(() => {
    fetchTodos();
  }, [boxId]);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`/api/todos?boxId=${boxId}`);
      setTodos(res.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching todos:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Failed to fetch todos");
      }
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const res = await axiosClient.post(`/api/todos?boxId=${boxId}`, {
        title: newTodo,
        amount: newAmount,
        unit: newUnit,
      });
      setTodos((prev) => [res.data, ...prev]);
      setNewTodo("");
      setNewAmount(1);
      setNewUnit("piece");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error adding todo:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Failed to add todo");
      }
    }
  };

  const updateTodo = (updated: TodoType) => {
    setTodos((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Lists" },
  ];

  return (
    <div className="space-y-6">
      {/* ✅ Breadcrumb always on top */}
      <Breadcrumb items={breadcrumbItems} />

      <div className="grid gap-6 md:grid-cols-2">
        {/* ✅ Add Todo Section (left side) */}
        <section className="border rounded-lg p-6 shadow-sm bg-gray-50 dark:bg-gray-800/40">
          <h2 className="text-xl font-semibold mb-4">
            {todos.length === 0 ? "Add Your First Item" : "Add More Items"}
          </h2>

          <div className="flex flex-col gap-4">
            <input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Write your todo here"
              className="border rounded px-3 py-2 h-10"
            />
            <input
              type="number"
              min={1}
              value={newAmount}
              onChange={(e) => setNewAmount(Number(e.target.value))}
              className="border rounded px-3 py-2 h-10"
            />
            <Select value={newUnit} onValueChange={setNewUnit}>
              <SelectTrigger className="w-full">
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

            <button
              onClick={addTodo}
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </section>

        {/* ✅ Todo List Section (right side) */}
        <section className="border rounded-lg p-6 shadow-sm bg-gray-50 dark:bg-gray-800/40">
          <h2 className="text-xl font-semibold mb-4">Your Items</h2>
          {loading ? (
            <p className="text-center py-6">Loading todos...</p>
          ) : todos.length === 0 ? (
            <p className="text-gray-500 text-center">No items added yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todos.map((todo, index) => (
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
    </div>
  );
}



