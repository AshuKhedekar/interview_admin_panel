import React, { useState } from "react";
const TransactionFilterForm = ({ onFilterChange }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleFilterChange = () => {
    if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
      alert("To date cannot be less than from date.");
      return;
    }

    const formattedFromDate = convertDateFormat2(fromDate);

    function convertDateFormat2(inputDate) {
      const [year, month, day] = inputDate.split("-");
      const formattedDate = `${day}/${month}/${year}`;

      return formattedDate;
    }
    onFilterChange({
      fromDate: formattedFromDate,
      toDate: formattedFromDate,
      branchFilter,
      typeFilter,
      statusFilter,
    });
  };

  return (
    <div className="container">
      <div className="div1">
        <label className="align">From</label>
        <br></br>
        <input
          className="border"
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>
      <br></br>
      <div className="div2">
        <label className="align1">To</label>
        <br></br>
        <input
          className="border"
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>
      <br></br>
      <div className="div3">
        <label className="align2">Branch</label>
        <br></br>
        <select
          className="border"
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Thane">Thane</option>
          <option value="NaviMumbai">Navi Mumbai</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Kurla">Kurla</option>
          <option value="VileParle">Vile Parle</option>
          <option value="LowerParel">Lower Parel</option>
          <option value="Andheri">Andheri</option>
          <option value="Byculla">Byculla </option>
        </select>
      </div>
      <br></br>
      <div className="div4">
        <label className="align3">Type</label>
        <br></br>
        <select
          className="border"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Full">Full</option>
          <option value="Short">Short</option>
        </select>
      </div>
      <br></br>
      <div className="div5">
        <label className="align4">Status</label>
        <br></br>
        <select
          className="border"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <br></br>
      <div className="div6">
        <button className="btn" onClick={handleFilterChange}>
          Search ID
        </button>
      </div>
    </div>
  );
};

export default TransactionFilterForm;
