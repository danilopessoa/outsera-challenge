import { NavLink } from "react-router-dom";

const menu = [
  { label: "Dashboard", to: "/" },
  { label: "Filmes", to: "/filmes" },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Backdrop mobile */}
      {open && <div className="fixed inset-0 bg-black/50 md:hidden z-30" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40
          w-60 bg-white border-r h-full
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <nav className="p-4 space-y-2">
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `block px-3 py-2 rounded hover:bg-gray-100 ${isActive ? "bg-gray-200 font-medium" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
