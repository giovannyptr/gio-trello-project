import { ProjectType } from "@/app/data/data-types";

import z from "zod";

const baseTaskSchema = z.object({
  taskTitle: z
    .string()
    .nonempty("Task title is required!")
    .min(3, "The task title must be at least 3 caracters!"),
  taskDescription: z
    .string()
    .nonempty("The description is required!")
    .min(3, "The description must be at least 3 caracters!")
    .max(50, "The description must be at  50 caracters max!"),
  priority: z.enum(["Low", "Medium", "High"]),
});

// Function to extend the schema dynamically
export const createTaskDialogSchema = (allProjects: ProjectType[]) => {
  const projectNames = allProjects.map((project) => project.name) as [
    string,
    ...string[]
  ];

  if (projectNames.length === 0) {
    return baseTaskSchema.extend({
      project: z.string().nonempty("You must create a project first!"),
    });
  }

  return baseTaskSchema.extend({
    project: z.enum(projectNames), // Dynamic project enum
  });
};

export type TaskDialogFormData = z.infer<
  ReturnType<typeof createTaskDialogSchema>
>;
