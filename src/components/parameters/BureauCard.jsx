import React from "react";
import Card from "../ui/Card";

function BureauCard({ bureau, onClick }) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <h3 className="font-semibold mb-2">{bureau.nom}</h3>
      <p className="text-sm text-gray-600">{bureau.wilaya}</p>
      <p className="text-xs text-gray-500 mt-2">{bureau.adresse}</p>
      <p className="text-xs text-gray-500">{bureau.telephone}</p>
    </Card>
  );
}

export default BureauCard;


