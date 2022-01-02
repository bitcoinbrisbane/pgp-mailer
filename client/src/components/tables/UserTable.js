import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Table from "./Table";

const columnConfig = {
  userID: {
    children: "User ID",
    dataFormat: (cell, row) => <Link to={`/user/${row.userID}`}>{cell}</Link>
  },
  fees: {
    children: "Fees",
    dataFormat: cell => Number(cell).toFixed(2),
    width: "7%"
  },
  email: {
    children: "Email"
  },
  firstName: {
    children: "First name",
    width: "10%"
  },
  lastName: {
    children: "Last name",
    width: "10%"
  },
  signUpDate: {
    children: "Sign Up Date",
    dataFormat: cell => cell && moment(cell).format("DD-MM-YYYY"),
    width: "10%"
  },
  randomCent: {
    children: "Random Cent",
    width: "5%"
  }
};

const defaultOptions = {
  sizePerPageList: [20, 30, 50, 75, 100],
  sizePerPage: 50
};

const UserTable = ({
  users,
  selectRow,
  options = {},
  highlightUnverified,
  ...props
}) => {
  const formatRow = row => {
    if (!highlightUnverified) return "";
    return row.idVerificationStatus === 3 ? "" : "table-danger";
  };
  return (
    <Table
      data={users}
      columnConfig={columnConfig}
      selectRow={selectRow}
      keyField="userID"
      options={{ ...defaultOptions, ...options }}
      trClassName={formatRow}
      {...props}
    />
  );
};

export default UserTable;
