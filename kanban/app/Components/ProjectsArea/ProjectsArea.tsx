"use client";

import { Card } from "@/components/ui/card";
import ProjectsAreaHeader from "./ProjectsAreaHeader/ProjectsAreaHeader";
import ProjectsAreaTasksBoard from "./ProjectsAreaTasksBoard/ProjectsAreaTasksBoard";

export default function ProjectsArea() {
  return (
    <Card className="shadow-none p-7 rounded-3xl   px-7 flex flex-col gap-8">
      <ProjectsAreaHeader />
      <ProjectsAreaTasksBoard />
    </Card>
  );
}
