
"use client";

import { ChevronRight, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { GroupType } from "@/types";

type BreadcrumbProps = {
  expandedListGroupId: string | null;
  expandedTodoGroupId: string | null;
  listGroups: GroupType[];
  todoGroups: GroupType[];
  scrollToTop: () => void;
  setExpandedListGroupId: (id: string | null) => void;
  setExpandedTodoGroupId: (id: string | null) => void;
};
export default function Breadcrumb({
  expandedListGroupId,
  expandedTodoGroupId,
  listGroups,
  todoGroups,
  scrollToTop,
  setExpandedListGroupId,
  setExpandedTodoGroupId,
}: BreadcrumbProps) {
  const router = useRouter();

  // Start with Home
  const crumbs: { label: string; onClick?: () => void }[] = [
    {
      label: "Home",
      onClick: () => {
        setExpandedListGroupId(null);
        setExpandedTodoGroupId(null);
        scrollToTop();
        router.push("/dashboard");
      },
    },
  ];

  //  Agar ListGroup expand hai
  if (expandedListGroupId) {
    const group = listGroups.find((g) => g._id === expandedListGroupId);
    if (group) {
      crumbs.push({ label: "Todo Group" });
      crumbs.push({ label: group.title });
    }
  }

  //  Agar TodoGroup expand hai
  if (expandedTodoGroupId) {
    const group = todoGroups.find((g) => g._id === expandedTodoGroupId);
    if (group) {
      crumbs.push({ label: "Shopping Group" });
      crumbs.push({ label: group.title });
    }
  }

  return (
    <nav className="flex items-center gap-2 text-white-700 mb-4 font-bold">
      {crumbs.map((c, i) => (
        <span
          key={i}
          className={`flex items-center gap-2 ${
            c.onClick ? "cursor-pointer hover:underline text-2xl" : ""
          }`}
          onClick={c.onClick}
        >
          {i === 0 && <Home size={25} className="mr-1" />}
          {i > 0 && <ChevronRight size={30} />}
          <span>{c.label}</span>
        </span>
      ))}
    </nav>
  );
}
