import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function TableActions({ onEdit, onDelete, onView }) {
  return (
    <div className="flex justify-center gap-2">
      {onView && (
        <button
          className="bg-blue-600 text-white w-7 h-7 rounded-md flex items-center justify-center"
          onClick={onView}
        >
          <EditIcon fontSize="small" />
        </button>
      )}
      {onEdit && (
        <button
          className="bg-blue-600 text-white w-7 h-7 rounded-md flex items-center justify-center"
          onClick={onEdit}
        >
          <EditIcon fontSize="small" />
        </button>
      )}
      {onDelete && (
        <button
          className="bg-red-600 text-white w-7 h-7 rounded-md flex items-center justify-center"
          onClick={onDelete}
        >
          <DeleteIcon fontSize="small" />
        </button>
      )}
    </div>
  );
}

export default TableActions;
