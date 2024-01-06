import React, { useState, useEffect } from "react";
import TransactionTable from "./component/TransactionTable";
import TransactionFilterForm from "./component/TransactionFilterForm";
import "./App.css";
import { transactionDetails } from "./component/transaction";
const App = () => {
  const [sortColumn, setSortColumn] = useState("date");
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTransactions(transactionDetails);
      setFilteredTransactions(transactionDetails);
    };
    fetchData();
  }, []);

  const handleFilterChange = ({
    fromDate,
    toDate,
    branchFilter,
    typeFilter,
    statusFilter,
  }) => {
    const filtered = transactions.filter((transaction) => {
      console.log(
        "original",
        transaction.date,
        transaction.branch,
        transaction.type,
        transaction.status
      );
      console.log(
        "user",
        fromDate,
        toDate,
        branchFilter,
        typeFilter,
        statusFilter
      );
      const isBranchMatch =
        !branchFilter || transaction.branch === branchFilter;
      const isTypeMatch = !typeFilter || transaction.type === typeFilter;
      const isStatusMatch =
        !statusFilter || transaction.status === statusFilter;

      const isDateRangeMatch =
        (!fromDate || new Date(transaction.date) >= new Date(fromDate)) &&
        (!toDate || new Date(transaction.date) <= new Date(toDate));
      console.log(
        "as",
        isBranchMatch,
        isTypeMatch,
        isStatusMatch,
        isDateRangeMatch
      );
      return isBranchMatch && isTypeMatch && isStatusMatch && isDateRangeMatch;
    });

    const sortedTransactions = [...filtered].sort((a, b) => {
      const dateA = new Date(convertDateFormat(a.date));
      const dateB = new Date(convertDateFormat(b.date));

      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setTransactions([...sortedTransactions]);
    return sortedTransactions.map((transaction) => transaction);
  };

  useEffect(() => {
    console.log("filteredTransactions", filteredTransactions);
  }, [filteredTransactions]);

  const handleDelete = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    console.log(updatedTransactions);
    setTransactions(updatedTransactions);
    setFilteredTransactions(
      filteredTransactions.filter((transaction) => transaction.id !== id)
    );
  };

  const handleSort = (column) => {
    console.log("Sorting by column:", column);
    setSortOrder((prevOrder) =>
      column === sortColumn ? (prevOrder === "asc" ? "desc" : "asc") : "asc"
    );
    setSortColumn(column);

    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
      const valueA =
        column === "date" ? new Date(convertDateFormat(a[column])) : a[column];
      const valueB =
        column === "date" ? new Date(convertDateFormat(b[column])) : b[column];
      console.log("valueA", valueA);
      console.log("valueB", valueB);
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });

    console.log("Sorted Transactions:", sortedTransactions);

    // setFilteredTransactions([...sortedTransactions]);
    setTransactions([...sortedTransactions]);
  };

  const convertDateFormat = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="App">
      <h1>Admin Panel</h1>

      <TransactionFilterForm onFilterChange={handleFilterChange} />
      <TransactionTable
        sortColumn={sortColumn}
        transactions={transactions}
        onDelete={handleDelete}
        onSort={handleSort}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default App;
