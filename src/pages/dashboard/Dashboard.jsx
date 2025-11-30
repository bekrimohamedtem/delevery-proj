import React, { useState } from "react";
import StatsCard from "../../components/statistics/StatsCard";
import Card from "../../components/ui/Card";
import BarChart from "../../components/statistics/BarChart";

function Dashboard() {
  const [stats] = useState({
    totalColis: 150,
    colisLivres: 120,
    livreursActifs: 12,
    clientsTotal: 45,
  });

  const chartData = [
    { name: "Lun", value: 20 },
    { name: "Mar", value: 25 },
    { name: "Mer", value: 30 },
    { name: "Jeu", value: 22 },
    { name: "Ven", value: 28 },
  ];

  return (
    <div className="font-sans p-6 bg-gray-200/70">
      <div className="w-[98%] mx-auto">
        <h1 className="text-2xl font-bold mb-6">Tableau de Bord</h1>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total Colis"
            value={stats.totalColis}
            icon="📦"
            variant="primary"
          />
          <StatsCard
            title="Colis Livrés"
            value={stats.colisLivres}
            icon="✅"
            variant="success"
          />
          <StatsCard
            title="Livreurs Actifs"
            value={stats.livreursActifs}
            icon="🚚"
            variant="info"
          />
          <StatsCard
            title="Total Clients"
            value={stats.clientsTotal}
            icon="👥"
            variant="warning"
          />
        </div>

        <Card title="Colis par jour (semaine)">
          <BarChart data={chartData} />
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;

