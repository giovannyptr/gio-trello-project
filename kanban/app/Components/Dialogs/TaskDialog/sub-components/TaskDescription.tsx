import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { FaCircleExclamation } from "react-icons/fa6";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState } from "react";
import { useFormContext } from "react-hook-form";
import { TaskDialogFormData } from "../taskDialogSchema";

export default function TaskDescription() {
  // const [textCounter, setTextCouter] = useState("");
  const {
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useFormContext<TaskDialogFormData>();

  function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    //clear the error when the state is updating
    clearErrors("taskDescription");
    const textInput = e.target.value;
    if (textInput.length <= 50) {
      //update the valu
      setValue("taskDescription", textInput);
    }
  }
  return (
    <div className="flex flex-col gap-2 mt-4">
      {/* label */}
      <Label className="opacity-75 text-sm font-medium">Task Description</Label>
      {/* the input */}
      <Textarea
        value={getValues("taskDescription")}
        onChange={handleTextChange}
        placeholder="Give a description of the task..."
        className=" resize-none "
      />

      <div className="flex justify-between items-center">
        {/* error container */}
        {errors.taskDescription && (
          <div className="text-red-500 text-[12px] flex items-center gap-1">
            {/* exclamation icon */}
            <FaCircleExclamation />
            {/* error labelN*/}
            <p>{errors.taskDescription.message}</p>
          </div>
        )}

        <p className="text-[12px] text-gray-500">
          {getValues("taskDescription")?.length} / 50 Caracters
        </p>
      </div>
    </div>
  );
}
