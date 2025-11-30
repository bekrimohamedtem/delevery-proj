import React, { useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/tables/DataTable";
import Badge from "../../components/ui/Badge";
import usePagination from "../../hooks/usePagination";

function StockMovements() {
  const [movements] = useState([
    {
      id: 1,
      article: "Carton Standard",
      type: "Entrée",
      quantite: 50,
      date: "2024-01-15",
      utilisateur: "Admin",
    },
    {
      id: 2,
      article: "Ruban Adhésif",
      type: "Sortie",
      quantite: 10,
      date: "2024-01-16",
      utilisateur: "Admin",
    },
  ]);

  const { currentPage, setCurrentPage, showAll, setShowAll } = usePagination(
    movements,
    6
  );

  const columns = [
    { key: "article", label: "Article" },
    {
      key: "type",
      label: "Type",
      render: (value) => (
        <Badge variant={value === "Entrée" ? "success" : "danger"}>
          {value}
        </Badge>
      ),
    },
    { key: "quantite", label: "Quantité" },
    { key: "date", label: "Date" },
    { key: "utilisateur", label: "Utilisateur" },
  ];

  return (
    <div className="font-sans p-6 bg-gray-200/70">
      <div className="bg-white rounded-lg w-[98%] mx-auto p-4">
        <PageHeader title="Mouvements de Stock" count={movements.length} />
        <DataTable
          columns={columns}
          data={movements}
          currentPage={currentPage}
          itemsPerPage={6}
          showAll={showAll}
          onPageChange={setCurrentPage}
          onShowAll={setShowAll}
        />
      </div>
    </div>
  );
}

export default StockMovements;
