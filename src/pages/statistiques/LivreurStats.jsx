import React, { useState } from "react";
import Card from "../../components/ui/Card";
import DataTable from "../../components/tables/DataTable";
import Badge from "../../components/ui/Badge";

function LivreurStats() {
  const [livreurStats] = useState([
    {
      id: 1,
      nom: "Ahmed Benali",
      totalLivraisons: 45,
      reussies: 42,
      echecs: 3,
      tauxReussite: "93%",
    },
    {
      id: 2,
      nom: "Mohamed Kaddour",
      totalLivraisons: 38,
      reussies: 36,
      echecs: 2,
      tauxReussite: "95%",
    },
  ]);

  const columns = [
    { key: "nom", label: "Livreur" },
    { key: "totalLivraisons", label: "Total" },
    { key: "reussies", label: "Réussies" },
    { key: "echecs", label: "Échecs" },
    {
      key: "tauxReussite",
      label: "Taux de réussite",
      render: (value) => <Badge variant="success">{value}</Badge>,
    },
  ];

  return (
    <div className="font-sans p-6 bg-gray-200/70">
      <div className="bg-white rounded-lg w-[98%] mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Statistiques des Livreurs</h1>
        <DataTable columns={columns} data={livreurStats} />
      </div>
    </div>
  );
}

export default LivreurStats;
