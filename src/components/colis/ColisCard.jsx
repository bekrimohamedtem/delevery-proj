import React from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

function ColisCard({ colis, onClick }) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{colis.tracking}</h3>
        <Badge
          variant={
            colis.statut === "Livré"
              ? "success"
              : colis.statut === "En transit"
              ? "info"
              : "warning"
          }
        >
          {colis.statut}
        </Badge>
      </div>
      <p className="text-sm text-gray-600">{colis.nom}</p>
      <p className="text-xs text-gray-500 mt-2">
        {colis.expediteur} → {colis.destinataire}
      </p>
    </Card>
  );
}

export default ColisCard;


