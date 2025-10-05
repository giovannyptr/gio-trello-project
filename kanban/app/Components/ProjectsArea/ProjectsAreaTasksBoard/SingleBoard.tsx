import { Board } from "@/app/data/data-types";

import { SortableSingleTask } from "./SortableSingleTask";
import { useTheme } from "next-themes";

export default function SingleBoard({ board }: { board: Board }) {
  //destructing the board prop
  const { name: boardName, tasks } = board;
  //storing the task's number
  const numberTasks = tasks.length;

  const { theme } = useTheme();

  const bgColor = theme === "dark" ? "bg-black" : "bg-gray-500";
  //jsx
  return (
    // parent container
    <div className={`w-full h-full border p-4 rounded-2xl  ${bgColor}`}>
      {/* board header */}
      <div
        className={` flex justify-between ${bgColor} border p-4 rounded-lg items-center`}
      >
        {/* header name */}
        <span className="font-medium text-md ">{boardName}</span>
        {/* container for tasks number */}
        <div className="size-6 rounded-full bg-primary text-white flex items-center justify-center">
          <span className="text-sm mt-[2px]">{numberTasks}</span>
        </div>
      </div>
      {/* Tasks container */}
      <div className="mt-7">
        {tasks.map((task) => (
          <SortableSingleTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
