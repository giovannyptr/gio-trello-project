import { create } from "zustand";

interface DialogState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useOpenTaskDialog = create<DialogState>((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
}));
