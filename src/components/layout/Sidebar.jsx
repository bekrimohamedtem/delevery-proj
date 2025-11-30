import React from "react";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RouteIcon from "@mui/icons-material/Route";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import BarChartIcon from "@mui/icons-material/BarChart";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { UserIcon } from "lucide-react";

function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar();

  const menuItems = [
    { path: "/dashboard", icon: <BarChartIcon />, label: "Dashboard" },
    { path: "/colis", icon: <Inventory2Icon />, label: "Colis" },
    { path: "/livreurs", icon: <LocalShippingIcon />, label: "Livreurs" },
    { path: "/tracking", icon: <RouteIcon />, label: "Tracking" },
    { path: "/statistiques", icon: <BarChartIcon />, label: "Statistiques" },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-gray-900 text-white shadow-lg transition-all duration-300 z-50 ${
        isOpen ? "w-56" : "w-20"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo et bouton toggle */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {isOpen && <h1 className="text-xl font-bold">Logo</h1>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {isOpen ? (
              <ChevronLeftIcon className="text-white" />
            ) : (
              <MenuIcon className="text-white" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center ${
                      isOpen ? "gap-3 px-4" : "justify-center px-2"
                    } py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                  title={!isOpen ? item.label : ""}
                >
                  {item.icon}
                  {isOpen && <span>{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Profil utilisateur */}
        <div className="p-4 border-t border-gray-700">
          <div
            className={`flex items-center ${
              isOpen ? "gap-3" : "justify-center"
            } ${!isOpen ? "flex-col" : ""}`}
          >
            <div className="bg-gray-400 flex justify-center items-center h-10 w-10 rounded-full flex-shrink-0">
              <UserIcon size={20} />
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  John Doe
                </p>
                <span className="text-xs text-gray-400">Founder</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
