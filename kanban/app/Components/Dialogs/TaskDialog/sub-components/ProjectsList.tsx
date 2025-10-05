import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { IoMdSearch } from "react-icons/io";
import { ProjectType } from "@/app/data/data-types";
import useProjectStore from "@/app/hooks/useProjectsStore";
import { useFormContext } from "react-hook-form";
import { TaskDialogFormData } from "../taskDialogSchema";
import { FaCircleExclamation } from "react-icons/fa6";
import useOutsideClick from "../hooks/useOutsideClick";
import { useOpenTaskDialog } from "@/app/hooks/useOepnTaskDialog";

export default function ProjectsList() {
  // Access the project data from the project store using a custom hook.
  const {
    state: { allProjects },
  } = useProjectStore();

  // Manage the search query state.
  const [searchQuery, setSearchQuery] = useState("");

  // Manage the open/closed state of a dropdown or similar component.
  const [isOpen, setIsOpen] = useState(false);
  const { isOpen: isTaskDialogOpen } = useOpenTaskDialog();

  // Access form context for managing form values, watching changes, and accessing errors.
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<TaskDialogFormData>();

  // Create a ref to the dropdown element for DOM manipulation if needed.
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter the projects based on the current search query.
  const filterBySearchQuery = allProjects?.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get the currently selected project name from the form.
  const selectedProjectName = watch("project");

  // Find the selected project object from allProjects based on the selected name.
  const selectedProject = allProjects?.find(
    (p) => p.name === selectedProjectName
  );

  // useEffect hook to set the initial project value when allProjects data is available.
  //and there's elements in the all projects array
  useEffect(() => {
    console.log("runned");

    // Check if allProjects has data.
    if (allProjects && allProjects.length > 0) {
      // Set the initial project in the form to the name of the first project in the list.
      setValue("project", allProjects[0].name);
    }
  }, [isTaskDialogOpen]); // Empty dependency array ensures this runs only once after the initial render.

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // useOutsideClick(dropdownRef, setIsOpen);

  // Render the selected project

  function renderSelectedProject() {
    const Icon = selectedProject?.icon;
    return (
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-md flex items-center justify-center text-lg text-primary bg-primary/10">
          {Icon && <Icon />}
        </div>
        <span>{selectedProject?.name}</span>
      </div>
    );
  }

  // Render each dropdown item
  function renderDropDownMenuItem(projectItem: ProjectType) {
    const Icon = projectItem.icon;
    return (
      <div
        className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => {
          setValue("project", projectItem.name);
          setIsOpen(false); // Close dropdown after selection
        }}
      >
        <div className="size-7 bg-primary/10 rounded-md flex items-center justify-center text-[15px] text-primary">
          <Icon />
        </div>
        <span>{projectItem.name}</span>
        {projectItem.name === selectedProject?.name && (
          <IoCheckmark className="ml-auto" />
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Label */}
      <label className="opacity-75 text-sm font-medium">Projects</label>

      {/* Dropdown Trigger Button */}
      <div className="mt-1 w-full">
        <Button
          variant={"outline"}
          type="button"
          className="w-full h-11 flex justify-between items-center   border "
          onClick={() => setIsOpen(!isOpen)}
        >
          {renderSelectedProject()}
          <IoIosArrowDown className="text-gray-600" />
        </Button>
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div
          className="absolute overflow-hidden z-10 mt-2 w-full bg-white border 
        border-gray-300 rounded-lg shadow-lg"
        >
          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 p-2 pl-8 text-sm border-b border-gray-300 focus:outline-none overflow-hidden"
            placeholder="Search a project..."
            autoFocus // Automatically focus the input when dropdown opens
          />

          <IoMdSearch className="absolute top-[13px] left-2 text-lg text-gray-500" />

          {/* Dropdown Items */}

          <div className="max-h-60 overflow-y-auto my-2">
            {filterBySearchQuery?.map((projectItem, index) => (
              <div key={index} className="text-sm">
                {renderDropDownMenuItem(projectItem)}
              </div>
            ))}
          </div>
        </div>
      )}

      {errors.project && (
        <div className="text-red-500 text-[12px] flex items-center gap-1">
          {/* exclamation icon */}
          <FaCircleExclamation />
          {/* error label */}
          <p>{errors.project.message}</p>
        </div>
      )}
    </div>
  );
}
