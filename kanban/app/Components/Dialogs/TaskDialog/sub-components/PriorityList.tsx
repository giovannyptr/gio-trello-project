import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@radix-ui/react-dropdown-menu";

import { IoIosArrowDown } from "react-icons/io";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { IconType } from "react-icons/lib";

import { IoCheckmark } from "react-icons/io5";
import { useFormContext } from "react-hook-form";
import { TaskDialogFormData } from "../taskDialogSchema";
import { Priority } from "@/app/data/data-types";
import { useEffect } from "react";

type PriorityItem = {
  name: Priority;
  icon: IconType;
  textColor: string;
  backgroundColor: string;
};

const PriorityListArray: PriorityItem[] = [
  {
    name: "Low",
    icon: RiArrowDownDoubleFill,
    textColor: "text-green-700",
    backgroundColor: "bg-green-500/10",
  },
  {
    name: "Medium",
    icon: MdKeyboardDoubleArrowRight,
    textColor: "text-yellow-700",
    backgroundColor: "bg-yellow-500/10",
  },
  {
    name: "High",
    icon: MdOutlineKeyboardDoubleArrowUp,
    textColor: "text-red-700",
    backgroundColor: "bg-red-500/10",
  },
];

export default function PriorityList() {
  //
  // Access the form context to manage form values and observe changes.
  const { setValue, watch, reset } = useFormContext<TaskDialogFormData>();

  // Get the currently selected priority name from the form.  If no priority is selected, default to "Low".
  const selectedPriorityName = watch("priority") || "Low";

  // Find the corresponding priority object from the PriorityListArray based on the selected name.
  const selectedPriority = PriorityListArray.find(
    (p) => p.name === selectedPriorityName
  );

  //set the value of the priority key with Low when the component is mounted, to avoid being undefined
  //
  useEffect(() => {
    setValue("priority", "Low");
  }, []);

  //function to render the selected priority
  function renderSelectedPriority() {
    if (selectedPriority) {
      return (
        <div className="flex items-center gap-2 ">
          <div
            className={`size-6 ${selectedPriority.backgroundColor} rounded-md flex 
              items-center justify-center text-lg ${selectedPriority.textColor} `}
          >
            {<selectedPriority.icon />}
          </div>
          <span className={`${selectedPriority.textColor}`}>
            {selectedPriority.name}
          </span>
        </div>
      );
    }
  }

  //function to render each drop down item
  function renderDropDownMenuItem(priorityItem: PriorityItem) {
    return (
      <div className="flex items-center gap-2">
        <div
          className={`size-6 ${priorityItem.backgroundColor} rounded-md flex 
              items-center justify-center text-lg ${priorityItem.textColor} `}
        >
          <priorityItem.icon />
        </div>
        <span className={`${priorityItem.textColor}`}>{priorityItem.name}</span>
      </div>
    );
  }

  //function to render a checked icon
  function isDropDownItemChecked(priorityItem: PriorityItem) {
    return <>{priorityItem.name === selectedPriorityName && <IoCheckmark />}</>;
  }

  //
  return (
    <div className="">
      {/* label */}
      <Label className="opacity-75 text-sm font-medium">Priority</Label>
      <div className="mt-2 w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              id="priority-dropdown"
              variant={"outline"}
              className="w-full h-11 flex justify-between"
            >
              {renderSelectedPriority()}
              <IoIosArrowDown className="text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)] poppins"
          >
            {PriorityListArray.map((priorityItem, index) => (
              <DropdownMenuItem
                className="flex justify-between items-center"
                onClick={() => {
                  setValue("priority", priorityItem.name);
                }}
                key={index}
              >
                {/* call the function to render each item */}
                {renderDropDownMenuItem(priorityItem)}
                {/* render the check box */}
                {isDropDownItemChecked(priorityItem)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
