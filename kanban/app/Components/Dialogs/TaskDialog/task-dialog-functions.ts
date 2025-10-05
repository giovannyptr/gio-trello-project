import { ProjectType, Task } from "@/app/data/data-types";

export default async function addNewTask(
  newTask: Task,
  selectedProject: string,
  taskTitle: string,
  allProjects: ProjectType[] | null,
  updateProject: (
    project: ProjectType,
    operation?: "task" | "project"
  ) => Promise<{
    success: boolean;
    message: string;
  }>
): Promise<{ success: boolean; message?: string }> {
  //find the project
  const findProject = allProjects?.find(
    (project) => project.name === selectedProject
  );

  //exist the function
  if (!findProject) {
    return { success: false, message: "Project not found." };
  }

  // Check if the task already exists
  const isTaskFound = findProject.boards.some((board) =>
    board.tasks.some(
      (task) => task.taskTitle.toLowerCase() === taskTitle.toLowerCase()
    )
  );

  //if the task has been found return the object
  if (isTaskFound) {
    return { success: false, message: "Task already exists." };
  }

  // Create a copy of the project and add the task to the first board
  const updatedProject = {
    ...findProject,
    boards: findProject.boards.map((board, index) => {
      if (index === 0) {
        return {
          ...board,
          tasks: [...board.tasks, newTask],
        };
      }

      return board;
    }),
  };

  // Update the project and handle the result
  const results = await updateProject(updatedProject);
  if (results.success) {
    return { success: true, message: "Task Addedd Successfully!" };
  } else {
    return { success: false, message: results.message };
  }
}
