"use client";

import React, { useState, Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { SingleIcon } from "./types";

interface IconDialogProps {
  allIcons: SingleIcon[];
  setAllIcons: Dispatch<SetStateAction<SingleIcon[]>>;
}

export default function IconDialogBox({
  allIcons,
  setAllIcons,
}: IconDialogProps) {
  const [openDialog, setOpenDialog] = useState(false);

  const SelectedIcon = allIcons.find((icon) => icon.isSelected)?.icon;

  function updateSelection(singleIconProp: SingleIcon) {
    setAllIcons((prevArray) =>
      prevArray.map((singleIcon) => {
        if (singleIcon.id === singleIconProp.id) {
          return { ...singleIcon, isSelected: true };
        }
        return { ...singleIcon, isSelected: false };
      })
    );
    setOpenDialog(!openDialog);
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="h-11 mb-1">
          {SelectedIcon && <SelectedIcon />}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select an Icon</DialogTitle>
          <DialogDescription>
            Pick an icon to represent your content. You can update it anytime.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full border rounded-lg p-3 flex flex-wrap gap-2">
          {allIcons.map((singleIcon, index) => (
            <div
              className={`rounded-md border p-3 hover:bg-primary hover:text-white ${
                singleIcon.isSelected
                  ? "bg-primary text-white border-none"
                  : "text-slate-400"
              }`}
              key={index}
              onClick={() => updateSelection(singleIcon)}
            >
              {<singleIcon.icon />}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
