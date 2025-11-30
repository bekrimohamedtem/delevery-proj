import React, { useState } from "react";
import StatsCard from "../../components/statistics/StatsCard";
import Card from "../../components/ui/Card";
import BarChart from "../../components/statistics/BarChart";
import PieChart from "../../components/statistics/PieChart";

function GeneralStats() {
  const [stats] = useState({
    totalColis: 150,
    colisLivres: 120,
    colisEnTransit: 25,
    colisEnAttente: 5,
  });

  const chartData = [
    { name: "Lun", value: 20 },
    { name: "Mar", value: 25 },
    { name: "Mer", value: 30 },
    { name: "Jeu", value: 22 },
    { name: "Ven", value: 28 },
  ];

  const pieData = [
    { name: "Livrés", value: 120 },
    { name: "En transit", value: 25 },
    { name: "En attente", value: 5 },
  ];

  return (
    <div className="font-sans p-6 bg-gray-200/70">
      <div className="w-[98%] mx-auto">
        <h1 className="text-2xl font-bold mb-6">Statistiques Générales</h1>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total Colis"
            value={stats.totalColis}
            icon="📦"
            variant="primary"
          />
          <StatsCard
            title="Livrés"
            value={stats.colisLivres}
            icon="✅"
            variant="success"
          />
          <StatsCard
            title="En Transit"
            value={stats.colisEnTransit}
            icon="🚚"
            variant="info"
          />
          <StatsCard
            title="En Attente"
            value={stats.colisEnAttente}
            icon="⏳"
            variant="warning"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card title="Colis par jour">
            <BarChart data={chartData} />
          </Card>
          <Card title="Répartition des statuts">
            <PieChart data={pieData} />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default GeneralStats;
