import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../ui/Button";

function EditModal({ isOpen, onClose, title, children, onSubmit, submitLabel = "Modifier" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {children}
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" variant="primary">
              {submitLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;


