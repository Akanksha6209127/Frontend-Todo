"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axiosClient from "@/lib/axiosClient"; //  apna banaya hua axiosClient import karlo

export type List = { _id: string; name: string; completed?: boolean };
export type Todo = { _id: string; title: string; completed?: boolean };

type TodoContextType = {
  lists: List[];
  todos: Todo[];
  addList: (name: string) => Promise<void>;
  deleteList: (id: string) => Promise<void>;
  updateList: (id: string, name: string) => Promise<void>;
  toggleList: (id: string) => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  updateTodo: (id: string, title: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [lists, setLists] = useState<List[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);

  //  ab api wahi hoga jo tumne axiosClient banaya hai
  const api = axiosClient;

  // Load from API
  useEffect(() => {
    (async () => {
      try {
        const [listsRes, todosRes] = await Promise.all([
          api.get("/api/lists"),
          api.get("/api/todos"),
        ]);
        setLists(listsRes.data);
        setTodos(todosRes.data);
      } catch (err) {
        console.error(" Error fetching data:", err);
      }
    })();
  }, []);

  //  CRUD for Lists
  const addList = async (name: string) => {
    const res = await api.post("/api/lists", { name });
    setLists((prev) => [...prev, res.data]);
  };

  const deleteList = async (id: string) => {
    await api.delete(`/api/lists/${id}`);
    setLists((prev) => prev.filter((l) => l._id === id));
  };

  const updateList = async (id: string, name: string) => {
    const res = await api.put(`/api/lists/${id}`, { name });
    setLists((prev) => prev.map((l) => (l._id === id ? res.data : l)));
  };

  const toggleList = async (id: string) => {
    const list = lists.find((l) => l._id === id);
    if (!list) return;
    const res = await api.put(`/api/lists/${id}`, { completed: !list.completed });
    setLists((prev) => prev.map((l) => (l._id === id ? res.data : l)));
  };

  //  CRUD for Todos
  const addTodo = async (title: string) => {
    const res = await api.post("/api/todos", { title });
    setTodos((prev) => [...prev, res.data]);
  };

  const deleteTodo = async (id: string) => {
    await api.delete(`/api/todos/${id}`);
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  const updateTodo = async (id: string, title: string) => {
    const res = await api.put(`/api/todos/${id}`, { title });
    setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t._id === id);
    if (!todo) return;
    const res = await api.put(`/api/todos/${id}`, { completed: !todo.completed });
    setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
  };

  return (
    <TodoContext.Provider
      value={{
        lists,
        todos,
        addList,
        deleteList,
        updateList,
        toggleList,
        addTodo,
        deleteTodo,
        updateTodo,
        toggleTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodoContext must be inside TodoProvider");
  return ctx;
};

