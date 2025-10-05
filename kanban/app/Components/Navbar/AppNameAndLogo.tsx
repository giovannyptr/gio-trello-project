import { FaProjectDiagram } from "react-icons/fa";

export default function AppNameAndLogo() {
  return (
    <div className="flex items-center gap-2">
      {/* Logo */}
      <div className="bg-primary size-10 text-lg text-white rounded-xl flex justify-center items-center">
        <FaProjectDiagram />
      </div>
      {/* container for the name */}
      <div className="flex gap-1 items-center text-xl">
        <span className="text-xl font-bold"> Pro</span>
        <span className="text-xl">KanBan</span>
      </div>
    </div>
  );
}
