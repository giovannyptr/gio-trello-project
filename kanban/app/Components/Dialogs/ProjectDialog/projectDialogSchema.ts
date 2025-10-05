import { z } from "zod";

export const projectDialogSchema = z.object({
  projectTitle: z
    .string()
    .nonempty("Project name required") // Ensures the string is not empty
    .min(3, "Project name must be at least 3 characters"), // Corrected typo here
});

export type ProjectDialogFormData = z.infer<typeof projectDialogSchema>;
