import { create } from "zustand";
import { ProjectType } from "../data/data-types";

interface DialogState {
  projectToEdit: ProjectType | null;
  setProjectToEdit: (project: ProjectType | null) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useOpenDialogProjectStore = create<DialogState>((set) => ({
  isOpen: false,
  projectToEdit: null,
  setProjectToEdit: (project: ProjectType | null) => {
    set({ projectToEdit: project });
  },
  setIsOpen: (open) => set({ isOpen: open }),
}));
