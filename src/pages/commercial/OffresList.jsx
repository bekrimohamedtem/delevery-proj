import React, { useState, useCallback, useEffect } from "react";
import { useSearch } from "../../context/SearchContext";
import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/tables/DataTable";
import AddModal from "../../components/modals/AddModal";
import EditModal from "../../components/modals/EditModal";
import DeleteConfirmModal from "../../components/modals/DeleteConfirmModal";
import InputField from "../../components/forms/InputField";
import Badge from "../../components/ui/Badge";
import usePagination from "../../hooks/usePagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function OffresList() {
  const { searchTerm } = useSearch();
  const [offres, setOffres] = useState([
    {
      id: 1,
      nom: "Offre Express",
      description: "Livraison express en 24h",
      prix: 500,
      statut: "Active",
    },
    {
      id: 2,
      nom: "Offre Standard",
      description: "Livraison standard 3-5 jours",
      prix: 300,
      statut: "Active",
    },
  ]);
  const [filteredOffres, setFilteredOffres] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingOffre, setEditingOffre] = useState(null);
  const [deletingOffre, setDeletingOffre] = useState(null);
  const [newOffre, setNewOffre] = useState({
    nom: "",
    description: "",
    prix: "",
    statut: "Active",
  });

  const { currentPage, setCurrentPage, showAll, setShowAll } = usePagination(
    filteredOffres,
    6
  );

  useEffect(() => {
    setFilteredOffres(offres);
  }, [offres]);

  const applyFilter = useCallback(
    (term) => {
      let filtered = offres;
      if (term.trim()) {
        const normalized = term.trim().toLowerCase();
        filtered = filtered.filter((o) =>
          [o.nom, o.description, o.statut].some((field) =>
            field?.toLowerCase().includes(normalized)
          )
        );
      }
      setFilteredOffres(filtered);
    },
    [offres]
  );

  useEffect(() => {
    applyFilter(searchTerm);
  }, [searchTerm, applyFilter]);

  const handleAdd = (e) => {
    e.preventDefault();
    const newId = Math.max(...offres.map((o) => o.id), 0) + 1;
    setOffres([...offres, { ...newOffre, id: newId, prix: parseFloat(newOffre.prix) }]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = (offre) => {
    setEditingOffre(offre);
    setNewOffre({ ...offre, prix: offre.prix.toString() });
    setShowEditModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setOffres(
      offres.map((o) =>
        o.id === editingOffre.id
          ? { ...newOffre, id: editingOffre.id, prix: parseFloat(newOffre.prix) }
          : o
      )
    );
    setShowEditModal(false);
    resetForm();
  };

  const confirmDelete = () => {
    setOffres(offres.filter((o) => o.id !== deletingOffre.id));
    setShowDeleteModal(false);
    setDeletingOffre(null);
  };

  const resetForm = () => {
    setNewOffre({
      nom: "",
      description: "",
      prix: "",
      statut: "Active",
    });
    setEditingOffre(null);
  };

  const columns = [
    { key: "nom", label: "Nom" },
    { key: "description", label: "Description" },
    {
      key: "prix",
      label: "Prix",
      render: (value) => `${value} DZD`,
    },
    {
      key: "statut",
      label: "Statut",
      render: (value) => (
        <Badge variant={value === "Active" ? "success" : "default"}>
          {value}
        </Badge>
      ),
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
          setDeletingOffre(row);
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
          title="Liste des Offres"
          count={filteredOffres.length}
          onAdd={() => setShowAddModal(true)}
        />

        <DataTable
          columns={columns}
          data={filteredOffres}
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
        title="Ajouter une Offre"
        onSubmit={handleAdd}
      >
        <div className="space-y-4">
          <InputField
            label="Nom"
            value={newOffre.nom}
            onChange={(e) => setNewOffre({ ...newOffre, nom: e.target.value })}
            required
          />
          <InputField
            label="Description"
            value={newOffre.description}
            onChange={(e) =>
              setNewOffre({ ...newOffre, description: e.target.value })
            }
            required
          />
          <InputField
            label="Prix"
            type="number"
            value={newOffre.prix}
            onChange={(e) => setNewOffre({ ...newOffre, prix: e.target.value })}
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
        title="Modifier l'Offre"
        onSubmit={handleUpdate}
      >
        <div className="space-y-4">
          <InputField
            label="Nom"
            value={newOffre.nom}
            onChange={(e) => setNewOffre({ ...newOffre, nom: e.target.value })}
            required
          />
          <InputField
            label="Description"
            value={newOffre.description}
            onChange={(e) =>
              setNewOffre({ ...newOffre, description: e.target.value })
            }
            required
          />
          <InputField
            label="Prix"
            type="number"
            value={newOffre.prix}
            onChange={(e) => setNewOffre({ ...newOffre, prix: e.target.value })}
            required
          />
        </div>
      </EditModal>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingOffre(null);
        }}
        onConfirm={confirmDelete}
        message={`Êtes-vous sûr de vouloir supprimer l'offre "${deletingOffre?.nom}" ?`}
      />
    </div>
  );
}

export default OffresList;
