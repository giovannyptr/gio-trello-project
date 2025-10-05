import useProjectStore from "@/app/hooks/useProjectsStore";
import { useMemo, useState } from "react";
import { Board, Task } from "@/app/data/data-types";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DroppableSingleBoard from "./DroppableSingleBoard";

import DragOverlayTask from "./DragOverlayTask";

export default function ProjectsAreaTasksBoard() {
  const { state, actions } = useProjectStore();
  const { selectedProject, allProjects } = state;
  const { setAllProjects } = actions;
  //
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const projectBoards = useMemo(() => {
    return selectedProject ? selectedProject.boards : [];
  }, [selectedProject]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0, // 8px movement threshold before drag starts
      },
    })
  );

  const boardToShow: Board[] = useMemo(() => {
    return selectedProject ? selectedProject.boards : [];
  }, [selectedProject]);

  //handle drag start function
  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    const findBoardIndex = projectBoards.findIndex((board) =>
      board.tasks.some((task) => task.id === active.id)
    );

    const findTask = projectBoards[findBoardIndex].tasks.find(
      (task) => task.id === active.id
    );

    if (findTask) {
      setActiveTask(findTask);
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active: activeTask, over: targetTask } = event;
    if (!targetTask) return;

    // Find source board (board containing the dragged item)
    const sourceBoard = projectBoards.find((board) =>
      board.tasks.some((task) => task.id === activeTask.id)
    );

    // Find target board (could be either a board ID or an item ID)
    let targetBoard = projectBoards.find((board) =>
      board.tasks.some((task) => task.id === targetTask.id)
    );

    // If we are dragging over a board directly (not a task within a board)
    if (!targetBoard) {
      targetBoard = projectBoards.find((board) => board.name === targetTask.id);
    }

    // If source or target board is not found, or if they are the same, return
    if (!sourceBoard || !targetBoard || sourceBoard.name === targetBoard.name)
      return;

    // First, copy the project boards
    const updatedBoards = projectBoards.map((board) => ({
      ...board,
      tasks: [...board.tasks],
    }));

    // Get the index of the board where we started dragging the task
    const sourceBoardIndex = updatedBoards.findIndex(
      (board) => board.name === sourceBoard.name
    );

    // Get the index of the board where we want to drag the task
    const targetBoardIndex = updatedBoards.findIndex(
      (board) => board.name === targetBoard.name
    );

    // Find the task being dragged
    const draggedTask = updatedBoards[sourceBoardIndex].tasks.find(
      (task) => task.id === activeTask.id
    );

    // Remove the task from the source board
    updatedBoards[sourceBoardIndex].tasks = updatedBoards[
      sourceBoardIndex
    ].tasks.filter((task) => task.id !== activeTask.id);

    // If dropping onto a board directly (empty board case)
    if (draggedTask) {
      if (targetTask.id === targetBoard.name) {
        // Add to the end of the target board
        updatedBoards[targetBoardIndex].tasks.push(draggedTask);
      } else {
        // If dropping onto an item, insert at the correct position
        const targetTaskIndex = updatedBoards[targetBoardIndex].tasks.findIndex(
          (task) => task.id === targetTask.id
        );

        // Insert the dragged task at the correct position
        updatedBoards[targetBoardIndex].tasks.splice(
          targetTaskIndex,
          0,
          draggedTask
        );
      }
    }

    // Update the state with the new board arrangement
    if (selectedProject && allProjects) {
      const updatedAllProjects = allProjects.map((project) => {
        if (project.id === selectedProject.id) {
          return { ...project, boards: updatedBoards };
        }
        return project;
      });

      // Update the state
      setAllProjects(updatedAllProjects);
    }
  }
  //handle drag end function
  function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null);
    // Extract the dragged item and the target item from the event
    const { active: draggedTask, over: targetTask } = event;

    // Check if the dragged item is different from the target item
    //and alos if the target item is not null
    // (This ensures we only reorder when the item is dropped in a new position)
    if (draggedTask?.id !== targetTask?.id && draggedTask) {
      //const get the active board index
      const activeBoardIndex = projectBoards.findIndex((board) =>
        board.tasks.some((task) => task.id === draggedTask.id)
      );

      // Find the index of the dragged task in the list withint the active board index
      const draggedTaskIndex = projectBoards[activeBoardIndex].tasks.findIndex(
        (task) => task.id === draggedTask.id
      );

      //Find the index of the target task
      const targetTaskIndex = projectBoards[activeBoardIndex].tasks.findIndex(
        (task) => task.id === targetTask?.id
      );

      // Use the `arrayMove` function to reorder the items
      // This swaps the dragged item with the target item
      const updatedTasksArray = arrayMove(
        projectBoards[activeBoardIndex].tasks,
        draggedTaskIndex,
        targetTaskIndex
      );

      //create a copy of the projects boards
      const updatedProjectsBoard = [...projectBoards];

      //update the object in updatedProjectsBoard array based on activeBoardIndex
      updatedProjectsBoard[activeBoardIndex] = {
        ...updatedProjectsBoard[activeBoardIndex],
        tasks: updatedTasksArray,
      };

      // find the project id based on the selectedProject, and then update the boards property
      if (selectedProject && allProjects) {
        const updateAllProjects = allProjects?.map((project) => {
          if (project.id === selectedProject?.id) {
            return { ...project, boards: updatedProjectsBoard };
          }

          return project;
        });

        //update the state
        setAllProjects(updateAllProjects);
      }
    }
  }

  return (
    <div className="h-full rounded-2xl flex items-center mt-4  gap-3">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {boardToShow.map((board, index) => (
          <SortableContext
            items={board.tasks}
            key={board.name}
            strategy={verticalListSortingStrategy}
          >
            <DroppableSingleBoard key={index} board={board} />
          </SortableContext>
        ))}
        <DragOverlay>
          {activeTask ? <DragOverlayTask task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
