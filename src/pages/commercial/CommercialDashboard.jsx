import React, { useState } from "react";
import StatsCard from "../../components/statistics/StatsCard";
import Card from "../../components/ui/Card";

function CommercialDashboard() {
  const [stats] = useState({
    totalOffres: 25,
    offresActives: 18,
    totalFactures: 150,
    montantTotal: 2500000,
  });

  return (
    <div className="font-sans p-6 bg-gray-200/70">
      <div className="w-[98%] mx-auto">
        <h1 className="text-2xl font-bold mb-6">Tableau de Bord Commercial</h1>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total Offres"
            value={stats.totalOffres}
            icon="📋"
            variant="primary"
          />
          <StatsCard
            title="Offres Actives"
            value={stats.offresActives}
            icon="✅"
            variant="success"
          />
          <StatsCard
            title="Total Factures"
            value={stats.totalFactures}
            icon="🧾"
            variant="info"
          />
          <StatsCard
            title="Montant Total"
            value={`${stats.montantTotal.toLocaleString()} DZD`}
            icon="💰"
            variant="warning"
          />
        </div>
      </div>
    </div>
  );
}

export default CommercialDashboard;
