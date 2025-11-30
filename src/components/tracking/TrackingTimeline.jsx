import React from "react";

function TrackingTimeline({ historique = [] }) {
  return (
    <div className="space-y-4">
      {historique.map((item, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            {index < historique.length - 1 && (
              <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
            )}
          </div>
          <div className="flex-1 pb-4">
            <p className="font-semibold">{item.evenement}</p>
            <p className="text-sm text-gray-600">{item.lieu}</p>
            <p className="text-xs text-gray-500">{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrackingTimeline;
