import { IconType } from "react-icons";

// Define the Priority type
export type Priority = "Low" | "Medium" | "High";

// Define the Task type
export type Task = {
  id: string;
  taskTitle: string;
  taskDescription: string;
  priority: Priority;
  project: string;
};

// Define the Board type
export type Board = {
  name: string;
  tasks: Task[];
};

// Define the Project type
export type ProjectType = {
  id: string;
  name: string;
  icon: IconType; // Use IconType for the icon
  createdAt: Date;
  boards: Board[];
};
