"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import useProjectStore from "@/app/hooks/useProjectsStore";

const options = ["A-Z", "Z-A"];

export function SortingDropDown() {
  const [selectedOption, setSelectedOption] = React.useState("A-Z");
  const {
    state: { selectedProject },
    actions: { updateProject },
  } = useProjectStore();

  // Function to sort tasks based on the selected option
  const sortTasks = async (option: string) => {
    if (selectedProject) {
      const sortedProjects = {
        ...selectedProject,
        boards: selectedProject.boards.map((board) => ({
          ...board,
          tasks: board.tasks.slice().sort((a, b) => {
            if (option === "A-Z") {
              return a.taskTitle.localeCompare(b.taskTitle);
            } else {
              return b.taskTitle.localeCompare(a.taskTitle);
            }
          }),
        })),
      };

      // Update the state with the sorted projects

      const result = await updateProject(sortedProjects);

      if (!result.success) {
        console.error(result.message);
      }
    }
  };

  // Effect to trigger sorting when the selected option changes
  React.useEffect(() => {
    sortTasks(selectedOption);
  }, [selectedOption]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <span className="font-medium text-sm">{selectedOption}</span>
          {selectedOption === "A-Z" ? (
            <IoMdArrowDown className="text-sm" />
          ) : (
            <IoMdArrowUp className="text-sm" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20 poppins">
        {options.map((option, index) => (
          <DropdownMenuCheckboxItem
            key={index}
            className="h-9"
            checked={selectedOption === option}
            onCheckedChange={() => setSelectedOption(option)}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
