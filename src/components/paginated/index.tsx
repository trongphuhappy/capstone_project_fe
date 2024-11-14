import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginatedComponentProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginatedComponent: React.FC<PaginatedComponentProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return; // Prevent out-of-bounds page numbers
    onPageChange(page); // Call the passed function to change the page
  };

  // Calculate the range of pages to display
  const getPageRange = () => {
    const pages = new Set<number>();
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      if (i <= totalPages) {
        pages.add(i);
      }
    }

    // Handle edge cases for the first few and last few pages
    if (pages.size < 3) {
      if (totalPages > 3) {
        if (currentPage === 1) {
          pages.add(2);
          pages.add(3);
        } else if (currentPage === totalPages) {
          pages.add(totalPages - 2);
          pages.add(totalPages - 1);
        } else if (currentPage === 2) {
          pages.add(3);
        } else if (currentPage === totalPages - 1) {
          pages.add(totalPages - 2);
        }
      } else {
        for (let i = currentPage; i <= totalPages; i++) {
          pages.add(i);
        }
      }
    }

    // Convert Set to Array and remove duplicates (if any)
    return Array.from(pages).sort((a, b) => a - b);
  };

  const pagesToShow = getPageRange();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer select-none"
            onClick={() => handlePageChange(currentPage - 1)}
            // disabled={currentPage === 1}
          >
            <span className="hidden sm:block">Previous</span>
          </PaginationPrevious>
        </PaginationItem>

        {pagesToShow.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              // href="#"
              onClick={() => handlePageChange(page)}
              className={`${
                currentPage === page
                  ? "bg-blue-500 text-white hover:!bg-blue-600 hover:!text-white"
                  : ""
              } cursor-pointer`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > 3 && (
          <>
            {currentPage + 2 <= totalPages && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationLink
                  className="cursor-pointer select-none"
                  onClick={() => handlePageChange(totalPages)}
                >
                  {totalPages}
                </PaginationLink>
              </>
            )}
          </>
        )}

        <PaginationItem>
          <PaginationNext
            className="cursor-pointer select-none"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <span className="hidden sm:block">Next</span>
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginatedComponent;
