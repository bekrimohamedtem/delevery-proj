import React, { useState } from "react";
import Card from "../../components/ui/Card";
import DataTable from "../../components/tables/DataTable";
import BarChart from "../../components/statistics/BarChart";

function ClientStats() {
  const [clientStats] = useState([
    {
      id: 1,
      nom: "Entreprise ABC",
      totalCommandes: 120,
      montantTotal: 150000,
    },
    {
      id: 2,
      nom: "Société XYZ",
      totalCommandes: 85,
      montantTotal: 95000,
    },
  ]);

  const chartData = clientStats.map((c) => ({
    name: c.nom,
    value: c.totalCommandes,
  }));

  const columns = [
    { key: "nom", label: "Client" },
    { key: "totalCommandes", label: "Total Commandes" },
    {
      key: "montantTotal",
      label: "Montant Total",
      render: (value) => `${value.toLocaleString()} DZD`,
    },
  ];

  return (
    <div className="font-sans p-6 bg-gray-200/70">
      <div className="w-[98%] mx-auto">
        <h1 className="text-2xl font-bold mb-6">Statistiques des Clients</h1>
        <div className="grid grid-cols-2 gap-6">
          <Card title="Top Clients">
            <DataTable columns={columns} data={clientStats} />
          </Card>
          <Card title="Commandes par Client">
            <BarChart data={chartData} />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ClientStats;
