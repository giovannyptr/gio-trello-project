import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Task } from "@/app/data/data-types";
import { renderPriorityComponent } from "./functions";

export default function DragOverlayTask({ task }: { task: Task }) {
  const { taskTitle, priority, taskDescription } = task;
  return (
    <Card className="shadow-none opacity-40">
      {/* single task header */}
      <CardHeader className="p-4 ">
        <div className="flex justify-between items-center">
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
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 mt-1">
        <span className="font-bold text-lg">{taskTitle}</span>
        <span className="text-sm text-gray-600">{taskDescription}</span>
      </CardContent>
    </Card>
  );
}
