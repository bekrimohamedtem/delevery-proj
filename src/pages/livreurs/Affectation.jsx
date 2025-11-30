import React, { useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import Card from "../../components/ui/Card";
import SelectField from "../../components/forms/SelectField";
import Button from "../../components/ui/Button";
import DataTable from "../../components/tables/DataTable";
import Badge from "../../components/ui/Badge";

function Affectation() {
  const [livreurs] = useState([
    { id: 1, nom: "Ahmed Benali", statut: "Disponible" },
    { id: 2, nom: "Mohamed Kaddour", statut: "En livraison" },
  ]);
  const [colis] = useState([
    { id: 1, tracking: "TRK001", destinataire: "Mohamed Benali", statut: "En attente" },
    { id: 2, tracking: "TRK002", destinataire: "Karim Bensaid", statut: "En attente" },
  ]);
  const [affectations, setAffectations] = useState([]);
  const [selectedLivreur, setSelectedLivreur] = useState("");
  const [selectedColis, setSelectedColis] = useState("");

  const handleAffecter = () => {
    if (selectedLivreur && selectedColis) {
      const livreur = livreurs.find((l) => l.id === parseInt(selectedLivreur));
      const colisItem = colis.find((c) => c.id === parseInt(selectedColis));
      setAffectations([
        ...affectations,
        {
          id: affectations.length + 1,
          livreur: livreur.nom,
          colis: colisItem.tracking,
          date: new Date().toLocaleDateString(),
        },
      ]);
      setSelectedLivreur("");
      setSelectedColis("");
    }
  };

  const columns = [
    { key: "livreur", label: "Livreur" },
    { key: "colis", label: "Colis" },
    { key: "date", label: "Date" },
  ];

  return (
    <div className="font-sans p-6 bg-gray-200/70">
      <div className="bg-white rounded-lg w-[98%] mx-auto p-4">
        <PageHeader title="Affectation Colis-Livreurs" />

        <Card title="Nouvelle affectation" className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            <SelectField
              label="Livreur"
              value={selectedLivreur}
              onChange={(e) => setSelectedLivreur(e.target.value)}
              options={livreurs.map((l) => ({
                value: l.id.toString(),
                label: `${l.nom} - ${l.statut}`,
              }))}
            />
            <SelectField
              label="Colis"
              value={selectedColis}
              onChange={(e) => setSelectedColis(e.target.value)}
              options={colis
                .filter((c) => c.statut === "En attente")
                .map((c) => ({
                  value: c.id.toString(),
                  label: `${c.tracking} - ${c.destinataire}`,
                }))}
            />
          </div>
          <Button onClick={handleAffecter} className="mt-4">
            Affecter
          </Button>
        </Card>

        <DataTable columns={columns} data={affectations} />
      </div>
    </div>
  );
}

export default Affectation;
