import React, { useState, useCallback, useEffect } from "react";
import { useSearch } from "../../context/SearchContext";
import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/tables/DataTable";
import AddModal from "../../components/modals/AddModal";
import EditModal from "../../components/modals/EditModal";
import DeleteConfirmModal from "../../components/modals/DeleteConfirmModal";
import AssignModal from "../../components/modals/AssignModal";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import usePagination from "../../hooks/usePagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function LivreursList() {
  const { searchTerm } = useSearch();
  const [livreurs, setLivreurs] = useState([
    {
      id: 1,
      nom: "Ahmed Benali",
      telephone: "0555123456",
      vehicule: "Moto",
      statut: "Disponible",
      zone: "Alger Centre",
    },
    {
      id: 2,
      nom: "Mohamed Kaddour",
      telephone: "0555123457",
      vehicule: "Voiture",
      statut: "En livraison",
      zone: "Oran",
    },
  ]);
  const [filteredLivreurs, setFilteredLivreurs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [editingLivreur, setEditingLivreur] = useState(null);
  const [deletingLivreur, setDeletingLivreur] = useState(null);
  const [assigningLivreur, setAssigningLivreur] = useState(null);
  // Liste des colis disponibles pour l'affectation
  const [colis] = useState([
    { id: 1, tracking: "TRK001", nom: "Colis Express", statut: "En attente" },
    {
      id: 2,
      tracking: "TRK002",
      nom: "Livraison Rapide",
      statut: "En attente",
    },
    { id: 3, tracking: "TRK003", nom: "Envoi Standard", statut: "En attente" },
  ]);
  const [newLivreur, setNewLivreur] = useState({
    nom: "",
    telephone: "",
    vehicule: "",
    statut: "Disponible",
    zone: "",
  });

  const { currentPage, setCurrentPage, showAll, setShowAll } = usePagination(
    filteredLivreurs,
    6
  );

  useEffect(() => {
    setFilteredLivreurs(livreurs);
  }, [livreurs]);

  const applyFilter = useCallback(
    (term) => {
      let filtered = livreurs;
      if (term.trim()) {
        const normalized = term.trim().toLowerCase();
        filtered = filtered.filter((l) =>
          [l.nom, l.telephone, l.vehicule, l.zone, l.statut].some((field) =>
            field?.toLowerCase().includes(normalized)
          )
        );
      }
      setFilteredLivreurs(filtered);
    },
    [livreurs]
  );

  useEffect(() => {
    applyFilter(searchTerm);
  }, [searchTerm, applyFilter]);

  const handleAdd = (e) => {
    e.preventDefault();
    const newId = Math.max(...livreurs.map((l) => l.id), 0) + 1;
    setLivreurs([...livreurs, { ...newLivreur, id: newId }]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = (livreur) => {
    setEditingLivreur(livreur);
    setNewLivreur(livreur);
    setShowEditModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setLivreurs(
      livreurs.map((l) =>
        l.id === editingLivreur.id
          ? { ...newLivreur, id: editingLivreur.id }
          : l
      )
    );
    setShowEditModal(false);
    resetForm();
  };

  const confirmDelete = () => {
    setLivreurs(livreurs.filter((l) => l.id !== deletingLivreur.id));
    setShowDeleteModal(false);
    setDeletingLivreur(null);
  };

  const resetForm = () => {
    setNewLivreur({
      nom: "",
      telephone: "",
      vehicule: "",
      statut: "Disponible",
      zone: "",
    });
    setEditingLivreur(null);
  };

  const handleAssignColis = (livreur) => {
    setAssigningLivreur(livreur);
    setShowAssignModal(true);
  };

  const confirmAssignColis = (colisId) => {
    if (assigningLivreur && colisId) {
      // TODO: Utiliser le service pour affecter le colis au livreur quand l'API sera prête
      // Pour le moment, on affiche juste un message de confirmation
      console.log(
        `Colis ${colisId} affecté au livreur ${assigningLivreur.nom}`
      );
      setShowAssignModal(false);
      setAssigningLivreur(null);
    }
  };

  const columns = [
    { key: "nom", label: "Nom" },
    { key: "telephone", label: "Téléphone" },
    { key: "vehicule", label: "Véhicule" },
    { key: "zone", label: "Zone" },
    {
      key: "statut",
      label: "Statut",
      render: (value) => (
        <Badge variant={value === "Disponible" ? "success" : "warning"}>
          {value}
        </Badge>
      ),
    },
    {
      key: "affectation",
      label: "Affectation",
      render: (value, row) => (
        <div className="flex items-center justify-center">
          <button
            className="bg-gray-600 text-white px-4 py-1.5 rounded-md hover:bg-gray-900 transition-colors font-medium"
            onClick={(e) => {
              e.stopPropagation();
              handleAssignColis(row);
            }}
          >
            Affecter un colis
          </button>
        </div>
      ),
    },
  ];

  const tableActions = (row) => (
    <div className="flex items-center justify-center gap-2">
      <button
        className="bg-blue-600 text-white w-7 h-7 rounded-md flex items-center justify-center hover:bg-blue-700 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          handleEdit(row);
        }}
        title="Modifier"
      >
        <EditIcon fontSize="small" />
      </button>
      <button
        className="bg-red-600 text-white w-7 h-7 rounded-md flex items-center justify-center hover:bg-red-700 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          setDeletingLivreur(row);
          setShowDeleteModal(true);
        }}
        title="Supprimer"
      >
        <DeleteIcon fontSize="small" />
      </button>
    </div>
  );

  return (
    <div className="font-sans p-6 bg-gray-200/70">
      <div className="bg-white rounded-lg w-[98%] mx-auto p-4">
        <PageHeader
          title="Liste des Livreurs"
          count={filteredLivreurs.length}
          onAdd={() => setShowAddModal(true)}
        />

        <DataTable
          columns={columns}
          data={filteredLivreurs}
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
        title="Ajouter un Livreur"
        onSubmit={handleAdd}
      >
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Nom"
            value={newLivreur.nom}
            onChange={(e) =>
              setNewLivreur({ ...newLivreur, nom: e.target.value })
            }
            required
          />
          <InputField
            label="Téléphone"
            value={newLivreur.telephone}
            onChange={(e) =>
              setNewLivreur({ ...newLivreur, telephone: e.target.value })
            }
            required
          />
          <SelectField
            label="Véhicule"
            value={newLivreur.vehicule}
            onChange={(e) =>
              setNewLivreur({ ...newLivreur, vehicule: e.target.value })
            }
            options={[
              { value: "Moto", label: "Moto" },
              { value: "Voiture", label: "Voiture" },
              { value: "Camion", label: "Camion" },
            ]}
            required
          />
          <InputField
            label="Zone"
            value={newLivreur.zone}
            onChange={(e) =>
              setNewLivreur({ ...newLivreur, zone: e.target.value })
            }
            required
          />
          <SelectField
            label="Statut"
            value={newLivreur.statut}
            onChange={(e) =>
              setNewLivreur({ ...newLivreur, statut: e.target.value })
            }
            options={[
              { value: "Disponible", label: "Disponible" },
              { value: "En livraison", label: "En livraison" },
              { value: "Indisponible", label: "Indisponible" },
            ]}
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
        title="Modifier le Livreur"
        onSubmit={handleUpdate}
      >
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Nom"
            value={newLivreur.nom}
            onChange={(e) =>
              setNewLivreur({ ...newLivreur, nom: e.target.value })
            }
            required
          />
          <InputField
            label="Téléphone"
            value={newLivreur.telephone}
            onChange={(e) =>
              setNewLivreur({ ...newLivreur, telephone: e.target.value })
            }
            required
          />
          <SelectField
            label="Véhicule"
            value={newLivreur.vehicule}
            onChange={(e) =>
              setNewLivreur({ ...newLivreur, vehicule: e.target.value })
            }
            options={[
              { value: "Moto", label: "Moto" },
              { value: "Voiture", label: "Voiture" },
              { value: "Camion", label: "Camion" },
            ]}
            required
          />
          <InputField
            label="Zone"
            value={newLivreur.zone}
            onChange={(e) =>
              setNewLivreur({ ...newLivreur, zone: e.target.value })
            }
            required
          />
          <SelectField
            label="Statut"
            value={newLivreur.statut}
            onChange={(e) =>
              setNewLivreur({ ...newLivreur, statut: e.target.value })
            }
            options={[
              { value: "Disponible", label: "Disponible" },
              { value: "En livraison", label: "En livraison" },
              { value: "Indisponible", label: "Indisponible" },
            ]}
            required
          />
        </div>
      </EditModal>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingLivreur(null);
        }}
        onConfirm={confirmDelete}
        message={`Êtes-vous sûr de vouloir supprimer le livreur "${deletingLivreur?.nom}" ?`}
      />

      {/* Modal Affectation Colis */}
      <AssignModal
        isOpen={showAssignModal}
        onClose={() => {
          setShowAssignModal(false);
          setAssigningLivreur(null);
        }}
        title={`Affecter un colis au livreur "${assigningLivreur?.nom}"`}
        options={colis
          .filter((c) => c.statut === "En attente")
          .map((c) => ({
            value: c.id.toString(),
            label: `${c.tracking} - ${c.nom}`,
          }))}
        onSubmit={confirmAssignColis}
        submitLabel="Affecter"
      />
    </div>
  );
}

export default LivreursList;
