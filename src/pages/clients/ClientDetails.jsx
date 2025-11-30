import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

function ClientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);

  useEffect(() => {
    // TODO: Utiliser clientsService.getById quand l'API sera prête
    setClient({
      id: parseInt(id),
      nom: "Entreprise ABC",
      email: "contact@abc.dz",
      telephone: "023123456",
      adresse: "Alger, Alger",
      type: "Entreprise",
      dateCreation: "2024-01-01",
    });
  }, [id]);

  if (!client) return <div>Chargement...</div>;

  return (
    <div className="font-sans p-6 bg-gray-200/70">
      <div className="bg-white rounded-lg w-[98%] mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Détails du Client</h1>
          <Button variant="outline" onClick={() => navigate("/clients")}>
            Retour
          </Button>
        </div>

        <Card title="Informations">
          <div className="space-y-3">
            <div>
              <span className="font-semibold">Nom:</span> {client.nom}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {client.email}
            </div>
            <div>
              <span className="font-semibold">Téléphone:</span> {client.telephone}
            </div>
            <div>
              <span className="font-semibold">Adresse:</span> {client.adresse}
            </div>
            <div>
              <span className="font-semibold">Type:</span>{" "}
              <Badge variant="info">{client.type}</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ClientDetails;
