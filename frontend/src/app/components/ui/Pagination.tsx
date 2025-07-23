import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    showFirstLast?: boolean;
    showPrevNext?: boolean;
    maxVisiblePages?: number;
    className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    showFirstLast = true,
    showPrevNext = true,
    maxVisiblePages = 5,
    className = ''
}) => {
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
        const pages: (number | string)[] = [];
        const halfVisible = Math.floor(maxVisiblePages / 2);

        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(totalPages, currentPage + halfVisible);

        // Adjust if we're near the beginning or end
        if (endPage - startPage + 1 < maxVisiblePages) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            } else {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
        }

        // Add first page and ellipsis if needed
        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) {
                pages.push('...');
            }
        }

        // Add visible pages
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Add ellipsis and last page if needed
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push('...');
            }
            pages.push(totalPages);
        }

        return pages;
    };

    const handlePageClick = (page: number | string) => {
        if (typeof page === 'number' && page !== currentPage) {
            onPageChange(page);
        }
    };

    const visiblePages = getVisiblePages();

    return (
        <nav className={`pagination ${className}`} role="navigation" aria-label="Pagination">
            {/* First Page */}
            {showFirstLast && currentPage > 1 && (
                <button
                    className="pagination-item"
                    onClick={() => handlePageClick(1)}
                    aria-label="Go to first page"
                >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                </button>
            )}

            {/* Previous Page */}
            {showPrevNext && (
                <button
                    className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => handlePageClick(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Go to previous page"
                >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            )}

            {/* Page Numbers */}
            {visiblePages.map((page, index) => (
                <React.Fragment key={index}>
                    {page === '...' ? (
                        <span className="pagination-ellipsis">...</span>
                    ) : (
                        <button
                            className={`pagination-item ${page === currentPage ? 'active' : ''}`}
                            onClick={() => handlePageClick(page)}
                            aria-label={`Go to page ${page}`}
                            aria-current={page === currentPage ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    )}
                </React.Fragment>
            ))}

            {/* Next Page */}
            {showPrevNext && (
                <button
                    className={`pagination-item ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={() => handlePageClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Go to next page"
                >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            )}

            {/* Last Page */}
            {showFirstLast && currentPage < totalPages && (
                <button
                    className="pagination-item"
                    onClick={() => handlePageClick(totalPages)}
                    aria-label="Go to last page"
                >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                </button>
            )}
        </nav>
    );
};

export default Pagination;