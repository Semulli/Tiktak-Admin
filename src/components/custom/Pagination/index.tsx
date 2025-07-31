import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="mt-6 flex justify-center items-center gap-3 select-none">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-2xl text-black disabled:opacity-20"
      >
        &#x2039;
      </button>

      {/* Page display */}
      <div className="px-4 py-1 bg-gray-100 rounded-full text-sm font-medium text-black flex items-center gap-1">
        <span className="text-green-500">{formatNumber(currentPage)}</span>
        <span className="text-gray-500">/ {formatNumber(totalPages)}</span>
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-2xl text-black disabled:opacity-20"
      >
        &#x203A;
      </button>
    </div>
  );
};

export default Pagination;
