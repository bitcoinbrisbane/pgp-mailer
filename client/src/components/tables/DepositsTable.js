import React from "react";
import moment from "moment";
import { format as format$ } from "currency-formatter";
import Table from "./Table";
import prefixID from "../../utils/prefixID";

// dataField (key) props (value)
const columnConfig = {
  id: {
    children: "ID",
    dataFormat: cell => prefixID(cell, "D"),
    width: "8%"
  },
  userID: {
    children: "UserID",
    width: "20%"
  },
  amount: {
    children: "Amount",
    dataFormat: cell => format$(cell, { code: "AUD" }),
    width: "8%"
  },
  reference: {
    children: "Reference",
    width: "30%",
    tdStyle: { whiteSpace: "normal" }
  },
  fee: {
    children: "Fee",
    dataFormat: cell => format$(cell, { code: "AUD" })
  },
  bank: { children: "Bank", width: "15%" },
  bankID: { children: "Bank ID", width: "5%" },
  created: {
    children: "Created",
    dataFormat: cell => cell && moment(cell).format("DD-MM-YYYY"),
    width: "10%"
  }
};

const options = {
  defaultSortName: "id",
  defaultSortOrder: "desc",
  sizePerPage: 25
};

const DepositsTable = ({ deposits, ...props }) => {
  const formatRow = row => {
    return row.userID === `${process.env.REACT_APP_UNMATCHED_DEFAULT_ACCOUNT}`
      ? "table-danger"
      : "";
  };
  return (
    <Table
      data={deposits}
      columnConfig={columnConfig}
      keyField="id"
      options={options}
      trClassName={formatRow}
      {...props}
    />
  );
};

export default DepositsTable;
