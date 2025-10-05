"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface AllProjectsDialogInterface {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const AllProjectsDialogContext =
  createContext<AllProjectsDialogInterface | null>(null);

export function AllProjectsDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <AllProjectsDialogContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </AllProjectsDialogContext.Provider>
  );
}

export function useAllProjectsDialogContext() {
  const context = useContext(AllProjectsDialogContext);
  if (!context) {
    throw new Error(
      "useAllProjectsDialogContext must be used within an AllProjectsDialogProvider"
    );
  }

  return context;
}
