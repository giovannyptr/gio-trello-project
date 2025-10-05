import useProjectStore from "@/app/hooks/useProjectsStore";
import { Separator } from "@radix-ui/react-separator";
import { useTheme } from "next-themes";

//define the type of each card
type TaskCard = {
  label: string;
  value: number;
};

export default function TasksStats() {
  const {
    state: { allProjects },
  } = useProjectStore();

  const allTasksNumber = allProjects
    ? allProjects
        .map((project) =>
          project.boards.reduce((total, board) => {
            return total + board.tasks.length;
          }, 0)
        )
        .reduce((total, tasks) => total + tasks, 0)
    : 0;

  const inProgressTasks =
    allProjects
      ?.map(
        (project) =>
          project.boards.find((board) => board.name === "In Progress")?.tasks
            .length || 0
      )
      .reduce((total, tasks) => total + tasks, 0) || 0;

  const CompletedTasks =
    allProjects
      ?.map(
        (project) =>
          project.boards.find((board) => board.name === "Completed")?.tasks
            .length || 0
      )
      .reduce((total, tasks) => total + tasks, 0) || 0;

  const waitingTasks =
    allProjects
      ?.map(
        (project) =>
          project.boards.find((board) => board.name === "Yet To Start")?.tasks
            .length || 0
      )
      .reduce((total, tasks) => total + tasks, 0) || 0;

  //statistic cards array
  const statisticCards: TaskCard[] = [
    { label: "total", value: allTasksNumber },
    { label: "in progress", value: inProgressTasks },
    { label: "waiting", value: waitingTasks },
    { label: "completed", value: CompletedTasks },
  ];

  // JSX
  return (
    <div className="flex flex-col gap-2">
      {/* tasks label */}
      <span className="font-bold text-xl">Tasks</span>
      {/* mapping the array */}
      <div className="grid grid-cols-2 gap-3 mt-3">
        {statisticCards.map((statCard, index) => (
          <SingleCard key={index} statCard={statCard} />
        ))}
      </div>
    </div>
  );
}

//Component for each card
function SingleCard({ statCard }: { statCard: TaskCard }) {
  const { theme } = useTheme();

  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-gray-100";

  return (
    <div className={`p-3 ${bgColor} rounded-xl`}>
      {/* Label of each stat card */}
      <span className="text-gray-600 text-[12px]">
        {statCard.label.toUpperCase()}
      </span>
      {/* vertical line and the number value */}
      <div className="flex gap-2 mt-1 items-center">
        <Separator className="w-1 h-4 bg-primary" orientation={"vertical"} />
        <span className="font-bold text-lg">{statCard.value}</span>
      </div>
    </div>
  );
}
