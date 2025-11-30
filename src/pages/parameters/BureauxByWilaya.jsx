import React, { useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/tables/DataTable";
import AddModal from "../../components/modals/AddModal";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import usePagination from "../../hooks/usePagination";

function BureauxByWilaya() {
  const [bureaux, setBureaux] = useState([
    {
      id: 1,
      nom: "Bureau Alger Centre",
      wilaya: "Alger",
      adresse: "Rue Didouche Mourad",
      telephone: "023123456",
    },
    {
      id: 2,
      nom: "Bureau Oran Centre",
      wilaya: "Oran",
      adresse: "Boulevard de la Soummam",
      telephone: "041123456",
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBureau, setNewBureau] = useState({
    nom: "",
    wilaya: "",
    adresse: "",
    telephone: "",
  });

  const { currentPage, setCurrentPage, showAll, setShowAll } = usePagination(
    bureaux,
    6
  );

  const handleAdd = (e) => {
    e.preventDefault();
    const newId = Math.max(...bureaux.map((b) => b.id), 0) + 1;
    setBureaux([...bureaux, { ...newBureau, id: newId }]);
    setShowAddModal(false);
    setNewBureau({ nom: "", wilaya: "", adresse: "", telephone: "" });
  };

  const columns = [
    { key: "nom", label: "Nom" },
    { key: "wilaya", label: "Wilaya" },
    { key: "adresse", label: "Adresse" },
    { key: "telephone", label: "Téléphone" },
  ];

  return (
    <div className="font-sans p-6 bg-gray-200/70">
      <div className="bg-white rounded-lg w-[98%] mx-auto p-4">
        <PageHeader
          title="Bureaux par Wilaya"
          count={bureaux.length}
          onAdd={() => setShowAddModal(true)}
        />

        <DataTable
          columns={columns}
          data={bureaux}
          currentPage={currentPage}
          itemsPerPage={6}
          showAll={showAll}
          onPageChange={setCurrentPage}
          onShowAll={setShowAll}
        />
      </div>

      <AddModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setNewBureau({ nom: "", wilaya: "", adresse: "", telephone: "" });
        }}
        title="Ajouter un Bureau"
        onSubmit={handleAdd}
      >
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Nom"
            value={newBureau.nom}
            onChange={(e) => setNewBureau({ ...newBureau, nom: e.target.value })}
            required
          />
          <InputField
            label="Wilaya"
            value={newBureau.wilaya}
            onChange={(e) => setNewBureau({ ...newBureau, wilaya: e.target.value })}
            required
          />
          <InputField
            label="Adresse"
            value={newBureau.adresse}
            onChange={(e) => setNewBureau({ ...newBureau, adresse: e.target.value })}
            required
          />
          <InputField
            label="Téléphone"
            value={newBureau.telephone}
            onChange={(e) =>
              setNewBureau({ ...newBureau, telephone: e.target.value })
            }
            required
          />
        </div>
      </AddModal>
    </div>
  );
}

export default BureauxByWilaya;
