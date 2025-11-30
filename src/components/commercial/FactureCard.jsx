import React from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

function FactureCard({ facture, onClick }) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{facture.numero}</h3>
        <Badge variant={facture.statut === "Payée" ? "success" : "warning"}>
          {facture.statut}
        </Badge>
      </div>
      <p className="text-sm text-gray-600">{facture.client}</p>
      <p className="text-lg font-bold text-blue-600 mt-2">
        {facture.montant.toLocaleString()} DZD
      </p>
    </Card>
  );
}

export default FactureCard;


