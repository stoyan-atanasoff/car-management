import React from 'react'
import { Skeleton } from '@radix-ui/themes'

interface TablePaginationProps {
  count: number;
  total: number;
  loading: boolean;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export const TablePagination = ({ count, total, loading, page, pageSize, onPageChange, onPageSizeChange }: TablePaginationProps) => {

  const totalPages = count === 0 ? 0 : Math.ceil(count / pageSize);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageLinks = 2; // Pages to show around the current page

    // Always show the first page
    pageNumbers.push(1);

    // Show ellipsis if there’s a gap between the first page and the current range
    if (page > maxPageLinks + 2) {
      pageNumbers.push('...');
    }

    // Pages around the current page
    for (let i = Math.max(2, page - maxPageLinks); i <= Math.min(totalPages - 1, page + maxPageLinks); i++) {
      pageNumbers.push(i);
    }

    // Show ellipsis if there’s a gap between the end of the current range and the last page
    if (page < totalPages - maxPageLinks - 1) {
      pageNumbers.push('...');
    }

    // Always show the last page if it's more than one page away from the current range
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-between mt-4 flex-col sm:flex-row">
      {loading ? (
        <Skeleton className="h-4 w-36" />
      ) : (
        <div className="text-gray-600 text-sm mb-4 sm:mb-0">
          Results:&nbsp;
          {count !== total && (
            <>
              <span className={`${count === 0 ? 'text-red-500' : ''}`}>
                {count}
              </span>
              /
            </>
          )}
          {total}
        </div>
      )}
      {loading ? (
        // Skeleton Loader
        <div className="flex flex-row space-x-1">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-5" />
          <Skeleton className="h-4 w-5" />
          <Skeleton className="h-4 w-5" />
          <Skeleton className="h-4 w-10" />
        </div>
      ) : (
        <div className="flex items-center space-x-1 flex-col sm:flex-row gap-4">
          <div className='flex items-center space-x-1'>
            <label className="text-gray-600 text-sm mr-1">Page Size:</label>
            <select
              value={pageSize}
              onChange={({ target }) => onPageSizeChange(Number(target.value))}
              className="p-0.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className='flex items-center space-x-1 mb-10 sm:mb-0'>
            {/* Previous Button */}
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className={`px-2 py-0.5 rounded-md text-sm ${
                page === 1
                  ? 'bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-[var(--accent-10)] hover:bg-[var(--accent-8)] text-[var(--accent-contrast)] hover:text-[var(--accent-contrast)]'
              }`}
            >
              Previous
            </button>
            {/*bg-[var(--accent-10)] hover:bg-[var(--accent-8)] text-[var(--accent-contrast)] hover:text-[var(--accent-contrast)]*/}
            {/* Page Numbers */}
            {getPageNumbers().map((pageNumber, index) =>
              pageNumber === '...' ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 py-0.5 text-sm text-gray-500"
                >...</span>
              ) : (
                <button
                  key={pageNumber}
                  onClick={() => onPageChange(Number(pageNumber))}
                  disabled={pageNumber === page}
                  className={`px-2 py-0.5 rounded-md text-sm ${
                    pageNumber === page
                      ? 'bg-[var(--accent-10)] hover:bg-[var(--accent-8)] text-[var(--accent-contrast)] hover:text-[var(--accent-contrast)] font-bold cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-200 hover:text-gray-700 dark:bg-inherit dark:hover:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}

            {/* Next Button */}
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
              className={`px-2 py-0.5 rounded-md text-sm ${
                page === totalPages
                  ? 'bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-[var(--accent-10)] hover:bg-[var(--accent-8)] text-[var(--accent-contrast)] hover:text-[var(--accent-contrast)]'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}