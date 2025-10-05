"use client";

import { useTheme } from "next-themes";
import Navbar from "./Components/Navbar/Navbar";
import ProjectsArea from "./Components/ProjectsArea/ProjectsArea";
import RightSideBar from "./Components/RightSideBar/RightSideBar";
import useProjectStore from "./hooks/useProjectsStore";
import { useEffect } from "react";

import TaskDialog from "./Components/Dialogs/TaskDialog/TaskDialog";
import { useOpenTaskDialog } from "./hooks/useOepnTaskDialog";

export default function Home() {
  const { theme } = useTheme();
  const { actions } = useProjectStore();
  const { isOpen } = useOpenTaskDialog();

  //fetch projects data, when the project is loaded
  useEffect(() => {
    actions.fetchAllProjects();
  }, []);

  const bgColor = theme === "dark" ? "bg-black" : "bg-gray-200";

  return (
    <div className={` ${bgColor} border min-h-screen w-full pb-3`}>
      {/* dialog trigger */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black/60"></div>}

      <TaskDialog />
      <Navbar />
      <div className="grid grid-cols-[3fr_1fr] px-6 mt-8 poppins gap-4">
        <ProjectsArea />
        <RightSideBar />
      </div>
    </div>
  );
}
