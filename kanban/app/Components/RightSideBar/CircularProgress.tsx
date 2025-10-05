import useProjectStore from "@/app/hooks/useProjectsStore";
import { useMemo } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CircularProgress() {
  //access to the selected project state
  const {
    state: { selectedProject },
  } = useProjectStore();

  //this useMemo hook calculate the percentage progress based on tasks are in completed board
  const calculateProgress = useMemo(() => {
    //check if the selected project is not null
    if (selectedProject) {
      //get the total tasks in the all boards of the selected project
      const totalTasks = selectedProject.boards.reduce((total, board) => {
        return total + board.tasks.length;
      }, 0);
      //get the completed tasks
      const completedTasks = selectedProject.boards[2].tasks.length;
      //return the progress
      return Math.ceil((completedTasks / totalTasks) * 100);
    }

    //otherwise if the selected project is null, return 0
    return 0;
  }, [selectedProject]);

  const primaryColor = "#15A25E";

  return (
    <CircularProgressbar
      className="text-primary size-52 my-10"
      value={calculateProgress}
      styles={{
        // Customize the path (progress bar)
        path: {
          stroke: primaryColor, // Change the progress bar color
          strokeLinecap: "round", // Rounded edges
          transition: "stroke-dashoffset 0.5s ease 0s", // Smooth transition
        },
        // Customize the trail (background)
        trail: {
          stroke: "#e2e8f0", // Change the background color
        },
        // Customize the text
        text: {
          fill: primaryColor, // Change the text color
          fontSize: "16px", // Change the text size
        },
      }}
      text={`${calculateProgress}%`}
    />
  );
}
