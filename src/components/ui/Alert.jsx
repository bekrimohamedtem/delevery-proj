import React from "react";

function Alert({ children, variant = "info", onClose }) {
  const variants = {
    info: "bg-blue-100 text-blue-800 border-blue-200",
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    danger: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div className={`${variants[variant]} border rounded-lg p-4 flex justify-between items-center`}>
      <div>{children}</div>
      {onClose && (
        <button onClick={onClose} className="ml-4 text-gray-500 hover:text-gray-700">
          ×
        </button>
      )}
    </div>
  );
}

export default Alert;
