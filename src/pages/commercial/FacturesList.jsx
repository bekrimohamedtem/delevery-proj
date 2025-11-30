import React, { useState, useCallback, useEffect } from "react";
import { useSearch } from "../../context/SearchContext";
import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/tables/DataTable";
import Badge from "../../components/ui/Badge";
import usePagination from "../../hooks/usePagination";

function FacturesList() {
  const { searchTerm } = useSearch();
  const [factures, setFactures] = useState([
    {
      id: 1,
      numero: "FAC001",
      client: "Entreprise ABC",
      montant: 15000,
      date: "2024-01-15",
      statut: "Payée",
    },
    {
      id: 2,
      numero: "FAC002",
      client: "Société XYZ",
      montant: 12000,
      date: "2024-01-16",
      statut: "En attente",
    },
  ]);
  const [filteredFactures, setFilteredFactures] = useState([]);

  const { currentPage, setCurrentPage, showAll, setShowAll } = usePagination(
    filteredFactures,
    6
  );

  useEffect(() => {
    setFilteredFactures(factures);
  }, [factures]);

  const applyFilter = useCallback(
    (term) => {
      let filtered = factures;
      if (term.trim()) {
        const normalized = term.trim().toLowerCase();
        filtered = filtered.filter((f) =>
          [f.numero, f.client, f.statut].some((field) =>
            field?.toLowerCase().includes(normalized)
          )
        );
      }
      setFilteredFactures(filtered);
    },
    [factures]
  );

  useEffect(() => {
    applyFilter(searchTerm);
  }, [searchTerm, applyFilter]);

  const columns = [
    { key: "numero", label: "Numéro" },
    { key: "client", label: "Client" },
    {
      key: "montant",
      label: "Montant",
      render: (value) => `${value.toLocaleString()} DZD`,
    },
    { key: "date", label: "Date" },
    {
      key: "statut",
      label: "Statut",
      render: (value) => (
        <Badge variant={value === "Payée" ? "success" : "warning"}>
          {value}
        </Badge>
      ),
    },
  ];

  return (
    <div className="font-sans p-6 bg-gray-200/70">
      <div className="bg-white rounded-lg w-[98%] mx-auto p-4">
        <PageHeader title="Liste des Factures" count={filteredFactures.length} />
        <DataTable
          columns={columns}
          data={filteredFactures}
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

export default FacturesList;
