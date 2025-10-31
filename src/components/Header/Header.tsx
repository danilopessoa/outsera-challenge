import { Clapperboard, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="h-14 bg-white border-b flex items-center px-4 sticky top-0 z-20">
      <button className="md:hidden mr-3" onClick={onMenuClick}>
        <Menu className="w-6 h-6" />
      </button>

      <div className="flex items-center gap-2">
        <NavLink to={"/"}>
          <Clapperboard className="w-6 h-6 text-indigo-600" />
        </NavLink>
        <span className="font-semibold text-lg">Outsera App Challenge</span>
      </div>
    </header>
  );
};

export { Header };
