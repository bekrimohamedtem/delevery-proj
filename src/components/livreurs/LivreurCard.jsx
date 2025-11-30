import React from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

function LivreurCard({ livreur, onClick }) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <h3 className="font-semibold mb-2">{livreur.nom}</h3>
      <p className="text-sm text-gray-600">{livreur.telephone}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-500">{livreur.vehicule}</span>
        <Badge variant={livreur.statut === "Disponible" ? "success" : "warning"}>
          {livreur.statut}
        </Badge>
      </div>
    </Card>
  );
}

export default LivreurCard;


