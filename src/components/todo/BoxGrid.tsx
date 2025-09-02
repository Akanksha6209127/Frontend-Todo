"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { X, Share2 } from "lucide-react";

type BoxType = { _id: string; title: string; type: "todo" | "list" };

type Props = {
  title: string;
  boxes: BoxType[];
  image: string;
  onExpand: (id: string) => void;
  onDelete: (id: string) => void;
  onShare: (box: BoxType) => void;
};

export default function BoxGrid({ title, boxes, image, onExpand, onDelete, onShare }: Props) {
  if (boxes.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="flex flex-wrap gap-3">
        {boxes.map((box) => (
          <Card
            key={box._id}
            className="relative p-4 flex flex-col items-center justify-between text-center w-44 h-28 shadow hover:shadow-lg cursor-pointer rounded-none"
            onClick={() => onExpand(box._id)}
          >
            <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(box._id);
                }}
                className="p-1 hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-red-600" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(box);
                }}
                className="p-1 hover:bg-gray-100"
              >
                <Share2 className="w-5 h-5 text-blue-600" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
              <Image src={image} alt={title} width={64} height={64} className="mb-1" />
              <h2 className="font-medium text-sm">{box.title}</h2>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
