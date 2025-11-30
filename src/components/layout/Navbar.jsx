import React from "react";
import { BellIcon, UserIcon } from "lucide-react";
import { MessageCircleIcon } from "lucide-react";
import SearchIcon from "@mui/icons-material/Search";
import { useSidebar } from "../../context/SidebarContext";
import { useSearch } from "../../context/SearchContext";

function Navbar() {
  const { isOpen } = useSidebar();
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <header
      className={`fixed top-0 right-0 h-16 bg-white shadow-sm border-b border-gray-200 z-40 transition-all duration-300 ${
        isOpen ? "left-56" : "left-20"
      }`}
    >
      <div className="flex items-center justify-between h-full px-6">
        <div className="relative min-w-[310px] max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <MessageCircleIcon className="text-gray-950 hover:text-gray-700 transition-colors cursor-pointer" />
          <BellIcon className="text-gray-950 hover:text-gray-700 transition-colors cursor-pointer" />
          <div className="flex flex-col items-end ml-4">
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <span className="text-xs text-gray-500">Founder</span>
          </div>
          <div className="bg-gray-400 flex justify-center items-center h-10 w-10 rounded-full">
            <UserIcon size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;


