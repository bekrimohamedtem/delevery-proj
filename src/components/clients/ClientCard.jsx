import React from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

function ClientCard({ client, onClick }) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <h3 className="font-semibold mb-2">{client.nom}</h3>
      <p className="text-sm text-gray-600">{client.email}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-500">{client.telephone}</span>
        <Badge variant="info">{client.type}</Badge>
      </div>
    </Card>
  );
}

export default ClientCard;


