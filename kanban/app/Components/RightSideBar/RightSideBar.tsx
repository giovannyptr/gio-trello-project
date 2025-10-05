import { Card } from "@/components/ui/card";
import ProjectSelectionDropDown from "./ProjectSelectionDrop";
import CircularProgress from "./CircularProgress";
import TasksStats from "./TasksStats";

export default function RightSideBar() {
  return (
    <Card className="shadow-none p-6 rounded-3xl max-h-[640px]">
      <div className="flex flex-col gap-0">
        <ProjectSelectionDropDown />
        <CircularProgress />
        <TasksStats />
      </div>
    </Card>
  );
}
