

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import axiosClient from "@/lib/axiosClient";
import ListItem from "@/components/todo/ListItem";

import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ListType, GroupType } from "@/types";

type ListSectionProps = {
  expandedListGroupId: string | null; 
  listGroups: GroupType[];           
  scrollToTop: () => void;
  setExpandedListGroupId: (id: string | null) => void;
};

export default function ListSection({
  expandedListGroupId,
  listGroups,
  scrollToTop,
  setExpandedListGroupId,
}: ListSectionProps) {
  const [lists, setLists] = useState<ListType[]>([]);
  const [newList, setNewList] = useState("");
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (expandedListGroupId) {
      fetchLists(expandedListGroupId);
    }
  }, [expandedListGroupId]);

  const fetchLists = async (groupId: string) => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`/api/lists?groupId=${groupId}`);
      setLists(res.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching lists:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Failed to fetch lists");
      }
    } finally {
      setLoading(false);
    }
  };

  const addList = async () => {
    if (!newList.trim() || !expandedListGroupId) return;
    try {
      const res = await axiosClient.post(`/api/lists?groupId=${expandedListGroupId}`, {
        name: newList,
        groupId: expandedListGroupId,
      });
      setLists((prev) => [res.data, ...prev]);
      setNewList("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error adding list:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Failed to add list");
      }
    }
  };

  
  const updateList = (updated: Partial<ListType> & { _id: string }) => {
    setLists((prev) =>
      prev.map((l) =>
        l._id === updated._id ? { ...l, ...updated, groupId: l.groupId } : l
      )
    );
  };

  const deleteList = (id: string) => {
    setLists((prev) => prev.filter((l) => l._id !== id));
  };

  return (
    <div className="space-y-6">

      <div className="grid gap-6 md:grid-cols-2">
        
        <section className="rounded-2xl border p-6 shadow-sm bg-gray-50 dark:bg-gray-800/40">
          <h2 className="text-xl font-semibold mb-4">
            {lists.length === 0 ? "Add Your First List" : "Add More Lists"}
          </h2>

          <div className="flex flex-col gap-4">
            <input
              value={newList}
              onChange={(e) => setNewList(e.target.value)}
              placeholder="Write your list here"
              className="flex-1 rounded-lg border px-3 py-2 h-10"
            />

            <button
              onClick={addList}
              className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Create
            </button>
          </div>
        </section>

        
        <section className="rounded-2xl border p-6 shadow-sm bg-gray-50 dark:bg-gray-800/40">
          <h2 className="text-xl font-semibold mb-4">Your Lists</h2>
          {loading ? (
            <p className="text-center py-6">Loading lists...</p>
          ) : lists.length === 0 ? (
            <p className="text-gray-500 text-center">No lists added yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>List</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lists.map((list, index) => (
                  <ListItem
                    key={list._id}
                    list={list}
                    onUpdate={updateList}
                    onDelete={deleteList}
                    index={index + 1}
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

