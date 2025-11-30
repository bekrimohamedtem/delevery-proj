import React, { useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/tables/DataTable";
import AddModal from "../../components/modals/AddModal";
import InputField from "../../components/forms/InputField";
import usePagination from "../../hooks/usePagination";

function ServicesAdditionnels() {
  const [services, setServices] = useState([
    { id: 1, nom: "Assurance", description: "Assurance colis", prix: 100 },
    { id: 2, nom: "Livraison Express", description: "Livraison en 24h", prix: 200 },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newService, setNewService] = useState({ nom: "", description: "", prix: "" });

  const { currentPage, setCurrentPage, showAll, setShowAll } = usePagination(services, 6);

  const handleAdd = (e) => {
    e.preventDefault();
    const newId = Math.max(...services.map((s) => s.id), 0) + 1;
    setServices([...services, { ...newService, id: newId, prix: parseFloat(newService.prix) }]);
    setShowAddModal(false);
    setNewService({ nom: "", description: "", prix: "" });
  };

  const columns = [
    { key: "nom", label: "Nom" },
    { key: "description", label: "Description" },
    { key: "prix", label: "Prix (DZD)", render: (value) => `${value} DZD` },
  ];

  return (
    <div className="font-sans p-6 bg-gray-200/70">
      <div className="bg-white rounded-lg w-[98%] mx-auto p-4">
        <PageHeader title="Services Additionnels" count={services.length} onAdd={() => setShowAddModal(true)} />
        <DataTable columns={columns} data={services} currentPage={currentPage} itemsPerPage={6} showAll={showAll} onPageChange={setCurrentPage} onShowAll={setShowAll} />
      </div>
      <AddModal isOpen={showAddModal} onClose={() => { setShowAddModal(false); setNewService({ nom: "", description: "", prix: "" }); }} title="Ajouter un Service" onSubmit={handleAdd}>
        <div className="space-y-4">
          <InputField label="Nom" value={newService.nom} onChange={(e) => setNewService({ ...newService, nom: e.target.value })} required />
          <InputField label="Description" value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} required />
          <InputField label="Prix" type="number" value={newService.prix} onChange={(e) => setNewService({ ...newService, prix: e.target.value })} required />
        </div>
      </AddModal>
    </div>
  );
}

export default ServicesAdditionnels;
