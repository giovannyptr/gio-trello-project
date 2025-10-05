import { Priority } from "@/app/data/data-types";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { RiArrowUpDoubleLine } from "react-icons/ri";

export function renderPriorityComponent(priority: Priority) {
  switch (priority) {
    case "Low":
      return {
        bgColor: "bg-green-500/15 ",
        textColor: "text-green-500 ",
        icon: <MdKeyboardDoubleArrowDown className={"text-green-500 "} />,
      };
    case "Medium":
      return {
        icon: <RiArrowRightDoubleFill className="text-yellow-500" />,
        bgColor: "bg-yellow-500/15 ",
        textColor: "text-yellow-500 ",
      };
    case "High":
      return {
        icon: <RiArrowUpDoubleLine className="text-red-500" />,
        bgColor: "bg-red-500/15 ",
        textColor: "text-red-500 ",
      };
    default:
      break;
  }
}
