"use client";
import { MdOutlineSortByAlpha } from "react-icons/md";
import { SortingDropDown } from "../../DropDowns/SortingDropDown";
import AllProjectsDialog from "../../Dialogs/AllProjectsDialog/AllProjectsDialog";

import { useOpenTaskDialog } from "@/app/hooks/useOepnTaskDialog";

import { Button } from "@/components/ui/button";
import useProjectStore from "@/app/hooks/useProjectsStore";

export default function ProjectsAreaHeader() {
  const { setIsOpen } = useOpenTaskDialog();
  const {
    state: { allProjects },
  } = useProjectStore();

  const areProjectsFound = allProjects ? allProjects?.length > 0 : false;

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <span className="text-2xl font-bold   ">Projects</span>

        <AllProjectsDialog />
      </div>
      {/* sorting label, icon, and drop down */}
      <div className="flex items-center gap-2">
        {/* Sort label and icon */}
        <div className="flex items-center gap-1">
          <MdOutlineSortByAlpha className="text-xl text-gray-500" />
          <span className="text-gray-500 text-sm">Sort </span>
        </div>

        {/* sorting drop down */}
        <SortingDropDown />
        {/* button to add a new task */}
        <Button
          disabled={!areProjectsFound}
          className="rounded-3xl px-5"
          variant={"secondary"}
          onClick={() => setIsOpen(true)}
        >
          Add New Task
        </Button>
      </div>
    </div>
  );
}
