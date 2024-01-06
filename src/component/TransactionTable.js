import React from "react";
import TransactionRow from "./TransactionRow";
import "./TransactionTable.css";
const TransactionTable = ({
  sortColumn,
  transactions,
  onDelete,
  onSort,
  sortOrder,
}) => {
  const handleSort = (column) => {
    onSort(column); // Trigger the sorting in the parent component
  };

  const renderSortIcon = (column) => {
    if (sortColumn === column) {
      return sortOrder === "asc" ? " \u25B2" : " \u25BC";
    }
    return null;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th onClick={() => handleSort("date")}>
            Date {sortColumn === "date" && renderSortIcon("date")}
          </th>
          <th>BRANCH</th>
          <th>TYPE</th>
          <th>
            AMOUNT <br></br>(IN RUPEES)
          </th>
          <th>BANK</th>
          <th>
            REQUESTED BY <br></br>(EMPLOYEE CODE)
          </th>
          <th>STATUS</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <TransactionRow
            key={transaction.id}
            transaction={transaction}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
