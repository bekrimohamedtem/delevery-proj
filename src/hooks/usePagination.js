import { useState, useEffect } from "react";

function usePagination(data = [], itemsPerPage = 6) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = showAll ? data : data.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
    paginatedData,
    showAll,
    setShowAll,
  };
}

export default usePagination;


