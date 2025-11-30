import React from "react";

function BarChart({ data = [] }) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="h-64 flex items-end justify-between gap-2">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div className="w-full bg-gray-200 rounded-t relative h-48">
            <div
              className="absolute bottom-0 w-full bg-blue-600 rounded-t transition-all"
              style={{ height: `${(item.value / maxValue) * 100}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-600 mt-2">{item.name}</span>
        </div>
      ))}
    </div>
  );
}

export default BarChart;
