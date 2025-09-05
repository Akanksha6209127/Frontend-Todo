// "use client";

// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import TodoSection from "@/components/todo/TodoSection";
// import ListSection from "@/components/todo/ListSection";
// import { TodoProvider } from "@/components/todo/TodoContext";
// import LayoutWrapper from "@/components/todo/LayoutWrapper";
// import { useState } from "react";



// export default function TodoTabs() {
// 	const [expandedBoxId, setExpandedBoxId] = useState<string | null>(null);

//   // ✅ State for all boxes (mock initially, can fetch later)
// 	const [boxes, setBoxes] = useState<{ _id: string; title: string; type: "todo" | "list" }[]>([]);

// 	// ✅ Scroll to top function
// 	const scrollToTop = () => {
// 		window.scrollTo({ top: 0, behavior: "smooth" });
// 	};
// 	return (
// 		<LayoutWrapper>
// 			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
// 				<h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
// 					Lists and Todos
// 				</h2>
				
// 			</div>

// 			<TodoProvider>
// 				<Tabs defaultValue="todos" className="w-full">
// 					<TabsList className="grid grid-cols-2 sm:grid-cols-2 md:w-1/3 gap-2  rounded-lg p-1 ">
// 						<TabsTrigger
// 							value="todos"
// 							className="text-sm sm:text-base md:text-lg overflow-hidden"
// 						>
// 							Lists
// 						</TabsTrigger>
// 						<TabsTrigger
// 							value="lists"
// 							className="text-sm sm:text-base md:text-lg overflow-hidden "
// 						>
// 							Todos
// 						</TabsTrigger>
// 					</TabsList>

// 					<TabsContent value="todos" className="mt-6">
// 						<TodoSection
// 							expandedTodoGroupId={expandedTodoGroupId}
// 							todoGroups={todoGroups}
// 							scrollToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
// 							setExpandedTodoGroupId={setExpandedTodoGroupId}
						
						
// 						/>
// 					</TabsContent>

// 					<TabsContent value="lists" className="mt-6">
// 						<ListSection
// 							expandedListGroupId={expandedListGroupId}
// 							listGroups={listGroups}
// 							scrollToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
// 							setExpandedListGroupId={setExpandedListGroupId}
// 						/>
// 					</TabsContent>
// 				</Tabs>
// 			</TodoProvider>
// 		</LayoutWrapper>
// 	);
// }


"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TodoSection from "@/components/todo/TodoSection";
import ListSection from "@/components/todo/ListSection";
import { TodoProvider } from "@/components/todo/TodoContext";
import LayoutWrapper from "@/components/todo/LayoutWrapper";
import { useState } from "react";

export default function TodoTabs() {
  //  States for expanded groups
  const [expandedTodoGroupId, setExpandedTodoGroupId] = useState<string | null>(null);
  const [expandedListGroupId, setExpandedListGroupId] = useState<string | null>(null);

  //  States for groups
  const [todoGroups, setTodoGroups] = useState<[]>([]);
  const [listGroups, setListGroups] = useState<[]>([]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <LayoutWrapper>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
          Lists and Todos
        </h2>
      </div>

      <TodoProvider>
        <Tabs defaultValue="todos" className="w-full">
          <TabsList className="grid grid-cols-2 sm:grid-cols-2 md:w-1/3 gap-2 rounded-lg p-1">
            <TabsTrigger
              value="todos"
              className="text-sm sm:text-base md:text-lg overflow-hidden"
            >
              Lists
            </TabsTrigger>
            <TabsTrigger
              value="lists"
              className="text-sm sm:text-base md:text-lg overflow-hidden"
            >
              Todos
            </TabsTrigger>
          </TabsList>

          {/* ✅ Todos */}
          <TabsContent value="todos" className="mt-6">
            <TodoSection
              expandedTodoGroupId={expandedTodoGroupId}
              todoGroups={todoGroups}
              scrollToTop={scrollToTop}
              setExpandedTodoGroupId={setExpandedTodoGroupId}
            />
          </TabsContent>

          {/* ✅ Lists */}
          <TabsContent value="lists" className="mt-6">
            <ListSection
              expandedListGroupId={expandedListGroupId}
              listGroups={listGroups}
              scrollToTop={scrollToTop}
              setExpandedListGroupId={setExpandedListGroupId}
            />
          </TabsContent>
        </Tabs>
      </TodoProvider>
    </LayoutWrapper>
  );
}
