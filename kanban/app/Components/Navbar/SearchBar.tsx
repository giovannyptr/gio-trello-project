import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
  const { theme } = useTheme();

  const bgColor = theme === "dark" ? "bg-transparent" : "bg-white";
  return (
    <div className="relative">
      <IoSearch className="absolute text-2xl left-3 top-2 text-gray-400" />
      <Input
        className={`${bgColor} rounded-3xl h-10 pl-11  shadow-none`}
        placeholder="Search..."
      />
    </div>
  );
}
