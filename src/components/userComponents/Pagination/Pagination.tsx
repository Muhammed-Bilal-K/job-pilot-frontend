import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-8 text-sm gap-3">
        {currentPage > 1 && (
          <li>
            <button
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border-gray-300 rounded-full hover:text-white dark:text-gray-400 hover:bg-blue-500 dark:hover:text-white"
              onClick={() => onPageChange(currentPage - 1)}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
        )}
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white ${
                pageNumber === currentPage
                  ? "border-gray-800 text-gray-800"
                  : "border-gray-300"
              } hover:bg-gray-100 hover:text-gray-700 dark:text-black bg-blue-100 rounded-full dark:hover:bg-blue-500 dark:hover:text-white`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <button
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border-gray-300 rounded-full hover:text-white dark:text-gray-400 hover:bg-blue-500 dark:hover:text-white"
              onClick={() => onPageChange(currentPage + 1)}
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
