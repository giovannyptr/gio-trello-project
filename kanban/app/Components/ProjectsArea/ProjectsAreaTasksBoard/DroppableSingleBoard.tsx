import { Board } from "@/app/data/data-types";
import { SortableSingleTask } from "./SortableSingleTask";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { MdAssignmentAdd } from "react-icons/md";
import { useTheme } from "next-themes";

export default function DroppableSingleBoard({ board }: { board: Board }) {
  const { setNodeRef } = useDroppable({
    id: board.name,
  });
  //destructing the board prop
  const { name: boardName, tasks } = board;
  //storing the task's number
  const numberTasks = tasks.length;

  const { theme } = useTheme();

  //fetch projects data, when the project is loaded

  const bgColor = theme === "dark" ? "bg-gray-800" : "bg-gray-200";
  //jsx
  return (
    // parent container
    <div ref={setNodeRef} className="w-full h-full border p-4 rounded-2xl">
      {/* board header */}
      <div
        className={`flex justify-between ${bgColor} p-4 rounded-lg items-center`}
      >
        {/* header name */}
        <span className="font-medium text-md ">{boardName}</span>
        {/* container for tasks number */}
        <div className="size-6 rounded-full bg-primary text-white flex items-center justify-center">
          <span className="text-sm mt-[2px]">{numberTasks}</span>
        </div>
      </div>

      {/* if the board is empty render the component below */}
      {tasks.length === 0 && <EmptyBoardCard />}
      {/* otherwise render this below */}
      <div className="mt-7">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <SortableSingleTask key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

function EmptyBoardCard() {
  return (
    <div className="h-full  flex flex-col gap-4 items-center ">
      <div className="size-12 bg-gray-100 rounded-full flex justify-center items-center mt-12">
        <MdAssignmentAdd className="text-xl text-gray-600" />
      </div>
      <span className="text-center text-[15px] text-slate-600">
        No Tasks currently. Board is empty!
      </span>
    </div>
  );
}
