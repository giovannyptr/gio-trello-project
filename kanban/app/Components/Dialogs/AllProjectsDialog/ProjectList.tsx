import { ProjectType } from "@/app/data/data-types";
import useProjectStore from "@/app/hooks/useProjectsStore";
import { Badge } from "@/components/ui/badge";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useAllProjectsDialogContext } from "./AllProjectsDialogContext";
import { IoWarning } from "react-icons/io5";
import { useToast } from "@/hooks/use-toast";
import { useOpenDialogProjectStore } from "@/app/hooks/useOpenProjectDialog";

export default function ProjectsList() {
  //access to the all projects, and selected project from the useProjectStore
  const {
    state: { allProjects, selectedProject },
  } = useProjectStore();

  //access to the search query from the context
  const { searchQuery } = useAllProjectsDialogContext();

  const filterProjectsBySearch = allProjects?.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // main jsx
  return (
    <div className="flex flex-col gap-3 mt-4">
      {filterProjectsBySearch?.length === 0 && (
        <div className="w-full flex flex-col gap-4 items-center justify-center h-28">
          <IoWarning className="text-6xl text-slate-400" />
          <span className="text-sm text-slate-400 ">Project Not Found...</span>
        </div>
      )}
      {filterProjectsBySearch?.map((project, index) => (
        <SingleProject
          project={project}
          selectedProject={selectedProject}
          key={index}
        />
      ))}
    </div>
  );

  function SingleProject({
    project,
    selectedProject,
  }: {
    project: ProjectType;
    selectedProject: ProjectType | null;
  }) {
    // deconstructe the project object
    const { name: projectName, icon: ProjectIcon, boards } = project;

    //caculate how to many total tasks in all boards
    const totalTasks = boards.reduce((total, board) => {
      return total + board.tasks.length;
    }, 0);

    //This function render the selected badge only if the project object is equal to selectedProject
    function renderSelectedBadge() {
      const isProjectSelected = project.id === selectedProject?.id;
      //
      return (
        <>
          {isProjectSelected && (
            <Badge variant={"secondary"} className="text-[11px]">
              Selected
            </Badge>
          )}
        </>
      );
    }

    // this function render the project name and icon
    //
    function renderProjectNameAndIcon() {
      return (
        <div className="flex items-center gap-3">
          {/* Project icon */}
          <div className="size-8 bg-primary flex items-center justify-center rounded-md text-white">
            <ProjectIcon />
          </div>
          {/* Project name and tasks number */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium">{projectName}</span>
              {/* render the selected badge */}
              {renderSelectedBadge()}
            </div>

            <span className="text-[12px] text-gray-500">
              {totalTasks} Tasks
            </span>
          </div>
          {/*  */}
        </div>
      );
    }

    function renderButtons() {
      const {
        actions: { deleteProject, setSelectedProject },
      } = useProjectStore();

      const { setIsOpen, setProjectToEdit } = useOpenDialogProjectStore();

      const { toast } = useToast();

      //delete project function
      async function deleteTheProjectFunction() {
        const results = await deleteProject(project);

        if (results.success) {
          toast({
            variant: "default",
            title: "Operation successful",
            description: results.message,
          });
        }

        // Wait for the state to update
        const updatedProjects = useProjectStore.getState().state.allProjects;

        console.log(updatedProjects);

        //This code, will set the selection to the first project, only if the already selected
        //project is the diffrent than the project we want to delete
        //

        if (selectedProject?.id === project.id) {
          setSelectedProject(
            updatedProjects && updatedProjects.length > 0
              ? updatedProjects[0]
              : null
          );
        }

        toast({
          variant: results.success ? "default" : "destructive",
          title: results.success ? "Operation successful" : "Operation Failed",
          description: results.message,
        });
      }

      //function to open the project dialog to modify the project
      function modifyButtonFunction() {
        //update the project to edit state with the project object
        setProjectToEdit(project);
        //open the project dialog
        setIsOpen(true);
      }

      return (
        <div className="flex gap-3 items-center">
          {/* modify button */}
          <div
            onClick={() => modifyButtonFunction()}
            className="  text-primary cursor-pointer bg-primary/10 p-[7px] rounded-xl "
          >
            <MdModeEditOutline />
          </div>
          {/* delete button */}
          <div
            onClick={() => deleteTheProjectFunction()}
            className=" text-red-500 cursor-pointer bg-red-500/10 p-[7px] rounded-xl "
          >
            <MdDelete />
          </div>
        </div>
      );
    }
    //jsx
    return (
      <div className="   rounded-lg p-2 px-3 border">
        <div className="flex items-center justify-between w-full">
          {renderProjectNameAndIcon()}
          {renderButtons()}
        </div>
      </div>
    );
  }
}
