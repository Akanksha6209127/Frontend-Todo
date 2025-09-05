
"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { X, Share2 } from "lucide-react";
import type { GroupType } from "@/types";

type Props = {
  title: string;
  groups: GroupType[]; //  ab BoxType nahi, GroupType
  image: string;
  onExpand: (id: string) => void;
  onDelete: (id: string) => void;
  onShare: (group: GroupType) => void;
};

export default function BoxGrid({ title, groups, image, onExpand, onDelete, onShare }: Props) {
  if (groups.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="flex flex-wrap gap-3">
        {groups.map((group) => (
          <Card
            key={group._id}
            className="relative p-4 flex flex-col items-center justify-between text-center w-44 h-28 shadow hover:shadow-lg cursor-pointer rounded-none"
            onClick={() => onExpand(group._id)} //  groupId
          >
            <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(group._id); //  groupId
                }}
                className="p-1 hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-red-600" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(group); //  pass group
                }}
                className="p-1 hover:bg-gray-100"
              >
                <Share2 className="w-5 h-5 text-blue-600" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
              <Image src={image} alt={title} width={64} height={64} className="mb-1" />
              <h2 className="font-medium text-sm">{group.title}</h2>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
