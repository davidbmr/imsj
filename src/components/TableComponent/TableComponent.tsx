import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './TableComponent.module.css';

interface Column {
  campo: string;
  label: string;
}

interface TableComponentProps {
  columns: Column[];
  data: { [key: string]: any }[];
  renderButton?: (row: { [key: string]: any }) => React.ReactNode;
  itemsPerPage?: number;
}

const TableComponent: React.FC<TableComponentProps> = ({ columns, data, renderButton, itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = data.slice(offset, offset + itemsPerPage);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.label}</th>
            ))}
            {renderButton && <th></th>}
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{row[column.campo]}</td>
              ))}
              {renderButton && <td>{renderButton(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'Anterior'}
        nextLabel={'Siguiente'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(data.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
      />
    </div>
  );
};

export default TableComponent;
