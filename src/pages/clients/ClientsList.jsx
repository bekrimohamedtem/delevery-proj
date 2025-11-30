import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

function ClientsList() {
  const { searchTerm } = useSearch();
  const navigate = useNavigate();
  const [clients, setClients] = useState([
    {
      id: 1,
      nom: "Entreprise ABC",
      email: "contact@abc.dz",
      telephone: "023123456",
      adresse: "Alger",
      type: "Entreprise",
    },
    {
      id: 2,
      nom: "Société XYZ",
      email: "info@xyz.dz",
      telephone: "023123457",
      adresse: "Oran",
      type: "Entreprise",
    },
  ]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [deletingClient, setDeletingClient] = useState(null);
  const [newClient, setNewClient] = useState({
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
    type: "Particulier",
  });

  const { currentPage, setCurrentPage, showAll, setShowAll } = usePagination(
    filteredClients,
    6
  );

  useEffect(() => {
    setFilteredClients(clients);
  }, [clients]);

  const applyFilter = useCallback(
    (term) => {
      let filtered = clients;
      if (term.trim()) {
        const normalized = term.trim().toLowerCase();
        filtered = filtered.filter((c) =>
          [c.nom, c.email, c.telephone, c.adresse, c.type].some((field) =>
            field?.toLowerCase().includes(normalized)
          )
        );
      }
      setFilteredClients(filtered);
    },
    [clients]
  );

  useEffect(() => {
    applyFilter(searchTerm);
  }, [searchTerm, applyFilter]);

  const handleAdd = (e) => {
    e.preventDefault();
    const newId = Math.max(...clients.map((c) => c.id), 0) + 1;
    setClients([...clients, { ...newClient, id: newId }]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setNewClient(client);
    setShowEditModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setClients(
      clients.map((c) =>
        c.id === editingClient.id ? { ...newClient, id: editingClient.id } : c
      )
    );
    setShowEditModal(false);
    resetForm();
  };

  const confirmDelete = () => {
    setClients(clients.filter((c) => c.id !== deletingClient.id));
    setShowDeleteModal(false);
    setDeletingClient(null);
  };

  const resetForm = () => {
    setNewClient({
      nom: "",
      email: "",
      telephone: "",
      adresse: "",
      type: "Particulier",
    });
    setEditingClient(null);
  };

  const columns = [
    { key: "nom", label: "Nom" },
    { key: "email", label: "Email" },
    { key: "telephone", label: "Téléphone" },
    { key: "adresse", label: "Adresse" },
    {
      key: "type",
      label: "Type",
      render: (value) => <Badge variant="info">{value}</Badge>,
    },
  ];

  const tableActions = (row) => (
    <>
      <button
        className="bg-blue-600 text-white w-7 h-7 rounded-md flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/clients/${row.id}`);
        }}
      >
        <EditIcon fontSize="small" />
      </button>
      <button
        className="bg-red-600 text-white w-7 h-7 rounded-md flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          setDeletingClient(row);
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
          title="Liste des Clients"
          count={filteredClients.length}
          onAdd={() => setShowAddModal(true)}
        />

        <DataTable
          columns={columns}
          data={filteredClients}
          currentPage={currentPage}
          itemsPerPage={6}
          showAll={showAll}
          onPageChange={setCurrentPage}
          onShowAll={setShowAll}
          actions={tableActions}
          onRowClick={(row) => navigate(`/clients/${row.id}`)}
        />
      </div>

      <AddModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        title="Ajouter un Client"
        onSubmit={handleAdd}
      >
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Nom"
            value={newClient.nom}
            onChange={(e) => setNewClient({ ...newClient, nom: e.target.value })}
            required
          />
          <InputField
            label="Email"
            type="email"
            value={newClient.email}
            onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
            required
          />
          <InputField
            label="Téléphone"
            value={newClient.telephone}
            onChange={(e) =>
              setNewClient({ ...newClient, telephone: e.target.value })
            }
            required
          />
          <InputField
            label="Adresse"
            value={newClient.adresse}
            onChange={(e) => setNewClient({ ...newClient, adresse: e.target.value })}
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
        title="Modifier le Client"
        onSubmit={handleUpdate}
      >
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Nom"
            value={newClient.nom}
            onChange={(e) => setNewClient({ ...newClient, nom: e.target.value })}
            required
          />
          <InputField
            label="Email"
            type="email"
            value={newClient.email}
            onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
            required
          />
          <InputField
            label="Téléphone"
            value={newClient.telephone}
            onChange={(e) =>
              setNewClient({ ...newClient, telephone: e.target.value })
            }
            required
          />
          <InputField
            label="Adresse"
            value={newClient.adresse}
            onChange={(e) => setNewClient({ ...newClient, adresse: e.target.value })}
            required
          />
        </div>
      </EditModal>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingClient(null);
        }}
        onConfirm={confirmDelete}
        message={`Êtes-vous sûr de vouloir supprimer le client "${deletingClient?.nom}" ?`}
      />
    </div>
  );
}

export default ClientsList;
