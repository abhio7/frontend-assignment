// import React from "react";

// const Pagination = ({ totalItems, paginate, currentPage, itemsPerPage }) => {
//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="pagination">
//       {pageNumbers.map((number) => (
//         <button
//           key={number}
//           onClick={() => paginate(number)}
//           className={number === currentPage ? "active" : ""}
//         >
//           {number}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Pagination;
import React from "react";

const Pagination = ({ totalItems, paginate, currentPage, itemsPerPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate range of pages to show in pagination (e.g., 3 pages before and after the current page)
  const maxPageNumbersToShow = 5;  // Total number of page numbers to show at a time
  const half = Math.floor(maxPageNumbersToShow / 2);
  let start = Math.max(currentPage - half, 1);
  let end = Math.min(currentPage + half, totalPages);

  // Adjust the range if there's not enough space on either side
  if (currentPage - half < 1) {
    end = Math.min(totalPages, maxPageNumbersToShow);
  } else if (currentPage + half > totalPages) {
    start = Math.max(1, totalPages - maxPageNumbersToShow + 1);
  }

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-arrow"
      >
        &lt;
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={number === currentPage ? "active" : ""}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-arrow"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
