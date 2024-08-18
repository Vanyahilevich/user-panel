import React from "react";
import "./pagination.css";

type UserPaginationProps = {
  limit: number;
  page: number;
  handleLimitChange: (value: string) => void;
  handleNextPage: () => void;
  handlePrevPage: () => void;
};
const UserPagination: React.FC<UserPaginationProps> = React.memo(
  ({ limit, page, handleLimitChange, handleNextPage, handlePrevPage }) => {
    console.log("pagination");
    return (
      <div className="pagination">
        <label htmlFor="perPage">By page:</label>
        <select
          id="perPage"
          value={limit}
          onChange={(e) => handleLimitChange(e.target.value)}
        >
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="12">12</option>
        </select>
        <button onClick={handlePrevPage} disabled={page === 1}>
          prev
        </button>
        <span>
          page: <span>{page}</span>
        </span>
        <button onClick={handleNextPage}>next</button>
      </div>
    );
  }
);

export default UserPagination;
