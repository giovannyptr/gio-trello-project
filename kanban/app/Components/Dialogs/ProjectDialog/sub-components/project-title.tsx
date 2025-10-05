import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { FaCircleExclamation } from "react-icons/fa6";
import { useFormContext } from "react-hook-form";
import { ProjectDialogFormData } from "../projectDialogSchema";

export default function ProjectName() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProjectDialogFormData>();
  return (
    <div className="flex flex-col gap-2 w-full  border">
      {/* label */}
      <Label className="opacity-75 text-sm font-medium">Project Name</Label>
      {/* the input */}
      <Input
        {...register("projectTitle")}
        placeholder="Build an app..."
        className="h-11 w-full"
      />
      {/* error container */}
      <div className="text-red-500 text-[12px] flex items-center gap-1 h-6">
        {errors.projectTitle && (
          <>
            {/* exclamation icon */}
            <FaCircleExclamation />
            {/* error label */}
            <p>{errors.projectTitle.message}</p>
          </>
        )}
      </div>
    </div>
  );
}
