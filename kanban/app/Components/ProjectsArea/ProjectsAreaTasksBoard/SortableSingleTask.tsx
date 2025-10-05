import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import TasksDropDown from "../../DropDowns/task-drop-down";
import { Task } from "@/app/data/data-types";
import { renderPriorityComponent } from "./functions";

interface SortableItemProps {
  task: Task;
  // boardId: string;
}

export const SortableSingleTask: React.FC<SortableItemProps> = ({ task }) => {
  const { taskTitle, priority, taskDescription, id } = task;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      // data: {
      //   boardId, // Pass the boardId to the drag event
      // },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="shadow-none mb-3"
    >
      {/* single task header */}
      <CardHeader className="p-4 ">
        <div className="flex justify-between items-center">
          {/* priority container */}
          <div
            className={`p-1 py-[4px] rounded-3xl px-2 pr-4 font-medium text-green-900
           flex items-center gap-1 text-sm ${
             renderPriorityComponent(priority)?.bgColor
           }`}
          >
            {/* priority icon */}
            {renderPriorityComponent(priority)?.icon}

            {/* priority */}
            <span
              className={`text-[12px] ${
                renderPriorityComponent(priority)?.textColor
              }`}
            >
              {priority}
            </span>
          </div>
          {/* more options drop down */}
          <TasksDropDown task={task} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 mt-1">
        <span className="font-bold text-lg">{taskTitle}</span>
        <span className="text-sm text-gray-600">{taskDescription}</span>
      </CardContent>
    </Card>
  );
};
