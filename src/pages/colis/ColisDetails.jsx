import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

function ColisDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [colis, setColis] = useState(null);

  useEffect(() => {
    // TODO: Utiliser colisService.getById quand l'API sera prête
    // Pour le moment, données mockées
    setColis({
      id: parseInt(id),
      tracking: "TRK001",
      nom: "Colis Express",
      expediteur: "Ali Ahmed",
      destinataire: "Mohamed Benali",
      adresse: "Alger, Alger",
      statut: "En transit",
      dateCreation: "2024-01-15",
      dateLivraison: null,
    });
  }, [id]);

  if (!colis) return <div>Chargement...</div>;

  return (
    <div className="font-sans p-6 bg-gray-200/70">
      <div className="bg-white rounded-lg w-[98%] mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Détails du Colis</h1>
          <Button variant="outline" onClick={() => navigate("/colis")}>
            Retour
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card title="Informations générales">
            <div className="space-y-3">
              <div>
                <span className="font-semibold">Tracking:</span> {colis.tracking}
              </div>
              <div>
                <span className="font-semibold">Nom:</span> {colis.nom}
              </div>
              <div>
                <span className="font-semibold">Statut:</span>{" "}
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
            </div>
          </Card>

          <Card title="Expédition">
            <div className="space-y-3">
              <div>
                <span className="font-semibold">Expéditeur:</span> {colis.expediteur}
              </div>
              <div>
                <span className="font-semibold">Destinataire:</span> {colis.destinataire}
              </div>
              <div>
                <span className="font-semibold">Adresse:</span> {colis.adresse}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ColisDetails;
