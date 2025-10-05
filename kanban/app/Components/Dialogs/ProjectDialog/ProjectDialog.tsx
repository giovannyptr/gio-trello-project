import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";

import { BiTask } from "react-icons/bi";
import ProjectName from "./sub-components/project-title";
import IconDialogBox from "./sub-components/icon-dialog-box/icon-dialog-box";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProjectDialogFormData,
  projectDialogSchema,
} from "./projectDialogSchema";
import { allIconsArray } from "./sub-components/icon-dialog-box/all-icons";
import { useEffect, useState } from "react";
import { ProjectType } from "@/app/data/data-types";
import { nanoid } from "nanoid";
import useProjectStore from "@/app/hooks/useProjectsStore";
import { useToast } from "@/hooks/use-toast";
import { useOpenDialogProjectStore } from "@/app/hooks/useOpenProjectDialog";

export default function ProjectDialog({
  variant,
  className,
}: {
  variant?: ButtonProps["variant"];
  className?: string;
}) {
  const { isOpen, setIsOpen, setProjectToEdit, projectToEdit } =
    useOpenDialogProjectStore();

  const methods = useForm<ProjectDialogFormData>({
    resolver: zodResolver(projectDialogSchema),
    defaultValues: {
      projectTitle: "",
    },
  });

  const {
    actions: { addProject, setSelectedProject, updateProject: updateProjectFx },
    state: { allProjects },
  } = useProjectStore();

  //
  const [allIcons, setAllIcons] = useState(allIconsArray);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  //

  const selectedIcon = allIcons.filter((icon) => icon.isSelected)[0];

  const HEADER_TITLE = projectToEdit ? "Edit Project" : "New Project";
  const TEXT_BUTTON = projectToEdit ? "Edit project" : "Add new project";

  const { handleSubmit, reset, setValue } = methods;

  useEffect(() => {
    //update the project title key based on projectToEdit
    setValue("projectTitle", projectToEdit ? projectToEdit.name : "");
    //update the all icons state
    setAllIcons((prevIcons) => {
      //if the project to edit state is not null, then update the isSelected property
      //if it is equal to its icon
      if (projectToEdit) {
        return prevIcons.map((icon) => {
          if (icon.icon === projectToEdit?.icon) {
            return { ...icon, isSelected: true };
          }

          return { ...icon, isSelected: false };
        });
      }

      //otherwise if we are going to create a new project
      // set the isSelected of the first element to true
      //
      //copy to prevIcons array
      const copyPrevIcons = [...prevIcons];
      //set the isSelected to false of all icons
      const updateCopyPrevIcons = copyPrevIcons.map((icon) => ({
        ...icon,
        isSelected: false,
      }));
      //set the first one to true
      updateCopyPrevIcons[0] = { ...copyPrevIcons[0], isSelected: true };
      //after mutating the array, then return it
      return updateCopyPrevIcons;
    });
  }, [projectToEdit]);

  async function onSubmitData(data: ProjectDialogFormData) {
    setIsLoading(true);
    if (!projectToEdit) {
      const newProject: ProjectType = {
        id: nanoid(),
        name: data.projectTitle,
        createdAt: new Date(),
        icon: selectedIcon.icon,
        boards: [
          {
            name: "Yet To Start",
            tasks: [],
          },
          {
            name: "In Progress",
            tasks: [],
          },
          {
            name: "Completed",
            tasks: [],
          },
        ],
      };

      const results = await addProject(newProject);

      //update the selected project state when added we add the first project
      //only if the operation has been a success
      if (results.success) {
        //if the all projects length is 0
        if (allProjects?.length === 0) {
          //then update the selected project state with the project we just added
          setSelectedProject(newProject);
        }
      }

      toast({
        variant: results.success ? "default" : "destructive",
        title: results.success ? "Operation successful" : "Operation Failed",
        description: results.message,
      });

      //close the window when the operation is successful
      //and set the project to edit to null
      if (results.success) {
        setIsOpen(false);
        setProjectToEdit(null);
      }
    } else {
      //otherwise if we want to update a project
      const updateProject: ProjectType = {
        ...projectToEdit,
        name: data.projectTitle,
        icon: selectedIcon.icon,
      };

      //call the updateProjectFx function
      const results = await updateProjectFx(updateProject);

      //show to toast and close the dialog, and set the projecttoedit state to null
      if (results.success) {
        toast({
          variant: results.success ? "default" : "destructive",
          title: results.success ? "Operation successful" : "Operation Failed",
          description: "The project was updated successfully!",
        });
        setIsOpen(false);
        setProjectToEdit(null);
      }
    }

    setIsLoading(false);
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        //if the open value is false, set the setProjectToEdit to null
        // I did this, to make sure when I click outise the dialog, or on the
        //close icon, it sets the project to edit to null
        if (!open) {
          reset();
          setProjectToEdit(null);
        }
        //
        setIsOpen(open);
      }}
    >
      {/* dialog trigger */}
      <DialogTrigger asChild>
        <Button
          variant={variant || "default"}
          className={`rounded-3xl px-5 ${className}`}
        >
          Create Project
        </Button>
      </DialogTrigger>
      {/* dialog content */}
      <FormProvider {...methods}>
        <DialogContent className="poppins max-w-3xl ">
          <form onSubmit={handleSubmit(onSubmitData)}>
            {/* dialog header */}
            <DialogHeader className="">
              <div className="size-10 bg-gray-200 rounded-full flex justify-center items-center">
                <BiTask className="text-xl text-gray-700" />
              </div>

              <div className="pt-2">
                <DialogTitle className="text-lg p-0 h-7 ">
                  {HEADER_TITLE}
                </DialogTitle>
                <DialogDescription className="p-0 ">
                  Fill in the form below to create or modify a project
                </DialogDescription>
              </div>

              <div className="  ">
                <Separator className="mt-4 left-0 absolute" />
              </div>
            </DialogHeader>
            {/* content */}
            <div className=" flex items-center  gap-6 mt-8 ">
              <ProjectName />

              <IconDialogBox allIcons={allIcons} setAllIcons={setAllIcons} />
            </div>
            {/* footer */}
            <div className="  ">
              <Separator className="mt-4 left-0 absolute" />
            </div>
            <div className=" flex gap-1 justify-end mt-6">
              <Button
                onClick={() => {
                  setIsOpen(false);
                  setProjectToEdit(null);
                }}
                type="button"
                variant="secondary"
              >
                Close
              </Button>
              <Button type="submit" className="ml-5 px-5">
                {isLoading ? "Loading..." : TEXT_BUTTON}
              </Button>
            </div>
          </form>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
