
"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TodoSection from "@/components/todo/TodoSection";
import ListSection from "@/components/todo/ListSection";

export default function TodoTabs() {
  // States for Todo
  const [expandedTodoGroupId, setExpandedTodoGroupId] = useState<string | null>(null);
  const [todoGroups, setTodoGroups] = useState<any[]>([]); 

  // States for List
  const [expandedListGroupId, setExpandedListGroupId] = useState<string | null>(null);
  const [listGroups, setListGroups] = useState<any[]>([]); 

  // Scroll to top helper
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Tabs defaultValue="todos" className="w-full">
      <TabsList className="grid grid-cols-2 md:w-1/3">
        <TabsTrigger value="todos">Lists</TabsTrigger>
        <TabsTrigger value="lists">Todos</TabsTrigger>
      </TabsList>

      <TabsContent value="todos" className="mt-6">
        <TodoSection
          expandedTodoGroupId={expandedTodoGroupId}
          todoGroups={todoGroups}
          scrollToTop={scrollToTop}
          setExpandedTodoGroupId={setExpandedTodoGroupId}
        />
      </TabsContent>

      <TabsContent value="lists" className="mt-6">
        <ListSection
          expandedListGroupId={expandedListGroupId}
          listGroups={listGroups}
          scrollToTop={scrollToTop}
          setExpandedListGroupId={setExpandedListGroupId}
        />
      </TabsContent>
    </Tabs>
  );
}
