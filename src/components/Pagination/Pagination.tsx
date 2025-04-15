import cn from 'classnames';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (event: React.MouseEvent<HTMLUListElement>) => void;
}

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const renderPageItem = (pageNumber: number) => (
    <li
      key={pageNumber}
      className={cn('page-item', { active: currentPage === pageNumber })}
    >
      <a data-cy="pageLink" className="page-link" href={`#${pageNumber}`}>
        {pageNumber}
      </a>
    </li>
  );

  return (
    <>
      <ul className="pagination" onClick={onPageChange}>
        <li className={cn('page-item', { disabled: isFirstPage })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
          >
            «
          </a>
        </li>
        {Array.from({ length: totalPages }, (_, index) =>
          renderPageItem(index + 1),
        )}
        <li
          className={cn('page-item', {
            disabled: isLastPage,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
