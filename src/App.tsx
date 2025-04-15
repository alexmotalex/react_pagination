import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState('5');
  const [currentPage, setCurrentPage] = useState(1);
  const parsedPerPage = parseInt(itemsPerPage, 10);
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / parsedPerPage);
  const startIndex = (currentPage - 1) * parsedPerPage;
  const endIndex = Math.min(startIndex + parsedPerPage, totalItems);
  const currentItems = items.slice(startIndex, endIndex);

  function handleItemsPerPage(e: React.ChangeEvent<HTMLSelectElement>): void {
    setItemsPerPage(e.target.value);
    setCurrentPage(1);
  }

  function handleChange(e: React.MouseEvent<HTMLUListElement>): void {
    const target = e.target as HTMLElement;

    if (target.getAttribute('aria-disabled') === 'true') {
      return;
    }

    const dataCy = target.dataset.cy;

    if (dataCy === 'pageLink') {
      const clickedPage = +(target.textContent?.trim() || 0);

      if (clickedPage && clickedPage !== currentPage) {
        setCurrentPage(clickedPage);
      }
    }

    if (dataCy === 'nextLink' && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }

    if (dataCy === 'prevLink' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${endIndex} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleItemsPerPage}
          >
            {['3', '5', '10', '20'].map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={parsedPerPage}
        currentPage={currentPage}
        onPageChange={handleChange}
      />

      <ul>
        {currentItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
