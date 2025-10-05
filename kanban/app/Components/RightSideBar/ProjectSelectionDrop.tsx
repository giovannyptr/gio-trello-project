import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { IoMdCheckmark } from "react-icons/io";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import useProjectStore from "@/app/hooks/useProjectsStore";
import { ProjectType } from "@/app/data/data-types";

export default function ProjectSelectionDropDown() {
  const [open, setOpen] = useState(false);
  const { state, actions } = useProjectStore();

  //destruct the state and actions objects
  //
  const { selectedProject, allProjects } = state;
  const { setSelectedProject } = actions;

  // Track whether the component has set the selectedProject for the first time
  const hasInitialized = useRef(false);

  // this state is to know if the projects exist or not
  const areProjectsExisting = useMemo(() => {
    if (allProjects) {
      return allProjects.length > 0 ? true : false;
    }
    return false;
  }, [allProjects]);

  useEffect(() => {
    // set the first project only to the selected project only if the hasInitialized is false
    //after the statement, set it to true, to avoid accessing to this block
    if (allProjects && areProjectsExisting && !hasInitialized.current) {
      setSelectedProject(allProjects[0]);
      hasInitialized.current = true;
    } else if (allProjects && selectedProject) {
      // Find the selected project in the updated allProjects array
      const updatedSelectedProject = allProjects.find(
        (project) => project.id === selectedProject.id
      );
      if (updatedSelectedProject) {
        setSelectedProject(updatedSelectedProject);
      }
    }
  }, [allProjects, areProjectsExisting, setSelectedProject, selectedProject]);

  //callback function to update the selected project state
  // Memoize the project selection handler to avoid recreating it on every render
  const handleProjectSelect = useCallback((project: ProjectType) => {
    setSelectedProject(project);
  }, []);

  //this function the button to trigger the drop down
  function projectTriggerDropDown() {
    //based on the areProjectsExisting we are going to render the jsx elements
    const ShowProjectName = areProjectsExisting ? (
      <p className="font-bold">{selectedProject?.name}</p>
    ) : (
      <p className="font-medium text-[12px]">No Projects Yet!</p>
    );

    return (
      <Button
        variant={"secondary"}
        disabled={!areProjectsExisting}
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between py-9 rounded-xl   "
      >
        {/* show the name of selected project state */}
        <div className="flex items-start flex-col text-[16px] gap-1 ">
          <p className="text-[13px] text-slate-500">PROJECT</p>
          {ShowProjectName}
        </div>
        {selectedProject && (
          <div
            className="size-10 bg-primary rounded-full flex items-center justify-center
           text-2xl text-white"
          >
            {/* render the icon of selected project state */}
            <selectedProject.icon />
          </div>
        )}
      </Button>
    );
  }

  //jsx
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{projectTriggerDropDown()}</PopoverTrigger>
      <PopoverContent className="p-2 poppins rounded-xl">
        <Command>
          <CommandInput placeholder="Search a project..." />
          <CommandList className="my-3">
            <CommandEmpty>No results found.</CommandEmpty>
          </CommandList>

          {allProjects && selectedProject && (
            <div className="flex flex-col gap-3">
              {allProjects.map((project, index) => (
                <SingleProjectCommandItem
                  allProjects={allProjects}
                  //   project item
                  project={project}
                  // key index
                  key={index}
                  // callback function
                  onSelectedItem={handleProjectSelect}
                  // the isSelected based on the condition of selected projec name is equal of the project name in the array
                  isSelected={selectedProject.name === project.name}
                />
              ))}
            </div>
          )}
          {/* map through each projects array and call it the singleProject command item and pass the props */}
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function SingleProjectCommandItem({
  allProjects,
  project,
  isSelected,
  onSelectedItem,
}: {
  allProjects: ProjectType[];
  project: ProjectType;
  isSelected: boolean;
  onSelectedItem: (project: ProjectType) => void;
}) {
  //Destructure the project object
  const { name: projectName, boards, icon: ProjectIcon } = project;

  //getting the total of tasks inside the boards
  const totalTasks = boards.reduce(
    (total, board) => total + board.tasks.length,
    0
  );
  //jsx
  return (
    <CommandItem
      value={projectName}
      //when the user selected the project
      onSelect={(value: string) => {
        //find the project by using hte find method
        const findProject = allProjects.find((proj) => proj.name === value);

        //if its not undefined, use the onSelectedItem function to update the parent component
        //function which is onSelectedProject
        if (findProject) {
          onSelectedItem(findProject);
        }
      }}
      className="cursor-pointer hover:bg-gray-100 rounded-lg p-2"
    >
      <div className="flex items-center justify-between w-full">
        {/* Container for project icon and name */}
        <div className="flex items-center gap-3">
          {/* Project icon */}
          <div className="size-8 bg-primary flex items-center justify-center rounded-md text-white">
            <ProjectIcon />
          </div>
          {/* Project name and tasks number */}
          <div className="flex flex-col">
            <span className="font-medium">{projectName}</span>
            <span className="text-[12px] text-gray-500">
              {totalTasks} Tasks
            </span>
          </div>
        </div>

        {/* Checkmark for selected project */}
        {isSelected && (
          <div className="text-primary">
            <IoMdCheckmark size={12} />
          </div>
        )}
      </div>
    </CommandItem>
  );
}
