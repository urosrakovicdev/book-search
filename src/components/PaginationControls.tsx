import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  isLoading?: boolean
}

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationControlsProps) => {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || isLoading) return
    onPageChange(page)
  }

  if (totalPages <= 1) return null

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            className={
              currentPage === 1 || isLoading
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {/* First page */}
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(1)}
              className={
                isLoading ? "pointer-events-none opacity-50" : "cursor-pointer"
              }
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Dots */}
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Previous page */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(currentPage - 1)}
              className={
                isLoading ? "pointer-events-none opacity-50" : "cursor-pointer"
              }
            >
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Current page */}
        <PaginationItem>
          <PaginationLink isActive={true} className="cursor-default">
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {/* Next page */}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(currentPage + 1)}
              className={
                isLoading ? "pointer-events-none opacity-50" : "cursor-pointer"
              }
            >
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Dots */}
        {currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Last page */}
        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(totalPages)}
              className={
                isLoading ? "pointer-events-none opacity-50" : "cursor-pointer"
              }
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            className={
              currentPage === totalPages || isLoading
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationControls
