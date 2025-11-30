import React from "react";
import Badge from "../ui/Badge";

function TrackingStatusBadge({ statut }) {
  const getVariant = (statut) => {
    if (statut === "Livré") return "success";
    if (statut === "En transit") return "info";
    if (statut === "En attente") return "warning";
    return "danger";
  };

  return <Badge variant={getVariant(statut)}>{statut}</Badge>;
}

export default TrackingStatusBadge;

