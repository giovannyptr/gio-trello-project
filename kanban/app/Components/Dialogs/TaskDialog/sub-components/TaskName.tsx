import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { FaCircleExclamation } from "react-icons/fa6";
import { useFormContext } from "react-hook-form";
import { TaskDialogFormData } from "../taskDialogSchema";

export default function TaskName() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TaskDialogFormData>();
  return (
    <div className="flex flex-col gap-2">
      {/* label */}
      <Label className="opacity-75 text-sm font-medium">Task Title</Label>
      {/* the input */}
      <Input
        {...register("taskTitle")}
        placeholder="Joe Doe..."
        className="h-11"
      />

      {/* error container */}
      {errors.taskTitle && (
        <div className="text-red-500 text-[12px] flex items-center gap-1">
          {/* exclamation icon */}
          <FaCircleExclamation />
          {/* error label */}
          <p>{errors.taskTitle.message}</p>
        </div>
      )}
    </div>
  );
}
