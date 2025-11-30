import React, { useState, useCallback, useEffect } from "react";
import { useSearch } from "../../context/SearchContext";
import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/tables/DataTable";
import AddModal from "../../components/modals/AddModal";
import EditModal from "../../components/modals/EditModal";
import DeleteConfirmModal from "../../components/modals/DeleteConfirmModal";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import usePagination from "../../hooks/usePagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Tarifs() {
  const { searchTerm } = useSearch();
  const [tarifs, setTarifs] = useState([
    {
      id: 1,
      type: "Express",
      zone: "Alger",
      poidsMin: 0,
      poidsMax: 5,
      prix: 500,
    },
    {
      id: 2,
      type: "Standard",
      zone: "Alger",
      poidsMin: 0,
      poidsMax: 10,
      prix: 300,
    },
  ]);
  const [filteredTarifs, setFilteredTarifs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingTarif, setEditingTarif] = useState(null);
  const [deletingTarif, setDeletingTarif] = useState(null);
  const [newTarif, setNewTarif] = useState({
    type: "",
    zone: "",
    poidsMin: "",
    poidsMax: "",
    prix: "",
  });

  const { currentPage, setCurrentPage, showAll, setShowAll } = usePagination(
    filteredTarifs,
    6
  );

  useEffect(() => {
    setFilteredTarifs(tarifs);
  }, [tarifs]);

  const applyFilter = useCallback(
    (term) => {
      let filtered = tarifs;
      if (term.trim()) {
        const normalized = term.trim().toLowerCase();
        filtered = filtered.filter((t) =>
          [t.type, t.zone].some((field) => field?.toLowerCase().includes(normalized))
        );
      }
      setFilteredTarifs(filtered);
    },
    [tarifs]
  );

  useEffect(() => {
    applyFilter(searchTerm);
  }, [searchTerm, applyFilter]);

  const handleAdd = (e) => {
    e.preventDefault();
    const newId = Math.max(...tarifs.map((t) => t.id), 0) + 1;
    setTarifs([
      ...tarifs,
      {
        ...newTarif,
        id: newId,
        poidsMin: parseFloat(newTarif.poidsMin),
        poidsMax: parseFloat(newTarif.poidsMax),
        prix: parseFloat(newTarif.prix),
      },
    ]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = (tarif) => {
    setEditingTarif(tarif);
    setNewTarif({
      ...tarif,
      poidsMin: tarif.poidsMin.toString(),
      poidsMax: tarif.poidsMax.toString(),
      prix: tarif.prix.toString(),
    });
    setShowEditModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setTarifs(
      tarifs.map((t) =>
        t.id === editingTarif.id
          ? {
              ...newTarif,
              id: editingTarif.id,
              poidsMin: parseFloat(newTarif.poidsMin),
              poidsMax: parseFloat(newTarif.poidsMax),
              prix: parseFloat(newTarif.prix),
            }
          : t
      )
    );
    setShowEditModal(false);
    resetForm();
  };

  const confirmDelete = () => {
    setTarifs(tarifs.filter((t) => t.id !== deletingTarif.id));
    setShowDeleteModal(false);
    setDeletingTarif(null);
  };

  const resetForm = () => {
    setNewTarif({
      type: "",
      zone: "",
      poidsMin: "",
      poidsMax: "",
      prix: "",
    });
    setEditingTarif(null);
  };

  const columns = [
    { key: "type", label: "Type" },
    { key: "zone", label: "Zone" },
    {
      key: "poidsMin",
      label: "Poids Min (kg)",
    },
    {
      key: "poidsMax",
      label: "Poids Max (kg)",
    },
    {
      key: "prix",
      label: "Prix (DZD)",
      render: (value) => `${value.toLocaleString()} DZD`,
    },
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
          setDeletingTarif(row);
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
          title="Gestion des Tarifs"
          count={filteredTarifs.length}
          onAdd={() => setShowAddModal(true)}
        />

        <DataTable
          columns={columns}
          data={filteredTarifs}
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
        title="Ajouter un Tarif"
        onSubmit={handleAdd}
      >
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="Type"
            value={newTarif.type}
            onChange={(e) => setNewTarif({ ...newTarif, type: e.target.value })}
            options={[
              { value: "Express", label: "Express" },
              { value: "Standard", label: "Standard" },
            ]}
            required
          />
          <InputField
            label="Zone"
            value={newTarif.zone}
            onChange={(e) => setNewTarif({ ...newTarif, zone: e.target.value })}
            required
          />
          <InputField
            label="Poids Min (kg)"
            type="number"
            value={newTarif.poidsMin}
            onChange={(e) =>
              setNewTarif({ ...newTarif, poidsMin: e.target.value })
            }
            required
          />
          <InputField
            label="Poids Max (kg)"
            type="number"
            value={newTarif.poidsMax}
            onChange={(e) =>
              setNewTarif({ ...newTarif, poidsMax: e.target.value })
            }
            required
          />
          <InputField
            label="Prix (DZD)"
            type="number"
            value={newTarif.prix}
            onChange={(e) => setNewTarif({ ...newTarif, prix: e.target.value })}
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
        title="Modifier le Tarif"
        onSubmit={handleUpdate}
      >
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="Type"
            value={newTarif.type}
            onChange={(e) => setNewTarif({ ...newTarif, type: e.target.value })}
            options={[
              { value: "Express", label: "Express" },
              { value: "Standard", label: "Standard" },
            ]}
            required
          />
          <InputField
            label="Zone"
            value={newTarif.zone}
            onChange={(e) => setNewTarif({ ...newTarif, zone: e.target.value })}
            required
          />
          <InputField
            label="Poids Min (kg)"
            type="number"
            value={newTarif.poidsMin}
            onChange={(e) =>
              setNewTarif({ ...newTarif, poidsMin: e.target.value })
            }
            required
          />
          <InputField
            label="Poids Max (kg)"
            type="number"
            value={newTarif.poidsMax}
            onChange={(e) =>
              setNewTarif({ ...newTarif, poidsMax: e.target.value })
            }
            required
          />
          <InputField
            label="Prix (DZD)"
            type="number"
            value={newTarif.prix}
            onChange={(e) => setNewTarif({ ...newTarif, prix: e.target.value })}
            required
          />
        </div>
      </EditModal>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingTarif(null);
        }}
        onConfirm={confirmDelete}
        message={`Êtes-vous sûr de vouloir supprimer ce tarif ?`}
      />
    </div>
  );
}

export default Tarifs;
