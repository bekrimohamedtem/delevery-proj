import React, { useState } from "react";
import InputField from "../../components/forms/InputField";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import TrackingTimeline from "../../components/tracking/TrackingTimeline";
import TrackingStatusBadge from "../../components/tracking/TrackingStatusBadge";

function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);

  const handleTrack = () => {
    // TODO: Utiliser trackingService quand l'API sera prête
    if (trackingNumber) {
      setTrackingData({
        tracking: trackingNumber,
        statut: "En transit",
        historique: [
          { date: "2024-01-15 10:00", evenement: "Colis créé", lieu: "Alger" },
          { date: "2024-01-15 14:30", evenement: "En transit", lieu: "Alger" },
          { date: "2024-01-16 09:00", evenement: "Arrivé au centre", lieu: "Oran" },
        ],
      });
    }
  };

  return (
    <div className="font-sans p-6 bg-gray-200/70">
      <div className="bg-white rounded-lg w-[98%] mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Suivi de Colis</h1>

        <Card className="mb-6">
          <div className="flex gap-4">
            <InputField
              placeholder="Numéro de tracking"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTrack}>Rechercher</Button>
          </div>
        </Card>

        {trackingData && (
          <Card>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Tracking: {trackingData.tracking}</h3>
              <TrackingStatusBadge statut={trackingData.statut} />
            </div>
            <TrackingTimeline historique={trackingData.historique} />
          </Card>
        )}
      </div>
    </div>
  );
}

export default TrackingPage;
