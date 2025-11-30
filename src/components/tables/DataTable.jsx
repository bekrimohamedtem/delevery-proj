import React from "react";
import Pagination from "../ui/Pagination";

function DataTable({
  columns,
  data,
  currentPage = 1,
  itemsPerPage = 6,
  showAll = false,
  onPageChange,
  onShowAll,
  onRowClick,
  actions,
}) {
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = showAll ? data : data.slice(startIndex, endIndex);

  return (
    <div>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full table-auto bg-white">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-sm font-bold text-gray-700 border-b ${
                    column.key === "affectation" || column.key === "actions"
                      ? "text-center"
                      : "text-left"
                  }`}
                >
                  {column.label}
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  Aucune donnée disponible
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr
                  key={row.id || index}
                  className="mb-5 border-b hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-4 py-3 text-sm text-gray-700 ${
                        column.key === "affectation" ? "text-center" : ""
                      }`}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="text-center px-4 py-3">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          showAll={showAll}
          onShowAll={onShowAll}
        />
      )}
    </div>
  );
}

export default DataTable;


