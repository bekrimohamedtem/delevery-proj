import React, { useState, useCallback, useEffect } from "react";
import { useSearch } from "../../context/SearchContext";
import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/tables/DataTable";
import AddModal from "../../components/modals/AddModal";
import EditModal from "../../components/modals/EditModal";
import DeleteConfirmModal from "../../components/modals/DeleteConfirmModal";
import InputField from "../../components/forms/InputField";
import usePagination from "../../hooks/usePagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ZonesManagement() {
  const { searchTerm } = useSearch();
  const [zones, setZones] = useState([
    { id: 1, nom: "Alger Centre", wilaya: "Alger", code: "16000" },
    { id: 2, nom: "Oran Centre", wilaya: "Oran", code: "31000" },
  ]);
  const [filteredZones, setFilteredZones] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingZone, setEditingZone] = useState(null);
  const [deletingZone, setDeletingZone] = useState(null);
  const [newZone, setNewZone] = useState({
    nom: "",
    wilaya: "",
    code: "",
  });

  const { currentPage, setCurrentPage, showAll, setShowAll } = usePagination(
    filteredZones,
    6
  );

  useEffect(() => {
    setFilteredZones(zones);
  }, [zones]);

  const applyFilter = useCallback(
    (term) => {
      let filtered = zones;
      if (term.trim()) {
        const normalized = term.trim().toLowerCase();
        filtered = filtered.filter((z) =>
          [z.nom, z.wilaya, z.code].some((field) =>
            field?.toLowerCase().includes(normalized)
          )
        );
      }
      setFilteredZones(filtered);
    },
    [zones]
  );

  useEffect(() => {
    applyFilter(searchTerm);
  }, [searchTerm, applyFilter]);

  const handleAdd = (e) => {
    e.preventDefault();
    const newId = Math.max(...zones.map((z) => z.id), 0) + 1;
    setZones([...zones, { ...newZone, id: newId }]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = (zone) => {
    setEditingZone(zone);
    setNewZone(zone);
    setShowEditModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setZones(
      zones.map((z) =>
        z.id === editingZone.id ? { ...newZone, id: editingZone.id } : z
      )
    );
    setShowEditModal(false);
    resetForm();
  };

  const confirmDelete = () => {
    setZones(zones.filter((z) => z.id !== deletingZone.id));
    setShowDeleteModal(false);
    setDeletingZone(null);
  };

  const resetForm = () => {
    setNewZone({
      nom: "",
      wilaya: "",
      code: "",
    });
    setEditingZone(null);
  };

  const columns = [
    { key: "nom", label: "Nom" },
    { key: "wilaya", label: "Wilaya" },
    { key: "code", label: "Code" },
  ];

  const tableActions = (row) => (
    <>
      <button
        className="bg-blue-600 text-white w-7 h-7 rounded-md flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          handleEdit(row);
        }}
      >
        <EditIcon fontSize="small" />
      </button>
      <button
        className="bg-red-600 text-white w-7 h-7 rounded-md flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          setDeletingZone(row);
          setShowDeleteModal(true);
        }}
      >
        <DeleteIcon fontSize="small" />
      </button>
    </>
  );

  return (
    <div className="font-sans p-6 bg-gray-200/70">
      <div className="bg-white rounded-lg w-[98%] mx-auto p-4">
        <PageHeader
          title="Gestion des Zones"
          count={filteredZones.length}
          onAdd={() => setShowAddModal(true)}
        />

        <DataTable
          columns={columns}
          data={filteredZones}
          currentPage={currentPage}
          itemsPerPage={6}
          showAll={showAll}
          onPageChange={setCurrentPage}
          onShowAll={setShowAll}
          actions={tableActions}
        />
      </div>

      <AddModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        title="Ajouter une Zone"
        onSubmit={handleAdd}
      >
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Nom"
            value={newZone.nom}
            onChange={(e) => setNewZone({ ...newZone, nom: e.target.value })}
            required
          />
          <InputField
            label="Wilaya"
            value={newZone.wilaya}
            onChange={(e) => setNewZone({ ...newZone, wilaya: e.target.value })}
            required
          />
          <InputField
            label="Code"
            value={newZone.code}
            onChange={(e) => setNewZone({ ...newZone, code: e.target.value })}
            required
          />
        </div>
      </AddModal>

      <EditModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          resetForm();
        }}
        title="Modifier la Zone"
        onSubmit={handleUpdate}
      >
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Nom"
            value={newZone.nom}
            onChange={(e) => setNewZone({ ...newZone, nom: e.target.value })}
            required
          />
          <InputField
            label="Wilaya"
            value={newZone.wilaya}
            onChange={(e) => setNewZone({ ...newZone, wilaya: e.target.value })}
            required
          />
          <InputField
            label="Code"
            value={newZone.code}
            onChange={(e) => setNewZone({ ...newZone, code: e.target.value })}
            required
          />
        </div>
      </EditModal>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingZone(null);
        }}
        onConfirm={confirmDelete}
        message={`Êtes-vous sûr de vouloir supprimer la zone "${deletingZone?.nom}" ?`}
      />
    </div>
  );
}

export default ZonesManagement;
