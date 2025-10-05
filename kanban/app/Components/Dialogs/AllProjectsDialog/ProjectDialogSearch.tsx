import { Input } from "@/components/ui/input";
import { useAllProjectsDialogContext } from "./AllProjectsDialogContext";

export default function ProjectDialogSearch() {
  const { searchQuery, setSearchQuery } = useAllProjectsDialogContext();
  return (
    <Input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search a project..."
      className="h-10 w-[50%]"
    />
  );
}
