import styles from './Paginate.module.scss'
import React from "react";
import ReactPaginate from "react-paginate";
interface PaginatedAlbumsProps {
  totalItems: number
  itemsPerPage: number
  onPageChange: (item:number) => void
}

export const Paginate:React.FC<PaginatedAlbumsProps> = ({ totalItems, itemsPerPage, onPageChange }) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3} 
      onPageChange={(data) => onPageChange(data.selected + 1)}
      containerClassName={styles.paginate}
      activeClassName={styles.active}
      pageClassName={styles.page_item}
      pageLinkClassName={styles.page_link}
      previousClassName={styles.page_item}
      previousLinkClassName={styles.page_link}
      nextClassName={styles.page_item}
      nextLinkClassName={styles.page_link}
      breakClassName={styles.page_item}
      breakLinkClassName={styles.page_link}
    />
  );
};
