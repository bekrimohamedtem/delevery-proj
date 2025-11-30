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

function StockList() {
  const { searchTerm } = useSearch();
  const [stock, setStock] = useState([
    {
      id: 1,
      nom: "Carton Standard",
      quantite: 150,
      seuil: 50,
      unite: "Unité",
      statut: "Disponible",
    },
    {
      id: 2,
      nom: "Ruban Adhésif",
      quantite: 25,
      seuil: 30,
      unite: "Rouleau",
      statut: "Stock faible",
    },
  ]);
  const [filteredStock, setFilteredStock] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    nom: "",
    quantite: "",
    seuil: "",
    unite: "",
    statut: "Disponible",
  });

  const { currentPage, setCurrentPage, showAll, setShowAll } = usePagination(
    filteredStock,
    6
  );

  useEffect(() => {
    setFilteredStock(stock);
  }, [stock]);

  const applyFilter = useCallback(
    (term) => {
      let filtered = stock;
      if (term.trim()) {
        const normalized = term.trim().toLowerCase();
        filtered = filtered.filter((s) =>
          [s.nom, s.unite, s.statut].some((field) =>
            field?.toLowerCase().includes(normalized)
          )
        );
      }
      setFilteredStock(filtered);
    },
    [stock]
  );

  useEffect(() => {
    applyFilter(searchTerm);
  }, [searchTerm, applyFilter]);

  const handleAdd = (e) => {
    e.preventDefault();
    const newId = Math.max(...stock.map((s) => s.id), 0) + 1;
    setStock([
      ...stock,
      {
        ...newItem,
        id: newId,
        quantite: parseInt(newItem.quantite),
        seuil: parseInt(newItem.seuil),
      },
    ]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setNewItem({ ...item, quantite: item.quantite.toString(), seuil: item.seuil.toString() });
    setShowEditModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setStock(
      stock.map((s) =>
        s.id === editingItem.id
          ? {
              ...newItem,
              id: editingItem.id,
              quantite: parseInt(newItem.quantite),
              seuil: parseInt(newItem.seuil),
            }
          : s
      )
    );
    setShowEditModal(false);
    resetForm();
  };

  const confirmDelete = () => {
    setStock(stock.filter((s) => s.id !== deletingItem.id));
    setShowDeleteModal(false);
    setDeletingItem(null);
  };

  const resetForm = () => {
    setNewItem({
      nom: "",
      quantite: "",
      seuil: "",
      unite: "",
      statut: "Disponible",
    });
    setEditingItem(null);
  };

  const columns = [
    { key: "nom", label: "Nom" },
    { key: "quantite", label: "Quantité" },
    { key: "seuil", label: "Seuil" },
    { key: "unite", label: "Unité" },
    {
      key: "statut",
      label: "Statut",
      render: (value) => (
        <Badge variant={value === "Disponible" ? "success" : "warning"}>
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
          setDeletingItem(row);
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
          title="Liste du Stock"
          count={filteredStock.length}
          onAdd={() => setShowAddModal(true)}
        />

        <DataTable
          columns={columns}
          data={filteredStock}
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
        title="Ajouter un Article"
        onSubmit={handleAdd}
      >
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Nom"
            value={newItem.nom}
            onChange={(e) => setNewItem({ ...newItem, nom: e.target.value })}
            required
          />
          <InputField
            label="Quantité"
            type="number"
            value={newItem.quantite}
            onChange={(e) => setNewItem({ ...newItem, quantite: e.target.value })}
            required
          />
          <InputField
            label="Seuil"
            type="number"
            value={newItem.seuil}
            onChange={(e) => setNewItem({ ...newItem, seuil: e.target.value })}
            required
          />
          <InputField
            label="Unité"
            value={newItem.unite}
            onChange={(e) => setNewItem({ ...newItem, unite: e.target.value })}
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
        title="Modifier l'Article"
        onSubmit={handleUpdate}
      >
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Nom"
            value={newItem.nom}
            onChange={(e) => setNewItem({ ...newItem, nom: e.target.value })}
            required
          />
          <InputField
            label="Quantité"
            type="number"
            value={newItem.quantite}
            onChange={(e) => setNewItem({ ...newItem, quantite: e.target.value })}
            required
          />
          <InputField
            label="Seuil"
            type="number"
            value={newItem.seuil}
            onChange={(e) => setNewItem({ ...newItem, seuil: e.target.value })}
            required
          />
          <InputField
            label="Unité"
            value={newItem.unite}
            onChange={(e) => setNewItem({ ...newItem, unite: e.target.value })}
            required
          />
        </div>
      </EditModal>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingItem(null);
        }}
        onConfirm={confirmDelete}
        message={`Êtes-vous sûr de vouloir supprimer "${deletingItem?.nom}" ?`}
      />
    </div>
  );
}

export default StockList;
