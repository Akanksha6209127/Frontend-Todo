"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function StartDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Select what you want to create</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <Button
            onClick={() => {
              setOpen(false);
              router.push("/todos");
            }}
            className="w-full"
          >
            Create Todo
          </Button>

          <Button
            onClick={() => {
              setOpen(false);
              router.push("/lists");
            }}
            className="w-full"
          >
            Create List
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
