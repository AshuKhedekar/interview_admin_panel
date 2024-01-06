// TransactionRow.js
import React from 'react';
const TransactionRow = ({ transaction, onDelete }) => {
  const handleDelete = () => {
    onDelete(transaction.id);
  };

  return (
    <tr>
      <td>{transaction.id}</td>
      <td>{transaction.date}</td>
      <td>{transaction.branch}</td>
      <td>{transaction.type}</td>
      <td>{transaction.amount}</td>
      <td>{transaction.bank}</td>
      <td>{transaction.requested_by}</td>
      <td colSpan={2}>{transaction.status}
      <button onClick={handleDelete} style={{backgroundColor:"white"}}><img src="delete_icon.png" alt="" width="20" height="20"/></button>
      </td>
    </tr>
  );
};

export default TransactionRow;
