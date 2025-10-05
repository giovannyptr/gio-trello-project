import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";

import { TbTableOptions } from "react-icons/tb";
import ProjectsList from "./ProjectList";
import ProjectDialogSearch from "./ProjectDialogSearch";
import useProjectStore from "@/app/hooks/useProjectsStore";

import { AllProjectsDialogProvider } from "./AllProjectsDialogContext";
import ProjectDialog from "../ProjectDialog/ProjectDialog";

export default function AllProjectsDialog() {
  const {
    state: { allProjects },
  } = useProjectStore();

  //total projects
  const totalProjects = allProjects?.length;
  return (
    <Dialog>
      {/* dialog trigger */}
      <DialogTrigger>
        <TbTableOptions className="text-gray-500 text-sm mt-[2px] cursor-pointer" />
      </DialogTrigger>
      {/* dialog content */}
      <AllProjectsDialogProvider>
        <DialogContent className="poppins max-w-xl">
          {/* dialog header */}
          <DialogHeader>
            <DialogTitle className="text-xl">All Projects</DialogTitle>
            <DialogDescription>
              List of all available projects
            </DialogDescription>
            <div className="mt-4">
              <Separator className="mt-3" />
            </div>
          </DialogHeader>
          {/* content */}
          <div className="mt-3 flex flex-col gap-3">
            {/* sub header */}
            <div className="flex justify-between items-center">
              {/* search input */}
              <ProjectDialogSearch />
              <ProjectDialog variant="secondary" className="rounded-lg" />
            </div>

            {/* project list */}
            <ProjectsList />

            {/* footer */}
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-500 text-sm">
                {totalProjects} Projects
              </span>
              <Button variant={"link"}>Delete All</Button>
            </div>
          </div>
        </DialogContent>
      </AllProjectsDialogProvider>
    </Dialog>
  );
}
