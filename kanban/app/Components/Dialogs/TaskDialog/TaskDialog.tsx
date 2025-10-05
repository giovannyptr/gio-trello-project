import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import TaskName from "./sub-components/TaskName";
import PriorityList from "./sub-components/PriorityList";
import { BiTask } from "react-icons/bi";
import TaskDescription from "./sub-components/TaskDescription";
import ProjectsList from "../AllProjectsDialog/ProjectList";
import ProjectList from "./sub-components/ProjectsList";
import { DialogClose } from "@radix-ui/react-dialog";
import useProjectStore from "@/app/hooks/useProjectsStore";
import { createTaskDialogSchema, TaskDialogFormData } from "./taskDialogSchema";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ProjectType, Task } from "@/app/data/data-types";
import { nanoid } from "nanoid";
import { useToast } from "@/hooks/use-toast";
import { truncate } from "fs/promises";
import { useOpenTaskDialog } from "@/app/hooks/useOepnTaskDialog";
import { Card } from "@/components/ui/card";
import { Project } from "next/dist/build/swc/types";
import addNewTask from "./task-dialog-functions";

export default function TaskDialog() {
  //
  const {
    state: { allProjects, taskToEdit },
    actions: { updateProject, setTaskToEdit },
  } = useProjectStore();

  // const [isOpen, setIsOpen] = useState(false);
  const { isOpen, setIsOpen } = useOpenTaskDialog();

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  //
  const taskSchema = createTaskDialogSchema(allProjects || []);
  const methods = useForm<TaskDialogFormData>({
    resolver: zodResolver(taskSchema),
  });

  const { watch, reset, setFocus } = methods;

  async function onSubmitData(data: TaskDialogFormData) {
    try {
      setIsLoading(true);
      //deconstructe the data object
      const {
        project: selectedProject,
        taskTitle,
        priority,
        taskDescription,
      } = data;

      //if we are going to add a new task
      if (!taskToEdit) {
        // Create the new task object

        const newTask: Task = {
          id: nanoid(),
          taskTitle,
          priority,
          project: selectedProject,
          taskDescription,
        };

        // call the add new task function
        const result = await addNewTask(
          newTask,
          selectedProject,
          taskTitle,
          allProjects,
          updateProject
        );

        //if success
        if (result.success) {
          toast({
            variant: "default",
            title: "Task Added",
            description: result.message,
          });
          setIsOpen(false); // Close dialog only after successful update
          reset();
          //otherwise
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: result.message,
          });
        }

        //if we are going to edit the task
      } else {
        //first, store the source project
        const intialProject = taskToEdit.project;
        //then update the task
        const taskToUpdate: Task = {
          ...taskToEdit,
          taskTitle: taskTitle,
          taskDescription: taskDescription,
          priority: priority,
          project: selectedProject,
        };
        //then, call the updateTask function
        const result = await updateTask(
          taskToUpdate,
          intialProject,
          selectedProject
        );

        //if success
        if (result.success) {
          toast({
            variant: "default",
            title: "Success",
            description: "The task has been updated successfully!",
          });
          setIsOpen(false); // Close dialog only after successful update
          reset();
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while submitting the task.",
      });
    } finally {
      setIsLoading(false);
      setTaskToEdit(null);
    }
  }

  //function to update a task

  //function to add a new task
  async function updateTask(
    task: Task,
    initialProject: string,
    selectedProject: string
  ): Promise<{ success: boolean; message?: string }> {
    if (!allProjects) {
      return { success: false, message: "Projects not initialized" };
    }

    const sourceProject = allProjects.find(
      (project) => project.name === initialProject
    );
    const targetProject = allProjects.find(
      (project) => project.name === selectedProject
    );

    if (!sourceProject || !targetProject) {
      return { success: false, message: "One or both projects not found." };
    }

    if (sourceProject?.name !== targetProject.name) {
      //remove the task from the source project
      const updatedSourceProject: ProjectType = {
        ...sourceProject,
        boards: sourceProject?.boards.map((board) => ({
          ...board,
          tasks: board.tasks.filter((t) => t.id !== task.id),
        })),
      };

      console.log("updated source project", updatedSourceProject);

      const deleteTheTaskFx = await updateProject(updatedSourceProject);

      if (!deleteTheTaskFx.success) {
        return {
          success: false,
          message: "Failed to update the task",
        };
      }

      // update the task Id
      const updateTaskId: Task = { ...task, id: nanoid() };

      // Add the task **at the first index** of the target project board
      // Mutate the **first board** of the target project directly
      targetProject.boards[0].tasks.unshift(updateTaskId); // Add at index 0

      const addTheTaskInProject = await updateProject(targetProject);
      if (!addTheTaskInProject.success) {
        return {
          success: false,
          message: "Failed to update the task",
        };
      }
    }

    //if we are going to update the task in the same project
    const updateTargetProject: ProjectType = {
      ...targetProject,
      boards: targetProject.boards.map((board, i) => {
        return {
          ...board,
          tasks: board.tasks.map((t) => (t.id === task.id ? task : t)),
        };
      }),
    };

    const finalUpdateData = await updateProject(updateTargetProject);

    if (!finalUpdateData.success) {
      return {
        success: false,
        message: "Failed to update the task",
      };
    }

    return {
      success: true,
      message: "The project has been updated",
    };
  }
  // this useEffect hook close the dialog is reset all the fields
  // that depends on the isOpen state itself
  useEffect(() => {
    if (!isOpen) {
      // Reset the form fields when the dialog is closed
      reset({
        taskTitle: "",
        priority: "Low",
        taskDescription: "",
        project: "",
      });
      setTaskToEdit(null); // Clear the task to edit
    } else if (taskToEdit) {
      // Populate the form fields when editing a task

      reset({
        taskTitle: taskToEdit.taskTitle,
        priority: taskToEdit.priority,
        taskDescription: taskToEdit.taskDescription,
        project: taskToEdit.project,
      });
    }
  }, [isOpen, taskToEdit, reset, setTaskToEdit]);

  const updateDialogTitle = taskToEdit ? "Edit Task" : "Add Task";

  return (
    <Card
      className={` p-6 fixed ${
        isOpen ? "visible" : "invisible"
      } left-[50%] top-[50%] z-50 grid w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg `}
    >
      {/* dialog content */}
      <FormProvider {...methods}>
        <div className="poppins max-w-3xl ">
          <form onSubmit={methods.handleSubmit(onSubmitData)}>
            {/* dialog header */}
            <div className="">
              <div className="size-10 bg-gray-200 rounded-full flex justify-center items-center">
                <BiTask className="text-xl text-gray-700" />
              </div>

              <div className="pt-2 flex flex-col gap-1 mt-2">
                <span className="text-lg p-0 h-7 font-bold ">
                  {updateDialogTitle}
                </span>
                <span className="p-0 text-sm text-gray-600 ">
                  Fill in the form below to create or modify a task
                </span>
              </div>

              <div className="  ">
                <Separator className="mt-4 left-0 absolute" />
              </div>
            </div>
            {/* content */}
            <div className=" grid grid-cols-2 gap-6 mt-8">
              <div className="flex flex-col gap-3">
                <TaskName />
                <TaskDescription />
              </div>
              <div className="flex flex-col gap-[53px]">
                <ProjectList />
                <PriorityList />
              </div>
            </div>
            {/* footer */}
            <div className="  ">
              <Separator className="mt-4 left-0 absolute" />
            </div>
            <div className=" flex gap-1 justify-end mt-9">
              <Button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setTaskToEdit(null);
                }}
                variant="secondary"
              >
                Close
              </Button>
              <Button disabled={isLoading} className="ml-5 px-5">
                {isLoading ? "Loading..." : updateDialogTitle}
              </Button>
            </div>
          </form>
        </div>
      </FormProvider>
    </Card>
  );
}
