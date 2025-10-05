import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/app/ModeToggle";
import SearchBar from "./SearchBar";
import AppNameAndLogo from "./AppNameAndLogo";
import ProjectDialog from "../Dialogs/ProjectDialog/ProjectDialog";

export default function Navbar() {
  return (
    <div className="poppins p-6 flex justify-between items-center">
      <div className="flex items-center gap-16">
        <AppNameAndLogo />
        <SearchBar />
      </div>
      <div className="flex items-center gap-5">
        <ModeToggle />
        <Separator orientation="vertical" className="h-5 w-[2px] bg-gray-500" />
        {/* create project button */}
        <ProjectDialog />
      </div>
    </div>
  );
}
