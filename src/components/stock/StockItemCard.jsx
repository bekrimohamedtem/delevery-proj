import React from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

function StockItemCard({ item, onClick }) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <h3 className="font-semibold mb-2">{item.nom}</h3>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">
          {item.quantite} {item.unite}
        </span>
        <Badge variant={item.statut === "Disponible" ? "success" : "warning"}>
          {item.statut}
        </Badge>
      </div>
    </Card>
  );
}

export default StockItemCard;


