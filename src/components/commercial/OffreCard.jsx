import React from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

function OffreCard({ offre, onClick }) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{offre.nom}</h3>
        <Badge variant={offre.statut === "Active" ? "success" : "default"}>
          {offre.statut}
        </Badge>
      </div>
      <p className="text-sm text-gray-600 mb-2">{offre.description}</p>
      <p className="text-lg font-bold text-blue-600">{offre.prix} DZD</p>
    </Card>
  );
}

export default OffreCard;


