import React from "react";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";

function PageHeader({ title, count, onAdd, onFilter, showAdd = true, showFilter = true }) {
  return (
    <div className="flex justify-between items-center p-0 px-4 mb-4">
      <h2 className="text-md font-bold">
        {title}{" "}
        {count !== undefined && (
          <span className="text-sm bg-violet-500 text-white ml-2 px-2 py-0.5 rounded-md">
            {count}
          </span>
        )}
      </h2>
      <div className="flex gap-4">
        {showAdd && (
          <button
            className="flex items-center gap-1 bg-black text-white px-3 py-1 rounded-md hover:scale-105 transition-transform"
            onClick={onAdd}
          >
            <AddIcon /> Ajouter
          </button>
        )}
        {showFilter && (
          <button
            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:scale-105 transition-transform"
            onClick={onFilter}
          >
            <FilterListIcon /> Filtrer
          </button>
        )}
      </div>
    </div>
  );
}

export default PageHeader;


