"use client";

import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

import useProjectStore from "@/app/hooks/useProjectsStore";
import { Task } from "@/app/data/data-types";
import { useOpenTaskDialog } from "@/app/hooks/useOepnTaskDialog";

type MenuItem = {
  icon: JSX.Element;
  label: string;
  className: string;
  value: string;
  separator?: undefined;
};

export default function TasksDropDown({ task }: { task: Task }) {
  const {
    actions: { setTaskToEdit },
  } = useProjectStore();

  const { setIsOpen, isOpen } = useOpenTaskDialog();
  //
  const menuItems: MenuItem[] = [
    { icon: <FaRegEdit />, label: "Edit Task", className: "", value: "edit" },

    {
      icon: <MdOutlineDelete className="text-lg" />,
      label: "Delete Task",
      className: "text-red-600",
      value: "delete",
    },
  ];

  function onClickedItem(item: MenuItem) {
    //update the taskToEdit state
    // setTaskToEdit(task);
    switch (item.value) {
      case "edit":
        setIsOpen(!isOpen);
        setTaskToEdit(task);
        break;
      case "delete":
        break;

      default:
        break;
    }
  }

  return (
    <div>
      <DropdownMenu>
        {/* Trigger drop down which is the more icon */}
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="poppins">
          {menuItems.map((item, index) =>
            item.separator ? (
              <DropdownMenuSeparator key={index} />
            ) : (
              <DropdownMenuItem
                onClick={() => {
                  onClickedItem(item);
                }}
                key={index}
                className={`flex items-center gap-1 p-[10px] ${item.className}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
