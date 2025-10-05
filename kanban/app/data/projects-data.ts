import { MdStackedBarChart } from "react-icons/md";
import { ProjectType } from "./data-types";

// Define the projects array with the Project type
export const projectsData: ProjectType[] = [
  {
    id: "1",
    name: "Website Redesign",
    icon: MdStackedBarChart,
    createdAt: new Date(),
    boards: [
      {
        name: "Yet To Start",
        tasks: [
          {
            id: "task-1",
            taskTitle: "Design Mockups",
            taskDescription: "Create initial design drafts.",
            priority: "Low",
            project: "Website Redesign",
          },
          {
            id: "task-2",
            taskTitle: "Set up Development Env",
            taskDescription: "Configure dev tools.",
            priority: "Medium",
            project: "Website Redesign",
          },
        ],
      },
      {
        name: "In Progress",
        tasks: [
          {
            id: "task-3",
            taskTitle: "Implement Header",
            taskDescription: "Code website header.",
            priority: "Medium",
            project: "Website Redesign",
          },
          {
            id: "task-4",
            taskTitle: "Develop Hero Section",
            taskDescription: "Build hero component.",
            priority: "Medium",
            project: "Website Redesign",
          },
        ],
      },
      { name: "Completed", tasks: [] },
    ],
  },
  {
    id: "2",
    name: "Mobile App Development",
    icon: MdStackedBarChart,
    createdAt: new Date(),
    boards: [
      {
        name: "Yet To Start",
        tasks: [
          {
            id: "task-5",
            taskTitle: "Plan App Features",
            taskDescription: "Define key features.",
            priority: "Low",
            project: "Mobile App Development",
          },
        ],
      },
      {
        name: "In Progress",
        tasks: [
          {
            id: "task-6",
            taskTitle: "Design UI/UX",
            taskDescription: "Create app interface.",
            priority: "Medium",
            project: "Mobile App Development",
          },
        ],
      },
      { name: "Completed", tasks: [] },
    ],
  },
  {
    id: "3",
    name: "Data Analysis Project",
    icon: MdStackedBarChart,
    createdAt: new Date(),
    boards: [
      {
        name: "Yet To Start",
        tasks: [
          {
            id: "task-7",
            taskTitle: "Gather Data",
            taskDescription: "Collect relevant data.",
            priority: "Low",
            project: "Data Analysis Project",
          },
        ],
      },
      {
        name: "In Progress",
        tasks: [
          {
            id: "task-8",
            taskTitle: "Clean and Prepare Data",
            taskDescription: "Process the data.",
            priority: "Medium",
            project: "Data Analysis Project",
          },
        ],
      },
      { name: "Completed", tasks: [] },
    ],
  },
  {
    id: "4",
    name: "E-commerce Platform",
    icon: MdStackedBarChart,
    createdAt: new Date(),
    boards: [
      {
        name: "Yet To Start",
        tasks: [
          {
            id: "task-9",
            taskTitle: "Set up Database",
            taskDescription: "Configure database.",
            priority: "Low",
            project: "E-commerce Platform",
          },
        ],
      },
      {
        name: "In Progress",
        tasks: [
          {
            id: "task-10",
            taskTitle: "Develop Product Page",
            taskDescription: "Build product display.",
            priority: "Medium",
            project: "E-commerce Platform",
          },
        ],
      },
      { name: "Completed", tasks: [] },
    ],
  },
];
