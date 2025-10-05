import { create } from "zustand";
import { ProjectType, Task } from "../data/data-types";
import { projectsData } from "../data/projects-data";

type State = {
  allProjects: ProjectType[] | null;
  selectedProject: ProjectType | null; // Holds the currently selected project
  taskToEdit: Task | null;
};

type Actions = {
  setSelectedProject: (project: ProjectType | null) => void;
  setAllProjects: (projects: ProjectType[] | null) => void;
  setTaskToEdit: (task: Task | null) => void;

  fetchAllProjects: () => Promise<void>;
  deleteProject: (
    project: ProjectType
  ) => Promise<{ success: boolean; message: string }>;
  addProject: (
    project: ProjectType
  ) => Promise<{ success: boolean; message: string }>;
  updateProject: (
    project: ProjectType,
    operation?: "task" | "project"
  ) => Promise<{ success: boolean; message: string }>;
};

// Define the store's state and actions
type ProjectStore = {
  state: State;
  actions: Actions;
};

// Create the Zustand store
const useProjectStore = create<ProjectStore>((set, get) => ({
  state: {
    taskToEdit: null,
    allProjects: null,
    selectedProject: null, // Initial state: no project selected
  },

  actions: {
    setSelectedProject: (project) =>
      set((store) => ({
        ...store,
        state: {
          ...store.state,
          selectedProject: project,
        },
      })),

    setTaskToEdit: (task) =>
      set((store) => ({
        ...store,
        state: {
          ...store.state,
          taskToEdit: task,
        },
      })),

    setAllProjects: (projects) =>
      set((store) => ({
        ...store,
        state: {
          ...store.state,
          allProjects: projects,
        },
      })),

    fetchAllProjects: async () => {
      try {
        console.log("fetched data");

        await new Promise<void>((resolve) => {
          setTimeout(() => {
            set((store) => ({
              state: {
                ...store.state,
                allProjects: projectsData,
              },
            }));
            resolve();
          }, 1000);
        });
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        set((store) => ({
          state: {
            ...store.state,
            allProjects: null,
          },
        }));
      }
    },
    deleteProject: async (project: ProjectType) => {
      try {
        // Simulate an asynchronous operation (e.g., API call) with a delay
        const result = await new Promise<{ success: boolean; message: string }>(
          (resolve) => {
            //get the current projects state
            const currentProjectsState = get().state.allProjects;

            //delete the project
            const updateProjects = currentProjectsState?.filter(
              (proj) => proj.id !== project.id
            );

            setTimeout(() => {
              // Update the state by adding the new project to the projects array
              set((store) => ({
                ...store,
                state: {
                  ...store.state,
                  allProjects: updateProjects ? updateProjects : [project],
                },
              }));

              // Resolve the Promise with a success status and message
              resolve({
                success: true,
                message: "Project deleted successfully!",
              });
            }, 1000); // Simulate a delay of 1000 milliseconds
          }
        );

        return result;
      } catch (error) {
        console.log(error);

        // If an error occurs, return a failure status and a generic error message
        return { success: false, message: "Failed to delete the project!" };
      }
    },

    updateProject: async (
      updatedProject: ProjectType,
      opeation?: "task" | "project"
    ) => {
      try {
        // Simulate an asynchronous operation (e.g., API call) with a delay
        return new Promise<{ success: boolean; message: string }>((resolve) => {
          const currentProjectsState = get().state.allProjects;

          //only look if if the project is found if the operation is "project"
          if (opeation === "project") {
            const findProject = currentProjectsState?.find(
              (proj) => proj.name === updatedProject.name
            );

            if (findProject) {
              resolve({
                success: false,
                message: "Project already exists!",
              });
              return;
            }
          }

          if (currentProjectsState) {
            const updateCurrentProjects = currentProjectsState?.map((proj) => {
              if (proj.id === updatedProject.id) {
                return updatedProject;
              }
              return proj;
            });

            setTimeout(() => {
              set((store) => ({
                ...store,
                state: {
                  ...store.state,
                  allProjects: updateCurrentProjects,
                },
              }));

              resolve({
                success: true,
                message: "Project updated successfully!",
              });
            }, 1000); // Simulate delay
          } else {
            resolve({
              success: false,
              message: "No projects found!",
            });
          }
        });
      } catch (error) {
        console.log(error);
        return { success: false, message: "Failed to update project!" };
      }
    },

    addProject: async (project: ProjectType) => {
      try {
        // Simulate an asynchronous operation (e.g., API call) with a delay
        const result = await new Promise<{ success: boolean; message: string }>(
          (resolve) => {
            //check if the project name already exist
            const currentProjectsState = get().state.allProjects;

            const findProject = currentProjectsState?.find(
              (proj) => proj.name === project.name
            );

            if (findProject) {
              resolve({
                success: false,
                message: "Project already exists!",
              });

              return;
            }
            setTimeout(() => {
              // Update the state by adding the new project to the projects array
              set((store) => ({
                ...store,
                state: {
                  ...store.state,
                  allProjects: store.state.allProjects
                    ? [...store.state.allProjects, project]
                    : [project],
                },
              }));

              // Resolve the Promise with a success status and message
              resolve({
                success: true,
                message: "Project added successfully!",
              });
            }, 1000); // Simulate a delay of 1000 milliseconds
          }
        );

        return result;
      } catch (error) {
        console.log(error);

        // If an error occurs, return a failure status and a generic error message
        return { success: false, message: "Failed to add project!" };
      }
    },
  },
}));

export default useProjectStore;
