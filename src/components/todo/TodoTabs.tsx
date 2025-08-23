"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TodoSection from "@/components/todo/TodoSection";
import ListSection from "@/components/todo/ListSection";

export default function TodoTabs() {
  return (
    <Tabs defaultValue="todos" className="w-full">
      <TabsList className="grid grid-cols-2 md:w-1/3">
        <TabsTrigger value="todos">Lists</TabsTrigger>
        <TabsTrigger value="lists">Todos</TabsTrigger>
      </TabsList>

      <TabsContent value="todos" className="mt-6">
        <TodoSection />
      </TabsContent>

      <TabsContent value="lists" className="mt-6">
        <ListSection />
      </TabsContent>
    </Tabs>
  );
}
