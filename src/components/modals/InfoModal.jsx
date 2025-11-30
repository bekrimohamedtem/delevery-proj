import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../ui/Button";

function InfoModal({ isOpen, onClose, title, message, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <CloseIcon />
          </button>
        </div>
        {message && <p className="mb-6 text-gray-700">{message}</p>}
        {children && <div className="mb-6">{children}</div>}
        <div className="flex justify-end">
          <Button variant="primary" onClick={onClose}>
            Fermer
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
